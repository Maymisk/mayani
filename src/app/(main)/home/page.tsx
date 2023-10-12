import { HomeBanner } from '@/components/home/banner';
import { JobSearch } from '@/components/home/JobSearch';
import { UserCard } from '@/components/home/UserCard';
import { api } from '@/services/api';

export async function Home() {
	const jobs = await api.get('/users', { next: { revalidate: 0 } });

	return (
		<>
			<HomeBanner />

			<main>
				<UserCard />

				<JobSearch initialData={jobs} />
			</main>
		</>
	);
}
