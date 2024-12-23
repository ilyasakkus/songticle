import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '../../types/database.types';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') ?? '/';

    if (code) {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient<Database>({ 
        cookies: () => cookieStore,
      });

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('Auth callback error:', error);
        return NextResponse.redirect(
          `${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`
        );
      }

      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }

    // Handle access_token in URL fragment for OAuth providers
    const hash = requestUrl.hash;
    if (hash && hash.includes('access_token')) {
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }

    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent('No code or token provided')}`, requestUrl.origin)
    );
  } catch (error) {
    console.error('Unexpected error in auth callback:', error);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent('An unexpected error occurred')}`, requestUrl.origin)
    );
  }
}
