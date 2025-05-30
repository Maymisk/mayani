import { WorkerRatings } from '@/components/worker/WorkerRatings';
import { WorkerInfo } from '@/components/worker/WorkerInfo';
import { WorkerWorks } from '@/components/worker/WorkerWorks';
import { getWorkerData } from './fetch';

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
		avatar,
		location,
		occupation,
		auth_id,
		ratings,
		works,
		resume,
	} = await getWorkerData(id);

	return (
		<main className="max-xl:px-4">
			<WorkerInfo
				auth_id={auth_id}
				name={name}
				bio={bio}
				avatar={avatar}
				resume={resume}
				location={location}
				occupation={occupation}
			/>

			<WorkerRatings auth_id={auth_id} ratings={ratings} />

			<WorkerWorks works={works} />
		</main>
	);
}
