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

interface IUsers {
	id: string;

	ratings: {
		id: string;
		title: string;
		description: string | null;
		stars: number;
		users: {
			workers: {
				name: string;
				worker_profiles: {
					avatar: string | null;
				};
			};
		};
	}[];
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
	users: IUsers;
	works: IWork[];
}

export async function getWorkerData(id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('workers')
		.select(
			`name, username, 
			worker_profiles(bio, avatar, resume, location), 
			works(id, title, description),
			users(
				id, 
				ratings!ratings_ratedId_fkey(
					id, 
					title, 
					description, 
					stars, 
					users!ratings_authorId_fkey(workers(name, worker_profiles(avatar)))
				)
			)
			`
		)
		.eq('id', id)
		.limit(2, { foreignTable: 'users.ratings' })
		.limit(4, { foreignTable: 'works' })
		.returns<IFetchWorkerResponse[]>();

	if (!data) notFound();

	const { name, username, worker_profiles, users, works } = data[0];
	const { avatar, bio, location, resume } = worker_profiles;
	const { id: user_id, ratings } = users;

	const formattedRatings = ratings.map(rating => {
		const { id, title, description, stars, users } = rating;
		const {
			workers: {
				name,
				worker_profiles: { avatar },
			},
		} = users;

		const author = {
			name,
			avatar,
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
		user_id,
		ratings: formattedRatings,
		works,
	};
}
