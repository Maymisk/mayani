import { WorkerSearch } from '@/components/home/WorkerSearch';
import { getWorkers } from './fetch';

export default async function Home() {
	const workers = await getWorkers();

	return (
		<main>
			<WorkerSearch initialData={workers} />
		</main>
	);
}
