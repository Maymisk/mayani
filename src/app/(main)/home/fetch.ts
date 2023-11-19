import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface IUsers {
	ratings: {
		stars: number;
	}[];
}

interface IWorkerProfile {
	bio: string | null;
	avatar: string | null;
}

interface IFetchWorkersResponse {
	id: string;
	name: string;
	username: string;
	worker_profiles: IWorkerProfile;
	users: IUsers;
}

export async function getWorkers() {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('workers')
		.select(
			'id, name, username, worker_profiles(bio, avatar), users(ratings!ratings_ratedId_fkey(stars))'
		)
		// .eq('isVerified', true)
		// .eq('isSubscribed', true);
		.returns<IFetchWorkersResponse[]>();

	if (!data || data.length === 0) return null;

	const formatted = data.map(worker => {
		const { id, name, username, users, worker_profiles } = worker;

		const { avatar, bio } = worker_profiles;
		const { ratings } = users;

		let averageRating = 0;

		if (ratings) {
			const sum = ratings.reduce((prev, { stars }) => prev + stars, 0);
			averageRating = Math.round(sum / ratings.length);
		}

		return {
			id,
			name,
			username,
			bio,
			avatar,
			rating: averageRating,
		};
	});

	return formatted;
}
