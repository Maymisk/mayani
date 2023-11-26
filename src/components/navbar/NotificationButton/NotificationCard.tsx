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

			<div className="flex-1 flex justify-between items-center gap-8 border-b-2 border-gray600 pb-4 px-1 group-hover:border-transparent">
				<p className="text-sm max-w-[90%] max-h-10 text-justify overflow-hidden text-ellipsis">
					{description}
				</p>

				<span className="text-sm font-extralight block mt-2">
					{formatDistanceToNow(new Date(created_at), {
						addSuffix: true,
						locale: ptBR,
					})}
				</span>
			</div>
		</Link>
	);
}
