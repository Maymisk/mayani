import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export default async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const client = createMiddlewareClient({ req, res });

	const {
		data: { session },
	} = await client.auth.getSession();

	const path = req.nextUrl.pathname;

	if (
		session &&
		(path === '/' || path === '/auth/login' || path === '/auth/signUp')
	)
		return NextResponse.redirect(new URL('/home', req.url));

	if (
		!session &&
		path !== '/' &&
		path !== '/auth/login' &&
		path !== '/auth/signUp'
	)
		return NextResponse.redirect(new URL('/auth/login', req.url));

	return res;
}

export const config = {
	matcher:
		'/((?!api|_next/static|_next/image|favicon.ico|favicon.png|.*.svg).*)',
};
