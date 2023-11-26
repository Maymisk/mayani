import { Database } from '@root/supabase/databaseTypes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface IOffer {
	title: string;
	description: string | null;
	start_date: string;
	price: number;
	client_id: string;
	worker_id: string;
	work_offer_id?: string;
}

export async function POST(request: Request) {
	const {
		title,
		description,
		price,
		start_date,
		client_id,
		worker_id,
		work_offer_id,
	} = (await request.json()) as IOffer;

	if (
		!title ||
		!description ||
		!price ||
		!start_date ||
		!client_id ||
		!worker_id
	)
		return Response.json(
			{ message: 'Insufficient data for work offer creation' },
			{ status: 400 }
		);

	// you cant hire yourself
	if (client_id === worker_id)
		return Response.json(
			{ message: "You can't hire yourself" },
			{ status: 400 }
		);

	const supabase = createRouteHandlerClient<Database>({ cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return redirect('/login');

	const { data, error: creationError } = await supabase
		.from('work_offers')
		.insert({
			title,
			description,
			start_date,
			price,
			client_id,
			worker_id,
			work_offer_id: work_offer_id || null,
			author_id: user.id,
		})
		.select()
		.single();

	if (creationError)
		return Response.json(
			{ message: creationError.message },
			{ status: 400 }
		);

	if (work_offer_id) {
		const { error: updateError } = await supabase
			.from('work_offers')
			.update({ status: 'DECLINED' })
			.eq('id', work_offer_id);

		if (updateError)
			return Response.json(
				{ message: updateError.message },
				{ status: 400 }
			);
	}

	const notificationUserId = user.id === worker_id ? client_id : worker_id;
	const { error: notificationError } = await supabase
		.from('notifications')
		.insert({
			description: 'Você recebeu uma nova oferta.',
			user_id: notificationUserId,
			href: '/work/offer/' + data.id,
		});

	if (notificationError)
		return Response.json(
			{ message: notificationError.message },
			{ status: 400 }
		);

	return Response.json({ message: 'Work offer created!' }, { status: 201 });
}
