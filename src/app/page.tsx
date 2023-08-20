import { Banner } from '@/components/Banner';
import { JobSearch } from '@/components/JobSearch';
import { UserCard } from '@/components/UserCard';

export default function Home() {
	return (
		<>
			<Banner />

			<main>
				<UserCard />

				<JobSearch />
			</main>
		</>
	);
}
