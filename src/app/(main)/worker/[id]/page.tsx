import { HomeBanner } from '@/components/home/banner';
import { Ratings } from '@/components/worker/Ratings';
import { WorkerInfo } from '@/components/worker/WorkerInfo';
import { Works } from '@/components/worker/Works';
import { api } from '@/services/api';

interface IUserProps {
	params: {
		id: string;
	};
}

export default async function Worker({ params }: IUserProps) {
	const { name, bio, avatar_url, occupation, works, ratings } = await api.get(
		'/users/' + params.id,
		{ next: { revalidate: 0 } }
	);

	return (
		<>
			<HomeBanner />

			<main>
				<WorkerInfo
					name={name}
					bio={bio}
					occupation={occupation}
					avatar_url={avatar_url}
				/>

				<Ratings ratings={ratings} />

				<Works works={works} />
			</main>
		</>
	);
}
