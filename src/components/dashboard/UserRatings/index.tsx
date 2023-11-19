import Link from 'next/link';
import { RatingCard } from './RatingCard';

interface IRating {
	id: string;
	author: {
		name: string;
		avatar: string | null;
	};
	description: string | null;
	stars: number;
}

interface IUserRatingsProps {
	id: string;
	ratings: IRating[];
}

export function UserRatings({ id, ratings }: IUserRatingsProps) {
	return (
		<aside className="w-full max-w-sm rounded-md px-4 py-6 flex flex-col items-center gap-6 border-2 border-gray400">
			<h2 className="w-full text-xl uppercase font-bold text-white">
				Avaliações
			</h2>

			{ratings.length > 0 ? (
				ratings.map(rating => (
					<RatingCard key={rating.id} {...rating} />
				))
			) : (
				<div className="text-xl text-gray-600 uppercase font-bold flex items-center justify-center">
					Sem avaliações
				</div>
			)}

			<Link
				href={'/ratings/user/' + id}
				className="w-full text-blue700 hover:text-blue500 hover:underline font-bold transition-all text-center mt-auto"
			>
				Ver todas
			</Link>
		</aside>
	);
}
