import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const error = requestUrl.searchParams.get('error');
    const error_description = requestUrl.searchParams.get('error_description');

    // Create a Supabase client configured to use cookies
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Handle OAuth error
    if (error) {
      console.error('OAuth error:', error, error_description);
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(error_description || 'Authentication failed')}`, requestUrl.origin)
      );
    }

    // Handle authorization code flow
    if (code) {
      const { data: { session }, error: supabaseError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (supabaseError) {
        console.error('Code exchange error:', supabaseError);
        return NextResponse.redirect(
          new URL(`/?error=${encodeURIComponent(supabaseError.message)}`, requestUrl.origin)
        );
      }

      // Create profile if it doesn't exist
      if (session?.user) {
        const { data: existingProfile, error: profileCheckError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .single();

        if (!existingProfile && !profileCheckError) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert([
              {
                id: session.user.id,
                full_name: session.user.user_metadata.full_name,
                avatar_url: session.user.user_metadata.avatar_url,
                email: session.user.email,
                updated_at: new Date().toISOString()
              }
            ], {
              onConflict: 'id'
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
          }
        }
      }

      // Redirect to home page without any query parameters or fragments
      return NextResponse.redirect(new URL('/', requestUrl.origin));
    }

    // No code found
    return NextResponse.redirect(
      new URL('/', requestUrl.origin)
    );
  } catch (error) {
    console.error('Unexpected error in callback:', error);
    return NextResponse.redirect(
      new URL('/', requestUrl.origin)
    );
  }
}
