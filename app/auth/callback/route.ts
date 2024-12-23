import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Exchange the code for a session
    const { data: { session }, error: authError } = await supabase.auth.exchangeCodeForSession(code);

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.redirect(new URL('/auth/error', requestUrl.origin));
    }

    if (session?.user) {
      // Check if user exists in profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // If no profile exists, create one
      if (!profile) {
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || null,
            avatar_url: session.user.user_metadata?.avatar_url || null,
            updated_at: new Date().toISOString(),
          },
        ]);

        if (profileError) {
          console.error('Error creating profile:', profileError);
          return NextResponse.redirect(new URL('/auth/error', requestUrl.origin));
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/', requestUrl.origin));
}
