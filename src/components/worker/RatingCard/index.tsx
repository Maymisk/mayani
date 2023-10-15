import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface IRating {
	title: string;
	description: string;
	rating: number;
}

export function RatingCard({ title, description, rating }: IRating) {
	return (
		<article className="text-blue100 p-4 rounded-lg bg-gray400 hover:scale-105 transition-all">
			<header className="flex items-center justify-between font-bold text-blue500">
				<div>
					<Image
						src={'https://github.com/Maymisk.png'}
						alt="Rating author profile picture"
						width={40}
						height={40}
						className="w-auto h-auto rounded-full inline-block mr-4"
					/>
					por Khalil Bohner
				</div>

				<div className="flex gap-1 text-yellow-300">
					<StarIcon width={20} height={20} />
					{rating}
				</div>
			</header>

			<h1 className="font-bold text-2xl mt-4 mb-2">{title}</h1>

			<p className="text-sm max-h-[6rem] leading-6 overflow-hidden text-justify">
				{description}
			</p>
		</article>
	);
}
