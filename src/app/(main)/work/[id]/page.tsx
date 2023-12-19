import { WorkCard } from '@/components/work/WorkCard';
import { getWork } from './fetch';

interface IWorkProps {
	params: {
		id: string;
	};
}

export default async function Work({ params: { id } }: IWorkProps) {
	const { work, client, worker } = await getWork(id);

	return (
		<main className="flex justify-center max-xl:px-4">
			<WorkCard id={id} {...work} client={client} worker={worker} />
		</main>
	);
}
