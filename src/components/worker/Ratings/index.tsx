import Link from 'next/link';
import { RatingCard } from '../RatingCard';

interface IRating {
	id: string;
	title: string;
	description: string;
	rating: number;
}

interface IRatingProp {
	ratings: IRating[];
}

export function Ratings({ ratings }: IRatingProp) {
	return (
		<section className="text-blue100 mt-20">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl">Avaliações</h2>

				<Link
					href=""
					className="text-blue500 hover:text-blue700 hover:underline transition-all"
				>
					Ver todas
				</Link>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{ratings?.map(rating => (
					<RatingCard key={rating.id} {...rating} />
				))}
			</div>
		</section>
	);
}
