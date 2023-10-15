import Image from 'next/image';
import { Stars } from '../Stars';

interface IRatingCardProps {
	author: {
		name: string;
		avatar: string;
		location: string;
	};

	title: string;
	detailing: string;
	rating: number;
	created_at: string;
}

export function RatingCard({
	author,
	title,
	detailing,
	rating,
	created_at,
}: IRatingCardProps) {
	return (
		<div className="min-w-[600px] max-w-[800px] bg-gray400 rounded-lg p-8">
			<header className="flex items-center justify-between">
				<div className="flex items-center justify-center gap-4">
					<Image
						src={author.avatar}
						alt="Rating author profile picture"
						width={60}
						height={60}
						className="rounded-full"
					/>

					<div className="flex flex-col justify-center gap-1">
						<h2 className="text-2xl">{author.name}</h2>
						<span className="font-extralight">
							{author.location}
						</span>
					</div>
				</div>

				<div className="flex flex-col justify-center gap-2">
					<Stars rating={rating} />

					<span className="font-extralight">{created_at}</span>
				</div>
			</header>

			<div className="mt-8">
				<h2 className="text-2xl max-w-full font-bold whitespace-nowrap text-ellipsis overflow-hidden">
					{title}
				</h2>

				<p className="font-light mt-4 text-justify">{detailing}</p>
			</div>
		</div>
	);
}
