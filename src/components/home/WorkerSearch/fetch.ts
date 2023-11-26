import { Database } from '@root/supabase/databaseTypes';
import { isSubscribedType } from '@root/supabase/isSubscribed';
import { SupabaseClient } from '@supabase/supabase-js';

type FetchWorkersResponse = {
	auth_id: string;
	name: string;
	worker_profiles: {
		bio: string | null;
		avatar: string | null;
		isVerified: boolean;
		isSubscribed: isSubscribedType;
	};
	ratings: {
		stars: number;
	}[];
}[];

// improvement - use react query
export async function searchWorkers(
	input: string,
	supabase: SupabaseClient<Database>
) {
	const { data, error } = await supabase
		.from('users')
		.select(
			`
			auth_id, name, 
			worker_profiles(bio, avatar, isVerified, isSubscribed),
			ratings!ratings_rated_id_fkey(stars)
		`
		)
		.eq('isWorker', true)
		// .eq('isVerified', true)
		// .eq('isSubscribed', true)
		.textSearch('name', input)
		.limit(30)
		.returns<FetchWorkersResponse>();

	if (!data || data.length === 0) return null;

	const formattedData: any[] = [];
	data.forEach(worker => {
		const { auth_id, name, ratings, worker_profiles } = worker;

		// if (!worker_profiles.isVerified || !worker_profiles.isSubscribed) return

		const sum = ratings.reduce((sum, { stars }) => sum + stars, 0);
		const rating = Math.round(sum / ratings.length) || 0;

		formattedData.push({
			auth_id,
			name,
			bio: worker_profiles.bio,
			avatar: worker_profiles.avatar,
			rating,
		});
	});

	return formattedData;
}
