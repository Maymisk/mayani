import { RatingCard } from '../RatingCard';

interface IRating {
	id: string;
	author: {
		avatar: string | null;
		name: string;
	} | null;
	title: string;
	description: string | null;
	stars: number;
	created_at: string;
}

interface IRatingsProps {
	ratings: IRating[];
}

export function Ratings({ ratings }: IRatingsProps) {
	return (
		<section className="w-full flex flex-col items-center gap-20 mt-12">
			{ratings.map(rating => (
				<RatingCard key={rating.id} {...rating} />
			))}
		</section>
	);
}
