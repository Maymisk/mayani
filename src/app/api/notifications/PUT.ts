import { Database } from '@root/supabase/databaseTypes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function PUTLogic(request: Request) {
	const { notifications } = await request.json();

	if (!notifications || !notifications.length || notifications.length <= 0)
		return new Response(
			JSON.stringify({
				message: 'Insufficient data for notifications update',
			}),
			{ status: 400 }
		);

	const cookieStore = cookies();
	const supabase = createRouteHandlerClient<Database>({
		cookies: () => cookieStore,
	});
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user)
		return new Response(
			JSON.stringify({ message: 'User is not authenticated' }),
			{ status: 401 }
		);

	const { error } = await supabase
		.from('notifications')
		.update({ read_at: new Date().toISOString() })
		.eq('user_id', user.id)
		.in('id', notifications);

	if (error)
		return new Response(JSON.stringify({ message: error.message }), {
			status: 400,
		});

	return new Response(JSON.stringify({ message: 'Notifications updated!' }), {
		status: 200,
	});
}
