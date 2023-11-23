import { Database } from '@root/supabase/databaseTypes';
import { isSubscribedType } from '@root/supabase/isSubscribed';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface IRating {
	stars: number;
}

interface IWorkerProfile {
	bio: string | null;
	avatar: string | null;
	isVerified: boolean;
	isSubscribed: isSubscribedType;
}

interface IFetchWorkersResponse {
	auth_id: string;
	name: string;
	username: string;
	worker_profiles: IWorkerProfile;
	ratings: IRating[];
}

export async function getWorkers() {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('users')
		.select(
			`auth_id, name, username,
			worker_profiles(bio, avatar, isVerified, isSubscribed), 
			ratings!ratings_rated_id_fkey(stars)`
		)
		.eq('isWorker', true)
		.limit(30)
		.returns<IFetchWorkersResponse[]>();

	if (!data || data.length === 0) return null;

	const formattedData: any[] = [];
	data.forEach(worker => {
		const { auth_id, name, username, ratings, worker_profiles } = worker;

		// if (!worker_profiles.isVerified || !worker_profiles.isSubscribed) return

		const sum = ratings.reduce((prev, { stars }) => prev + stars, 0);
		const rating = Math.round(sum / ratings.length) || 0;

		formattedData.push({
			auth_id,
			name,
			username,
			bio: worker_profiles.bio,
			avatar: worker_profiles.avatar,
			rating,
		});
	});

	return formattedData;
}
