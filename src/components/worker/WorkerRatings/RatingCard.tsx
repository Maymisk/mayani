import { FallbackAvatar } from '@/components/fallbackAvatar';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface IRating {
	author: {
		name: string;
		avatar: string | null;
	};
	title: string;
	description: string | null;
	stars: number;
}

export function RatingCard({ author, title, description, stars }: IRating) {
	return (
		<article className="text-blue100 p-4 rounded-lg bg-gray400 hover:scale-[1.01] transition-all">
			<header className="flex items-center justify-between font-bold text-blue500">
				<div className="flex items-center gap-4">
					{author.avatar ? (
						<Image
							src={author.avatar}
							alt="Rating author profile picture"
							width={40}
							height={40}
							className="w-auto h-auto rounded-full"
						/>
					) : (
						<FallbackAvatar
							name={author.name}
							text="text-xl"
							width="w-[40px]"
							height="h-[40px]"
						/>
					)}
					por {author.name}
				</div>

				<div className="flex gap-1 text-blue700">
					<StarIcon width={20} height={20} />
					{stars}
				</div>
			</header>

			<h1 className="font-bold text-2xl mt-4 mb-2">{title}</h1>

			<p className="text-sm max-h-[6rem] leading-6 overflow-hidden text-justify">
				{description}
			</p>
		</article>
	);
}
