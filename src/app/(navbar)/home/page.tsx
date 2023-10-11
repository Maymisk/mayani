import { Banner } from '@/components/banner';
import { JobSearch } from '@/components/home/JobSearch';
import { UserCard } from '@/components/home/UserCard';
import { api } from '@/services/api';

export async function Home() {
	const jobs = await api.get('/users', { next: { revalidate: 0 } });

	return (
		<>
			<Banner />

			<main>
				<UserCard />

				<JobSearch initialData={jobs} />
			</main>
		</>
	);
}
