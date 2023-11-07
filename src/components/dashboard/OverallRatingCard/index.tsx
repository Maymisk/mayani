import { OverallRatingGraph } from './OverallRatingGraph';
import { GraphLabel } from './GraphLabel';
import { RoundedRating, ratingMap } from './RatingMap';

interface IOverallRatingProps {
	rating: number;
}

export function OverallRatingCard({ rating }: IOverallRatingProps) {
	const rounded = Math.round(rating) as RoundedRating;
	const { color, hover, tag } = ratingMap[rounded];

	return (
		<div className="w-full p-6 rounded-3xl flex flex-col gap-4 border-2 border-gray400">
			<h2 className="text-xl text-white uppercase font-bold text-center">
				Avaliação Geral
			</h2>

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

				<OverallRatingGraph />
			</div>

			<GraphLabel />
		</div>
	);
}
