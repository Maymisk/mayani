import { Database } from '@root/supabase/databaseTypes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sign } from 'jsonwebtoken';

interface IPutPayload {
	id: string;
	client_id: string;
	end_date: string;
}

export async function PUTLogic(request: Request) {
	const { id, client_id, end_date } = (await request.json()) as IPutPayload;

	if (!id || !end_date || !client_id)
		return new Response(
			JSON.stringify({ message: 'Insufficient data for work update' }),
			{ status: 400 }
		);

	const cookieStore = cookies();
	const supabase = createRouteHandlerClient<Database>({
		cookies: () => cookieStore,
	});
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return redirect('/login');

	const { error } = await supabase
		.from('works')
		.update({ end_date })
		.eq('id', id)
		.eq('worker_id', user.id);

	if (error)
		return new Response(JSON.stringify({ message: error.message }), {
			status: 400,
		});

	const clientRateToken = sign({}, process.env.RATE_TOKEN_SECRET as string, {
		subject: client_id,
		expiresIn: '250 days',
	});
	const clientHrefQuery = new URLSearchParams({
		token: clientRateToken,
	}).toString();

	const { error: clientNotificationError } = await supabase
		.from('notifications')
		.insert({
			description:
				'Um trabalho foi concluído! Clique para avaliar seu prestador',
			user_id: client_id,
			href: `/rate/${user.id}/${id}?${clientHrefQuery}`,
		});

	if (clientNotificationError)
		return new Response(
			JSON.stringify({ message: clientNotificationError.message }),
			{ status: 400 }
		);

	const workerRateToken = sign({}, process.env.RATE_TOKEN_SECRET as string, {
		subject: user.id,
		expiresIn: '250 days',
	});
	const workerHrefQuery = new URLSearchParams({
		token: workerRateToken,
	}).toString();

	const { error: workerNotificationError } = await supabase
		.from('notifications')
		.insert({
			description:
				'Um trabalho foi concluído! Clique para avaliar seu cliente.',
			user_id: user.id,
			href: `/rate/${client_id}/${id}?${workerHrefQuery}`,
		});

	if (workerNotificationError)
		return new Response(
			JSON.stringify({ message: workerNotificationError.message }),
			{ status: 400 }
		);

	return new Response(
		JSON.stringify({ message: 'Work successfully updated' }),
		{ status: 200 }
	);
}
