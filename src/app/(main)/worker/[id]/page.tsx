import { Ratings } from '@/components/worker/Ratings';
import { WorkerInfo } from '@/components/worker/WorkerInfo';
import { Works } from '@/components/worker/Works';
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
		auth_id,
		ratings,
		works,
		resume,
	} = await getWorkerData(id);

	return (
		<main>
			<WorkerInfo
				auth_id={auth_id}
				name={name}
				bio={bio}
				avatar={avatar}
				resume={resume}
			/>

			<Ratings auth_id={auth_id} ratings={ratings} />

			<Works works={works} />
		</main>
	);
}
