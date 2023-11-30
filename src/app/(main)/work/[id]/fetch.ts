import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface IProfile {
	avatar: string | null;
}

interface IWorker {
	auth_id: string;
	name: string;
	worker_profiles: IProfile;
	ratings: IRating[];
}

interface IClient {
	auth_id: string;
	name: string;
	worker_profiles: IProfile | null;
	client_profiles: IProfile | null;

	ratings: IRating[];
}

interface IRating {
	stars: number;
}

interface IFetchWorkResponse {
	title: string;
	description: string | null;
	price: number;
	start_date: string;
	end_date: string | null;
	created_at: string;
	users_worker: IWorker;
	users_client: IClient;
}

export async function getWork(id: string) {
	const cookieStore = cookies();
	const supabase = createServerComponentClient<Database>({
		cookies: () => cookieStore,
	});

	const { data } = await supabase
		.from('works')
		.select(
			`
			title,
			description, 
			price, 
			start_date, 
			end_date, 
			created_at,
			users_worker:works_worker_id_fkey(
				auth_id, 
				name, 
				worker_profiles(avatar), 
				ratings!ratings_rated_id_fkey(stars)
			),
			users_client:works_client_id_fkey(
				auth_id, 
				name, 
				worker_profiles(avatar),
				client_profiles(avatar),
				ratings!ratings_rated_id_fkey(stars)
			)
		`
		)
		.eq('id', id)
		.returns<IFetchWorkResponse[]>();

	if (!data || data.length === 0) notFound();

	const {
		users_client: clientsObject,
		users_worker: workerObject,
		price,
		...work
	} = data[0];
	const {
		ratings: clientRatings,
		worker_profiles: client_worker_profiles,
		client_profiles,
	} = clientsObject;
	const { ratings: workerRatings, worker_profiles } = workerObject;

	const clientAverageRating = getAverageRating(clientRatings);
	const workerAverageRating = getAverageRating(workerRatings);

	const client = {
		auth_id: clientsObject.auth_id,
		name: clientsObject.name,
		avatar: client_worker_profiles
			? client_worker_profiles.avatar
			: client_profiles!.avatar,
		rating: clientAverageRating,
	};

	const worker = {
		auth_id: workerObject.auth_id,
		name: workerObject.name,
		avatar: worker_profiles.avatar,
		rating: workerAverageRating,
	};

	return {
		work: {
			...work,
			price: price / 100,
		},
		worker,
		client,
	};
}

function getAverageRating(ratings: IRating[]) {
	if (ratings.length === 0) return 0;

	const sum = ratings.reduce((sum, rating) => (sum += rating.stars), 0);

	return Math.round(sum / ratings.length);
}
