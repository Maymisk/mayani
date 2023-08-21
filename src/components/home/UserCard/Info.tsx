'use client';

import {
	StarIcon,
	BuildingOfficeIcon,
	UserIcon,
} from '@heroicons/react/24/solid';

interface IInfo {
	rating: string | number;
	company: string;
	followers: string | number;
}

export function Info({ rating, company, followers }: IInfo) {
	return (
		<div className="flex gap-6 mt-4 sm:mt-auto">
			<div className="flex flex-col sm:flex-row items-center gap-2">
				<StarIcon width={18} height={18} className="text-yellow-300" />

				<span className="text-blue100">{rating} em avaliações </span>
			</div>

			<div className="flex flex-col sm:flex-row items-center gap-2 text-blue100">
				<BuildingOfficeIcon width={18} height={18} />

				<span>{company} </span>
			</div>

			<div className="flex flex-col sm:flex-row items-center gap-2 text-blue100">
				<UserIcon width={18} height={18} />

				<span>{followers} seguidores</span>
			</div>
		</div>
	);
}
