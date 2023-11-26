import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export default async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const client = createMiddlewareClient({ req, res });

	const {
		data: { session },
	} = await client.auth.getSession();

	const path = req.nextUrl.pathname;

	if (session && (path === '/' || path === '/login' || path === '/signUp'))
		return NextResponse.redirect(new URL('/home', req.url));

	if (!session && path !== '/' && path !== '/login' && path !== '/signUp')
		return NextResponse.redirect(new URL('/login', req.url));

	const splitPath = path.split('/');

	if (
		session &&
		splitPath[1] === 'dashboard' &&
		splitPath[3] != session.user.id
	)
		return NextResponse.redirect(new URL('/home', req.url));

	if (session && splitPath[1] === 'hire' && splitPath[3] === session.user.id)
		return NextResponse.redirect(new URL('/home', req.url));

	if (session && !session.user.user_metadata.isWorker && path === '/pricing')
		return NextResponse.redirect(new URL('/home', req.url));

	return res;
}

export const config = {
	matcher:
		'/((?!api|_next/static|_next/image|favicon.ico|favicon.png|.*.svg).*)',
};
