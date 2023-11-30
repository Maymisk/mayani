'use client';

import { FallbackAvatar } from '@/components/fallbackAvatar';
import { BriefcaseIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

interface IJobCardProps {
	auth_id: string;
	name: string;
	bio: string | null;
	avatar: string | null;
	rating: number | null;
}

export function WorkerCard({
	auth_id,
	name,
	bio,
	avatar,
	rating,
}: IJobCardProps) {
	return (
		<div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray400 border-2 border-transparent hover:border-blue700 transition-all shadow-md shadow-gray-900">
			<header className="flex flex-col gap-2 items-center justify-center">
				{avatar ? (
					<Image
						src={avatar}
						alt="User's profile picture"
						width={150}
						height={150}
						className="w-[150px] h-[150px] object-cover rounded-full"
					/>
				) : (
					<FallbackAvatar
						name={name}
						width="w-[150px]"
						height="h-[150px]"
						text="text-6xl"
					/>
				)}

				<Link
					href={`/worker/${auth_id}`}
					className="mt-2 text-blue100 text-xl font-bold block hover:text-blue500 transition-all"
				>
					{name}
				</Link>
			</header>

			<p className="text-center leading-5 max-h-[5rem] text-blue100 mt-4 overflow-hidden">
				{bio}
			</p>

			<footer className="text-blue700 font-bold flex gap-6 mt-4 transition-all">
				<div className="flex gap-1 items-center hover:text-blue-500">
					<StarIcon width={16} height={16} />
					{!rating
						? 'Sem avaliações'
						: `${rating.toFixed(1)} em avaliações`}
				</div>

				<div className="flex gap-1 items-center hover:text-blue-500">
					<BriefcaseIcon width={16} height={16} />
					Trabalhador Mayani
				</div>
			</footer>
		</div>
	);
}
