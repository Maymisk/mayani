import { HomeBanner } from '@/components/home/banner';
import { WorkerSearch } from '@/components/home/WorkerSearch';
import { UserCard } from '@/components/home/UserCard';
import { api } from '@/services/api';

export default async function Home() {
	const jobs = await api.get('/users', { next: { revalidate: 0 } });

	return (
		<>
			<HomeBanner />

			<main>
				<UserCard />

				<WorkerSearch initialData={jobs} />
			</main>
		</>
	);
}
