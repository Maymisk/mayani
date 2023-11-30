import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface IProfiles {
	avatar: string | null;
}

interface IUsers {
	name: string;
	worker_profiles: IProfiles | null;
	client_profiles: IProfiles | null;
}

type FetchRatingsResponse = {
	id: string;
	title: string;
	description: string | null;
	stars: number;
	created_at: string;
	users: IUsers | null;
}[];

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

type QueryResponse = {
	name: string | undefined;
	ratings: IRating[];
};

export async function getRatingsAndRatedUser(
	user_id: string
): Promise<QueryResponse> {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data: ratedUserData } = await supabase
		.from('users')
		.select('name')
		.eq('auth_id', user_id)
		.single();

	if (!ratedUserData) notFound();

	const { data } = await supabase
		.from('ratings')
		.select(
			`id,
			title,
			description,
			stars,
			created_at,
			users!ratings_author_id_fkey(
				name,
				worker_profiles(avatar),
				client_profiles(avatar)
			)`
		)
		.eq('rated_id', user_id)
		.returns<FetchRatingsResponse>();

	// data wont be null - at most an empty array
	const ratings = data!.map(rating => {
		const { id, title, description, stars, created_at, users } = rating;

		const author = users
			? {
					name: users.name,
					avatar: users.client_profiles
						? users.client_profiles.avatar
						: users.worker_profiles!.avatar,
			  }
			: null;

		return {
			id,
			title,
			description,
			stars,
			created_at,
			author,
		};
	});

	return {
		name: ratedUserData.name,
		ratings,
	};
}
