import { HomeBanner } from '@/components/home/banner';
import { NoRatings } from '@/components/ratings/NoRatings';
import { Ratings } from '@/components/ratings/Ratings';
import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface IUserRatings {
	params: {
		id: string;
	};
}

export default async function UserRatings({ params: { id } }: IUserRatings) {
	const { name, ratings } = await getRatingsAndRatedUser(id);

	return (
		<>
			<HomeBanner />

			<main className="flex flex-col items-center justify-center mt-20 text-white">
				{ratings ? (
					<>
						<h1 className="text-3xl font-bold">
							Avaliações de {name}
						</h1>
						<Ratings ratings={ratings} />
					</>
				) : (
					<NoRatings />
				)}
			</main>
		</>
	);
}

interface IWorkerProfiles {
	avatar: string | null;
}

interface IUsers {
	workers: {
		name: string;
		worker_profiles: IWorkerProfiles;
	};
}

interface IRating {
	id: string;
	title: string;
	description: string | null;
	stars: number;
	created_at: string;
	author: {
		name: string;
		avatar: string | null;
	} | null;
}

interface IQueryResponse {
	name: string | undefined;
	ratings: IRating[] | null;
}

async function getRatingsAndRatedUser(id: string): Promise<IQueryResponse> {
	const supabase = createServerComponentClient<Database>({ cookies });

	// this query should include client users as potential authors in the future
	const { data } = await supabase
		.from('ratings')
		.select(
			`id,
			title,
			description,
			stars,
			created_at,
			users!ratings_authorId_fkey(
				workers(name, worker_profiles(avatar))
			)`
		)
		.eq('ratedId', id);

	if (!data) return { name: undefined, ratings: null };

	const ratings = data.map(rating => {
		const { id, title, description, stars, created_at, users } = rating;

		let author = null;
		if (users && users.workers) {
			const {
				workers: { name, worker_profiles },
			} = users as unknown as IUsers;
			const { avatar } = worker_profiles;

			author = {
				name,
				avatar,
			};
		}

		return {
			id,
			title,
			description,
			stars,
			created_at,
			author,
		};
	});

	const { data: ratedUserData } = await supabase
		.from('users')
		.select('workers(name)')
		.eq('id', id)
		.single();

	return {
		ratings,
		name: ratedUserData?.workers?.name,
	};
}
