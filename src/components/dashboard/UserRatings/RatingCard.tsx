import { FallbackAvatar } from '@/components/fallbackAvatar';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface IRatingCardProps {
	author: {
		avatar: string | null;
		name: string;
	};
	stars: number;
	description: string | null;
}

export function RatingCard({ author, description, stars }: IRatingCardProps) {
	return (
		<div className="w-[95%] flex items-start gap-6 rounded-xl shadow-sm shadow-gray-600 text-white p-4 hover:scale-105 transition-all">
			{author.avatar ? (
				<Image
					src={author.avatar}
					alt="Rating author profile picture"
					width={40}
					height={40}
					className="rounded-full"
				/>
			) : (
				<FallbackAvatar
					width="w-[40px]"
					height="h-[40px]"
					name={author.name}
				/>
			)}

			<div className="max-h-40 flex-1 overflow-hidden">
				<header className="w-full flex justify-between mb-2">
					<h3 className="font-bold">{author.name}</h3>

					<span className="flex items-center gap-1 text-blue700 font-bold">
						{stars}
						<StarIcon
							width={20}
							height={20}
							className="mt-[-3px]"
						/>
					</span>
				</header>

				<p className="text-xs text-justify">{description}</p>
			</div>
		</div>
	);
}
