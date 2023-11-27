import { Database } from '@root/supabase/databaseTypes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function PUTLogic(request: Request) {
	const { notifications } = await request.json();

	if (!notifications || !notifications.length || notifications.length <= 0)
		return Response.json(
			{ message: 'Insufficient data for notifications update' },
			{ status: 400 }
		);

	const supabase = createRouteHandlerClient<Database>({ cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user)
		return Response.json(
			{ message: 'User is not authenticated' },
			{ status: 401 }
		);

	const { error } = await supabase
		.from('notifications')
		.update({ read_at: new Date().toISOString() })
		.eq('user_id', user.id)
		.in('id', notifications);

	if (error)
		return Response.json({ message: error.message }, { status: 400 });

	return Response.json(
		{ message: 'Notifications updated!' },
		{ status: 200 }
	);
}
