import { HomeBanner } from '@/components/home/banner';
import { WorkerSearch } from '@/components/home/WorkerSearch';
import { UserCard } from '@/components/home/UserCard';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@root/supabase/databaseTypes';
import { cookies } from 'next/headers';

export default async function Home() {
	const workers = await getWorkers();

	return (
		<>
			<HomeBanner />

			<main>
				<UserCard />

				<WorkerSearch initialData={workers} />
			</main>
		</>
	);
}

interface IUsers {
	ratings: {
		stars: number;
	}[];
}

interface IWorkerProfile {
	bio: string | null;
	avatar: string | null;
}

async function getWorkers() {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('workers')
		.select(
			'id, name, username, worker_profiles(bio, avatar), users(ratings!ratings_ratedId_fkey(stars))'
		);
	// .eq('isVerified', true)
	// .eq('isSubscribed', true);

	if (!data) return null;

	const formatted = data.map(worker => {
		const { id, name, username, users, worker_profiles } = worker;

		// the client says  'users' and 'worker_profiles' will be arrays, which is not the case.
		const { avatar, bio } = worker_profiles as unknown as IWorkerProfile;
		const { ratings } = users as unknown as IUsers;

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
			avatar_url: avatar,
			rating: averageRating,
		};
	});

	return formatted;
}
