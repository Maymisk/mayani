import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface IWorkerProfiles {
	avatar: string | null;
}

interface IUsers {
	workers: {
		name: string;
		worker_profiles: IWorkerProfiles;
	} | null;
	clients: {
		name: string;
	} | null;
}

interface IRating {
	id: string;
	title: string;
	description: string | null;
	stars: number;
	created_at: string;
	author: {
		name: string;
		avatar: string | null;
	} | null;
}

type FetchRatingsResponse = {
	id: string;
	title: string;
	description: string | null;
	stars: number;
	created_at: string;
	users: IUsers | null;
}[];

type QueryResponse = {
	name: string | undefined;
	ratings: IRating[];
};

export async function getRatingsAndRatedUser(
	id: string
): Promise<QueryResponse> {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('ratings')
		.select(
			`id,
			title,
			description,
			stars,
			created_at,
			users!ratings_authorId_fkey(
				workers(name, worker_profiles(avatar)),
				clients(name)
			)`
		)
		.eq('ratedId', id)
		.returns<FetchRatingsResponse>();

	// data wont be null - at most an empty array
	const ratings = data!.map(rating => {
		const { id, title, description, stars, created_at, users } = rating;

		let author = null;
		if (users && users.workers) {
			const {
				workers: {
					name,
					worker_profiles: { avatar },
				},
			} = users;

			author = {
				name,
				avatar,
			};
		}

		if (users && users.clients) {
			author = {
				name: users.clients.name,
				avatar: null,
			};
		}

		return {
			id,
			title,
			description,
			stars,
			created_at,
			author,
		};
	});

	const { data: ratedUserData } = await supabase
		.from('users')
		.select('workers(name), clients(name)')
		.eq('id', id)
		.single();

	if (!ratedUserData) notFound();

	let name = undefined;
	if (ratedUserData.clients) name = ratedUserData.clients.name;
	else name = ratedUserData.workers?.name;

	return {
		ratings,
		name,
	};
}
