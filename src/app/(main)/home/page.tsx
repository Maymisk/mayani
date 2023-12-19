import { WorkerSearch } from '@/components/home/WorkerSearch';
import { getWorkers } from './fetch';

export default async function Home() {
	const workers = await getWorkers();

	return (
		<main className="max-xl:px-4">
			<WorkerSearch initialData={workers} />
		</main>
	);
}
