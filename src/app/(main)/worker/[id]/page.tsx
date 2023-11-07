import { HomeBanner } from '@/components/home/banner';
import { Ratings } from '@/components/worker/Ratings';
import { WorkerInfo } from '@/components/worker/WorkerInfo';
import { Works } from '@/components/worker/Works';
import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface IUserProps {
	params: {
		id: string;
	};
}

export default async function Worker({ params: { id } }: IUserProps) {
	const {
		name,
		username,
		bio,
		avatar_url,
		location,
		user_id,
		ratings,
		works,
		resume,
	} = await getWorkerData(id);

	return (
		<>
			<HomeBanner />

			<main>
				<WorkerInfo
					name={name}
					bio={bio}
					avatar_url={avatar_url}
					resume={resume}
				/>

				<Ratings id={user_id} ratings={ratings} />

				<Works works={works} />
			</main>
		</>
	);
}

interface IWorkerProfile {
	id: string;
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

async function getWorkerData(id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('workers')
		.select(
			`name, username, 
			worker_profiles(id, bio, avatar, resume, location), 
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
		.single();

	if (!data) notFound();

	const { name, username, worker_profiles, users, works } = data;

	// the client says 'worker_profiles' and 'users' are arrays, which is not the case.
	const {
		avatar: avatar_url,
		bio,
		location,
		resume,
	} = worker_profiles as unknown as IWorkerProfile;

	const { id: user_id, ratings } = users as unknown as IUsers;

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
		avatar_url,
		user_id,
		ratings: formattedRatings,
		works,
	};
}
