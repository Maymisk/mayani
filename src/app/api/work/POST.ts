import { Database } from '@root/supabase/databaseTypes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface IOffer {
	id: string;
	author_id: string;
}

interface IPostPayload {
	title: string;
	description: string | null;
	price: number;
	start_date: string;
	client_id: string;
	worker_id: string;
	offer: IOffer;
}

export async function POSTLogic(request: Request) {
	const {
		title,
		description,
		price,
		start_date,
		client_id,
		worker_id,
		offer,
	} = (await request.json()) as IPostPayload;

	if (
		!title ||
		!description ||
		!price ||
		!start_date ||
		!client_id ||
		!worker_id ||
		!offer.author_id ||
		!offer.id
	)
		return new Response(
			JSON.stringify({ message: 'Insufficient data for work creation' }),
			{ status: 400 }
		);

	const cookieStore = cookies();
	const supabase = createRouteHandlerClient<Database>({
		cookies: () => cookieStore,
	});

	const { data: work, error: creationError } = await supabase
		.from('works')
		.insert({
			title,
			description,
			price,
			start_date,
			worker_id,
			client_id,
		})
		.select()
		.single();

	if (!work)
		return new Response(
			JSON.stringify({ message: creationError.message }),
			{ status: 400 }
		);

	const { error: updateError } = await supabase
		.from('work_offers')
		.update({ status: 'ACCEPTED' })
		.eq('id', offer.id);

	if (updateError)
		return new Response(JSON.stringify({ message: updateError.message }), {
			status: 400,
		});

	const notificationUserId =
		offer.author_id === worker_id ? worker_id : client_id;
	const { error: notificationError } = await supabase
		.from('notifications')
		.insert({
			description: 'Você tem um novo trabalho!',
			user_id: notificationUserId,
			href: '/work/' + work.id,
		});

	if (notificationError)
		return new Response(
			JSON.stringify({ message: notificationError.message }),
			{ status: 400 }
		);

	return new Response(JSON.stringify({ message: 'Work created!' }), {
		status: 201,
	});
}
