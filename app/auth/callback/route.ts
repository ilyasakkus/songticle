import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  
  try {
    const code = requestUrl.searchParams.get('code');
    const error = requestUrl.searchParams.get('error');
    const error_description = requestUrl.searchParams.get('error_description');

    if (code) {
      // Create a Supabase client configured to use cookies
      const supabase = createRouteHandlerClient({ cookies });

      // Exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code);
    }

    // Handle OAuth error
    if (error) {
      console.error('OAuth error:', error_description);
      return NextResponse.redirect(requestUrl.origin + '/error');
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin);
  } catch (error) {
    console.error('Unexpected error in callback:', error);
    return NextResponse.redirect(requestUrl.origin);
  }
}
