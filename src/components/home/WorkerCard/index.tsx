'use client';

import { BriefcaseIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

interface IJobCardProps {
	id: string;
	name: string;
	bio: string;
	occupation: string;
	avatar_url: string;
	rating: number;
}

export function WorkerCard({
	id,
	name,
	bio,
	occupation,
	avatar_url,
	rating,
}: IJobCardProps) {
	return (
		<div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray400 border-2 border-transparent hover:border-blue700 transition-all shadow-md shadow-gray-900">
			<header className="text-center">
				<Image
					src={avatar_url}
					alt="User's profile picture"
					width={150}
					height={150}
					className="rounded-full"
				/>

				<Link
					href={`/worker/${id}`}
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
					{rating} em avaliações
				</div>

				<div className="flex gap-1 items-center hover:text-blue-500">
					<BriefcaseIcon width={16} height={16} />
					{occupation}
				</div>
			</footer>
		</div>
	);
}
