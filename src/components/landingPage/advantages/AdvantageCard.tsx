import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

interface IAdvantageCardProps {
	title: string;
	detailing: string;
	link?: string;
}

export function AdvantageCard({ title, detailing, link }: IAdvantageCardProps) {
	return (
		<div className="h-[225px] flex flex-col gap-4 px-6 py-8 bg-gray400 text-white rounded-md shadow-sm shadow-gray400">
			<h1 className="text-2xl font-bold">{title}</h1>

			<p className="text-lg font-light">{detailing}</p>

			{link && (
				<Link
					href={link}
					className="font-bold text-blue700 block hover:text-blue500 hover:scale-105 transition-all w-max mt-auto"
				>
					Ver mais <ArrowRightIcon className="inline" width={20} />
				</Link>
			)}
		</div>
	);
}
