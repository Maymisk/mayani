import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface IWorker {
	id: string;
	name: string;
	worker_profiles: {
		avatar: string | null;
	};
	users: {
		ratings: IRating[];
	};
}

interface IClient {
	workers: {
		id: string;
		name: string;
		worker_profiles: {
			avatar: string | null;
		};
	};
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
	workers: IWorker;
	users: IClient;
}

export async function getWork(id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

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
			workers(
				id, 
				name, 
				worker_profiles(avatar), 
				users(ratings!ratings_ratedId_fkey(stars))
			),
			users(
				workers(id, name, worker_profiles(avatar)),
				ratings!ratings_ratedId_fkey(stars)
			)
		`
		)
		.eq('id', id)
		.returns<IFetchWorkResponse[]>();

	if (!data) notFound();

	const { users: clients, workers, ...work } = data[0];
	const { workers: clientData, ratings: clientRatings } = clients;
	const {
		users: { ratings: workerRatings },
		...workerData
	} = workers;

	const clientAverageRating = getAverageRating(clientRatings);
	const workerAverageRating = getAverageRating(workerRatings);

	const client = {
		id: clientData.id,
		name: clientData.name,
		avatar: clientData.worker_profiles.avatar,
		rating: clientAverageRating,
	};

	const worker = {
		id: workerData.id,
		name: workerData.name,
		avatar: workerData.worker_profiles.avatar,
		rating: workerAverageRating,
	};

	return {
		work,
		worker,
		client,
	};
}

function getAverageRating(ratings: IRating[]) {
	if (ratings.length === 0) return null;

	const sum = ratings.reduce((sum, rating) => (sum += rating.stars), 0);

	return Math.round(sum / ratings.length);
}
