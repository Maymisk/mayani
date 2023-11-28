'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import {
	Root,
	Title,
	Description,
	Close,
	Viewport,
} from '@radix-ui/react-toast';

interface IToastProps {
	title: string;
	description: string;
	success?: boolean;
	duration?: number;
	open: boolean;
	onOpenChange(value: boolean): void;
}

export function Toast({
	title,
	description,
	success = false,
	open,
	onOpenChange,
	duration = 5000,
}: IToastProps) {
	return (
		<Root
			duration={duration}
			open={open}
			onOpenChange={onOpenChange}
			className={`min-w-[15rem] max-w-[20rem] flex items-start justify-between gap-8 p-4 rounded-md shadow-lg shadow-black data-[state='open']:animate-fadeIn data-[state='closed']:animate-fadeOut ${
				success ? 'bg-green400' : 'bg-danger'
			} `}
		>
			<div>
				<Title className="text-white font-bold uppercase">
					{title}
				</Title>

				<Description className="font-bold text-sm">
					{description}
				</Description>
			</div>

			<Close>
				<XMarkIcon width={24} height={24} />
			</Close>
		</Root>
	);
}
