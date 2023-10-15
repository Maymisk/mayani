import { RatingCard } from '@/components/ratings/RatingCard';

interface IUserRatings {
	params: {
		id: string;
	};
}

export default function UserRatings({ params }: IUserRatings) {
	const { id } = params;

	return (
		<main className="flex flex-col items-center justify-center mt-20 text-white">
			<h1 className="text-3xl font-bold">
				here are the ratings regarding the user with id {id}
			</h1>

			<section className="w-full flex flex-col items-center gap-20 mt-12">
				<RatingCard
					author={{
						avatar: 'https://github.com/maymisk.png',
						location: 'Brazil',
						name: 'Khalil Bohner',
					}}
					title="Esse cara é bom"
					rating={4.5}
					detailing="Gostei muito do servico desse cara"
					created_at="Há 10 horas"
				/>
			</section>
		</main>
	);
}
