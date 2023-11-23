import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface IWorkerProfile {
	bio: string | null;
	avatar: string | null;
	resume: string | null;
	location: string | null;
}

interface IRating {
	id: string;
	title: string;
	description: string | null;
	stars: number;
	users: {
		name: string;

		worker_profiles: {
			avatar: string | null;
		} | null;
		client_profiles: {
			avatar: string | null;
		} | null;
	};
}

interface IWork {
	id: string;
	title: string;
	description: string | null;
}

interface IFetchWorkerResponse {
	name: string;
	username: string;
	worker_profiles: IWorkerProfile;
	ratings: IRating[];
	works: IWork[];
}

export async function getWorkerData(auth_id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('users')
		.select(
			`name, username, 
			worker_profiles(bio, avatar, resume, location), 
			works!works_worker_id_fkey(id, title, description),
			ratings!ratings_rated_id_fkey(
				id, 
				title, 
				description, 
				stars, 
				users!ratings_author_id_fkey(name, worker_profiles(avatar), client_profiles(avatar))
			)
			`
		)
		.limit(2, { foreignTable: 'ratings' })
		.limit(4, { foreignTable: 'works' })
		.eq('auth_id', auth_id)
		.eq('isWorker', true)
		.returns<IFetchWorkerResponse[]>();

	if (!data) notFound();

	const { name, username, worker_profiles, ratings, works } = data[0];
	const { avatar, bio, location, resume } = worker_profiles;

	const formattedRatings = ratings.map(rating => {
		const { id, title, description, stars, users } = rating;
		const { name, worker_profiles, client_profiles } = users;

		const author = {
			name,
			avatar: worker_profiles
				? worker_profiles.avatar
				: client_profiles!.avatar,
		};

		return {
			id,
			title,
			description,
			stars,
			author,
		};
	});

	return {
		name,
		username,
		bio,
		location,
		resume,
		avatar,
		auth_id,
		ratings: formattedRatings,
		works,
	};
}
