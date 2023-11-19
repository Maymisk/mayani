import { Database } from '@root/supabase/databaseTypes';
import { SupabaseClient } from '@supabase/supabase-js';

type FetchWorkersResponse = {
	id: string;
	name: string;
	worker_profiles: {
		bio: string | null;
		avatar: string | null;
	};
	users: {
		ratings: {
			stars: number;
		}[];
	};
}[];

// improvement - use react query
export async function searchWorkers(
	input: string,
	supabase: SupabaseClient<Database>
) {
	const { data } = await supabase
		.from('workers')
		.select(
			`
		id, name, 
		worker_profiles(bio, avatar),
		users(ratings!ratings_ratedId_fkey(stars))
		`
		)
		// .eq('isVerified', true)
		// .eq('isSubscribed', true)
		.textSearch('name', input)
		.returns<FetchWorkersResponse>();

	if (!data || data.length === 0) return null;

	const formattedData = data.map(worker => {
		const {
			id,
			name,
			users: { ratings },
			worker_profiles: { avatar, bio },
		} = worker;

		const sum = ratings.reduce((sum, { stars }) => sum + stars, 0);
		const rating = Math.round(sum / ratings.length);

		return {
			id,
			name,
			bio,
			avatar,
			rating,
		};
	});

	return formattedData;
}
