import { Database } from '@root/supabase/databaseTypes';
import { isSubscribedType } from '@root/supabase/isSubscribed';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { formatRatings } from './formatRatings';
import { formatWorks } from './formatWorks';

interface IWorkerProfile {
	avatar: string | null;
}

interface IRating {
	id: string;
	description: string | null;
	stars: number;
	users: {
		workers: {
			name: string;
			worker_profiles: IWorkerProfile;
		};
	};
}

interface IFetchWorkerResponse {
	name: string;
	isSubscribed: isSubscribedType;
	users: {
		id: string;
	};
}

interface IWork {
	id: string;
	price: number;
	end_date: string | null;
	created_at: string;
	users: {
		workers: {
			name: string;
			worker_profiles: IWorkerProfile;
		};
	};
}

export async function getDashboardData(id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data: worker } = await supabase
		.from('workers')
		.select(`name, isSubscribed, users(id)`)
		.eq('id', id)
		.returns<IFetchWorkerResponse[]>();

	if (!worker || worker.length === 0) notFound();

	const { data: worksData } = await supabase
		.from('works')
		.select(
			'id, price, end_date, created_at, users(workers(name, worker_profiles(avatar)))'
		)
		.eq('workerId', id)
		.returns<IWork[]>();

	if (!worksData) notFound();

	const { data: ratingsArray } = await supabase
		.from('ratings')
		.select(
			`id, 
            description, 
            stars,
            users!ratings_authorId_fkey(workers(name, worker_profiles(avatar)))`
		)
		.eq('ratedId', worker[0].users.id)
		.returns<IRating[]>();

	if (!ratingsArray) notFound();

	const {
		name,
		isSubscribed,
		users: { id: user_id },
	} = worker[0];

	return {
		name,
		isSubscribed,
		user_id,
		...formatWorks(worksData),
		...formatRatings(ratingsArray),
	};
}
