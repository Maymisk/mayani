import { OverallRatingGraph } from './OverallRatingGraph';
import { GraphLabel } from './GraphLabel';
import { RoundedRating, ratingMap } from './RatingMap';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface IOverallRatingProps {
	rating: number;
	ratingsByStars: number[];
	hasRatings: boolean;
}

export function OverallRatingCard({
	rating,
	ratingsByStars,
	hasRatings,
}: IOverallRatingProps) {
	const rounded = Math.round(rating) as RoundedRating;
	const { color, hover, tag } = ratingMap[rounded];

	return (
		<div className="w-full p-6 rounded-3xl flex flex-col gap-4 border-2 border-gray400">
			<h2 className="text-xl text-white uppercase font-bold text-center">
				Avaliação Geral
			</h2>

			{hasRatings ? (
				<>
					<div className="flex items-center justify-evenly gap-4 my-auto">
						<div className="flex flex-col items-center">
							<p className="text-7xl text-white font-bold">
								{rating.toFixed(1)}
							</p>

							<span
								className={`${color} text-lg uppercase font-semibold text-center hover:scale-105 ${hover} transition-all`}
							>
								{tag}
							</span>
						</div>

						<OverallRatingGraph ratingsByStars={ratingsByStars} />
					</div>

					<GraphLabel />
				</>
			) : (
				<div className="w-full flex items-center justify-center text-gray-600 font-bold uppercase mx-auto text-xl">
					Sem avaliações
				</div>
			)}
		</div>
	);
}
