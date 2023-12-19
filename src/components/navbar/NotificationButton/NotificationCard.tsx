'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface INotificationCardProps {
	description: string;
	href?: string | null;
	created_at: string;
	onClick(): void;
}

export function NotificationCard({
	description,
	created_at,
	href,
	onClick,
}: INotificationCardProps) {
	return (
		<Link
			href={href || '#'}
			className="flex gap-8 text-white bg-gray400 p-2 pb-0 mt-2 hover:brightness-[135%] group rounded-md transition-all outline-none"
			onClick={onClick}
		>
			<span className="font-bold text-blue500">
				<ExclamationCircleIcon
					className="w-[36px] h-[36px]"
					width={36}
					height={36}
				/>
			</span>

			<div className="w-full flex justify-between items-center gap-12 border-b-2 border-gray600 pb-4 px-1 group-hover:border-transparent max-md:gap-8">
				<p className="w-full text-sm md:max-w-[70%] md:max-h-10 text-justify md:overflow-hidden md:text-ellipsis max-md:text-xs">
					{description}
				</p>

				<span className="text-sm font-extralight block mt-2 max-md:text-xs max-md:text-center">
					{formatDistanceToNow(new Date(created_at), {
						addSuffix: true,
						locale: ptBR,
					})}
				</span>
			</div>
		</Link>
	);
}
