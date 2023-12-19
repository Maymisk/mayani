'use client';

import { HomeIcon, PencilIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { Separator, Item } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

export function NavigationItems() {
	return (
		<>
			<Separator className="bg-gray500 h-[1px] mb-2 md:hidden" />

			<Link
				href="/home"
				className="focus:bg-blue700 focus:text-gray300 outline-none rounded-sm md:hidden"
			>
				<Item className="flex items-center justify-between hover:bg-blue700 hover:text-gray300 outline-none px-4 py-1 rounded-sm">
					Home <HomeIcon width={20} height={20} />
				</Item>
			</Link>

			<Link
				href=""
				className="focus:bg-blue700 focus:text-gray300 outline-none rounded-sm md:hidden"
			>
				<Item className="flex items-center justify-between hover:bg-blue700 hover:text-gray300 outline-none px-4 py-1 rounded-sm">
					Sobre nós <PencilIcon width={20} height={20} />
				</Item>
			</Link>

			<Link
				href=""
				className="focus:bg-blue700 focus:text-gray300 outline-none rounded-sm md:hidden"
			>
				<Item className="flex items-center justify-between hover:bg-blue700 hover:text-gray300 outline-none px-4 py-1 rounded-sm">
					Contate-nos <PhoneIcon width={20} height={20} />
				</Item>
			</Link>
		</>
	);
}
