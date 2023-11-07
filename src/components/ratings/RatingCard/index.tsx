import Image from 'next/image';
import { Stars } from '../Stars';
import { FallbackAvatar } from '@/components/fallbackAvatar';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface IRatingCardProps {
	author: {
		name: string;
		avatar: string | null;
	} | null;
	title: string;
	description: string | null;
	stars: number;
	created_at: string;
}

export function RatingCard({
	author,
	title,
	description,
	stars,
	created_at,
}: IRatingCardProps) {
	// in case the author of the rating deleted their account
	if (!author) author = { name: '?', avatar: null };

	return (
		<div className="min-w-[600px] max-w-[800px] bg-gray400 rounded-lg p-8 hover:scale-[1.02] shadow-sm shadow-gray400 transition-all">
			<header className="flex items-center justify-between">
				<div className="flex items-center justify-center gap-4">
					{author.avatar ? (
						<Image
							src={author.avatar}
							alt="Rating author profile picture"
							width={60}
							height={60}
							className="rounded-full"
						/>
					) : (
						<FallbackAvatar
							name={author.name}
							width="w-[60px]"
							height="h-[60px]"
						/>
					)}

					<div className="flex flex-col justify-center gap-1">
						<h2 className="text-2xl">{author.name}</h2>
						<span className="font-extralight">Brazil</span>
					</div>
				</div>

				<div className="flex flex-col justify-center gap-2">
					<Stars stars={stars} />

					<span className="font-extralight">
						{formatDistanceToNow(new Date(created_at), {
							locale: ptBR,
							addSuffix: true,
						})}
					</span>
				</div>
			</header>

			<div className="mt-8">
				<h2 className="text-2xl max-w-full font-bold whitespace-nowrap text-ellipsis overflow-hidden">
					{title}
				</h2>

				<p className="font-light mt-4 text-justify">{description}</p>
			</div>
		</div>
	);
}
