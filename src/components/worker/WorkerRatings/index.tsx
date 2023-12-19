import Link from 'next/link';
import { RatingCard } from './RatingCard';
import { NoRatings } from '@/components/empty/NoRatings';

interface IRating {
	id: string;
	title: string;
	description: string | null;
	stars: number;
	author: {
		name: string;
		avatar: string | null;
	};
}

interface IRatingProp {
	auth_id: string;
	ratings: IRating[];
}

export function WorkerRatings({ auth_id, ratings }: IRatingProp) {
	return (
		<section className="text-blue100 mt-20">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-4xl">Avaliações</h2>

				<Link
					href={`/ratings/user/${auth_id}`}
					className="text-blue500 hover:text-blue700 hover:underline transition-all"
				>
					Ver todas
				</Link>
			</div>

			<div
				className={`${
					ratings.length > 0 ? 'grid grid-cols-2' : 'flex flex-col'
				} gap-4 max-xl:grid-cols-1`}
			>
				{ratings.length > 0 ? (
					ratings.map(rating => (
						<RatingCard key={rating.id} {...rating} />
					))
				) : (
					<NoRatings />
				)}
			</div>
		</section>
	);
}
