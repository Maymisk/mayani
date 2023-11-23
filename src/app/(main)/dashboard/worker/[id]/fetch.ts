import { Database } from '@root/supabase/databaseTypes';
import { isSubscribedType } from '@root/supabase/isSubscribed';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { formatRatings } from './formatRatings';
import { formatWorks } from './formatWorks';

interface IProfile {
	avatar: string | null;
}

interface IRating {
	id: string;
	description: string | null;
	stars: number;
	users: {
		name: string;
		worker_profiles: IProfile | null;
		client_profiles: IProfile | null;
	};
}

interface IWork {
	id: string;
	price: number;
	end_date: string | null;
	created_at: string;
	users: {
		name: string;
		worker_profiles: IProfile | null;
		client_profiles: IProfile | null;
	};
}

interface IFetchWorkerResponse {
	name: string;
	worker_profiles: {
		isSubscribed: isSubscribedType;
	};
	works: IWork[];
	ratings: IRating[];
}

export async function getDashboardData(auth_id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('users')
		.select(
			`
				name, 
				worker_profiles(isSubscribed),
				works!works_worker_id_fkey(
					id,
					price,
					end_date,
					created_at,
					users!works_client_id_fkey(name, worker_profiles(avatar), client_profiles(avatar))
				),
				ratings!ratings_rated_id_fkey(
					id, 
					description, 
					stars,  
					users!ratings_author_id_fkey(
						name,
						worker_profiles(avatar),
						client_profiles(avatar)
					)
				)
			`
		)
		.eq('auth_id', auth_id)
		.returns<IFetchWorkerResponse[]>();

	if (!data || data.length === 0) notFound();

	const { name, ratings, works, worker_profiles } = data[0];

	return {
		name,
		isSubscribed: worker_profiles.isSubscribed,
		...formatWorks(works),
		...formatRatings(ratings),
	};
}
