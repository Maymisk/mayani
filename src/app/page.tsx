import { Banner } from '@/components/Banner';
import { UserCard } from '@/components/UserCard';

export default function Home() {
	return (
		<>
			<Banner />

			<main>
				<UserCard />
			</main>
		</>
	);
}
