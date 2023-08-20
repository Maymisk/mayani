'use client';

import { BriefcaseIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface IJobCardProps {
	name: string;
	bio: string;
	occupation: string;
	avatar_url: string;
	rating: number;
}

export function JobCard({
	name,
	bio,
	occupation,
	avatar_url,
	rating,
}: IJobCardProps) {
	return (
		<div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray400 border-2 border-transparent hover:border-blue700 transition-all">
			<header className="text-center">
				<Image
					src={avatar_url}
					alt="User's profile picture"
					width={100}
					height={100}
					className="w-auto h-auto rounded-full"
				/>

				<h2 className="mt-2 text-blue100 font-bold">{name}</h2>
			</header>

			<p className="text-center leading-5 max-h-[5rem] text-blue100 mt-4 overflow-hidden">
				{bio}
			</p>

			<footer className="text-blue700 font-bold hover:text-blue-500 flex gap-6 mt-4 transition-all">
				<div className="flex gap-1 items-center">
					<StarIcon width={16} height={16} />
					{rating} em avaliações
				</div>

				<div className="flex gap-1 items-center">
					<BriefcaseIcon width={16} height={16} />
					{occupation}
				</div>
			</footer>
		</div>
	);
}
