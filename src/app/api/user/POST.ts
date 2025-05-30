import { Database } from '@root/supabase/databaseTypes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POSTLogic(request: Request) {
	const { name, username, isWorker, email, password } = await request.json();

	if (!name || !username || isWorker === undefined || !email || !password)
		return new Response(
			JSON.stringify({ message: 'Insufficient data for user creation' }),
			{
				status: 400,
			}
		);

	const cookieStore = cookies();
	const supabase = createRouteHandlerClient<Database>({
		cookies: () => cookieStore,
	});

	// check if the username is available
	const { data } = await supabase
		.from('users')
		.select('id')
		.eq('username', username)
		.single();
	if (data)
		return new Response(
			JSON.stringify({ message: 'Username already exists' }),
			{ status: 400 }
		);

	// signUp the user
	const {
		data: { user },
		error: signUpError,
	} = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: process.env.NEXT_PUBLIC_VERCEL_URL + '/home',
			data: { isWorker },
		},
	});

	if (signUpError)
		return new Response(JSON.stringify({ message: signUpError.message }), {
			status: 400,
		});

	// create the user entity
	const { error: userCreationError } = await supabase
		.from('users')
		.insert({ name, username, isWorker, auth_id: user!.id });

	if (userCreationError)
		return new Response(
			JSON.stringify({ message: userCreationError.message }),
			{
				status: 400,
			}
		);

	return new Response(JSON.stringify({ message: 'User created' }), {
		status: 201,
	});
}
