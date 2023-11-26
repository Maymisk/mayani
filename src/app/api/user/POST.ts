import { Database } from '@root/supabase/databaseTypes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POSTLogic(request: Request) {
	const { name, username, isWorker, email, password } = await request.json();

	if (!name || !username || isWorker === undefined || !email || !password)
		return Response.json(
			{ message: 'Insufficient data for user creation' },
			{
				status: 400,
			}
		);

	const supabase = createRouteHandlerClient<Database>({ cookies });

	// check if the username is available
	const { data } = await supabase
		.from('users')
		.select('id')
		.eq('username', username)
		.single();
	if (data)
		return Response.json(
			{ message: 'Username already exists' },
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
			emailRedirectTo: 'http://localhost:3000/home',
			data: { isWorker },
		},
	});

	if (signUpError)
		return Response.json(
			{ message: signUpError.message },
			{
				status: 400,
			}
		);

	// create the user entity
	const { error: userCreationError } = await supabase
		.from('users')
		.insert({ name, username, isWorker, auth_id: user!.id });

	if (userCreationError)
		return Response.json(
			{ message: userCreationError.message },
			{
				status: 400,
			}
		);

	return Response.json({ message: 'User created' }, { status: 201 });
}
