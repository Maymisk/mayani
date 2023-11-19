import { NoRatings } from '@/components/empty/NoRatings';
import { Ratings } from '@/components/ratings/Ratings';
import { getRatingsAndRatedUser } from './fetch';

interface IUserRatings {
	params: {
		id: string;
	};
}

export default async function UserRatings({ params: { id } }: IUserRatings) {
	const { name, ratings } = await getRatingsAndRatedUser(id);

	return (
		<main className="flex flex-col items-center justify-center mt-20 text-white">
			<h1 className="text-3xl font-bold">Avaliações de {name}</h1>

			{ratings.length > 0 ? <Ratings ratings={ratings} /> : <NoRatings />}
		</main>
	);
}
