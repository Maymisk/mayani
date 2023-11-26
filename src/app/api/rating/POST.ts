import { Database } from '@root/supabase/databaseTypes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { JwtPayload, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POSTLogic(request: NextRequest) {
	const { title, description, rating, author_id, rated_id, work_id, token } =
		await request.json();

	if (
		!title ||
		!author_id ||
		!rated_id ||
		!work_id ||
		rating === undefined ||
		!token
	)
		return NextResponse.json(
			{ message: 'Insufficient data for rating creation ' },
			{ status: 400 }
		);

	const { user_id } = tokenIsValid(token);
	if (!user_id || user_id != author_id)
		return NextResponse.json({ message: 'Invalid token' }, { status: 401 });

	const supabase = createRouteHandlerClient<Database>({ cookies });

	const { data: tokenExists } = await supabase
		.from('ratings')
		.select('author_rate_token')
		.eq('author_rate_token', token)
		.single();

	if (tokenExists)
		return NextResponse.json({ message: 'Invalid token' }, { status: 401 });

	// validate author_id, rated_id and work_id

	const { error } = await supabase.from('ratings').insert({
		title,
		description,
		stars: Number(rating),
		author_id,
		rated_id,
		work_id,
		author_rate_token: token,
	});

	if (error)
		return NextResponse.json({ message: error.message }, { status: 400 });

	return NextResponse.json({ message: 'Rating created!' }, { status: 201 });
}

function tokenIsValid(token: string) {
	try {
		const decoded = verify(
			token,
			process.env.RATE_TOKEN_SECRET as string
		) as JwtPayload;

		return { user_id: decoded.sub };
	} catch (err) {
		return { user_id: null };
	}
}
