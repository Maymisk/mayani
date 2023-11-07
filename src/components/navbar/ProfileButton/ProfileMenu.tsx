'use client';

import {
	ArrowRightOnRectangleIcon,
	InformationCircleIcon,
	StarIcon,
	UserIcon,
} from '@heroicons/react/24/solid';
import { Content, Item, Separator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@root/supabase/databaseTypes';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function ProfileMenu() {
	const { signOut } = useAuth();

	return (
		<Content
			className="w-[200px] bg-gray400 text-gray300 py-2 rounded-md  px-1 flex flex-col gap-1 shadow-md shadow-black"
			align="end"
		>
			<Link
				href={''}
				className="focus:bg-blue700 focus:text-gray300 outline-none rounded-sm"
			>
				<Item className="flex items-center justify-between hover:bg-blue700 hover:text-gray300 outline-none px-4 py-1 rounded-sm">
					Perfil <UserIcon width={20} height={20} />
				</Item>
			</Link>

			<Link
				href={'/dashboard/user/123'}
				className="focus:bg-blue700 focus:text-gray300 outline-none rounded-sm"
			>
				<Item className="flex items-center justify-between hover:bg-blue700 hover:text-gray300 outline-none px-4 py-1 rounded-sm">
					Painel <InformationCircleIcon width={20} height={20} />
				</Item>
			</Link>

			<Separator className="bg-gray500 h-[1px] mb-2" />

			<Link
				href={'/pricing'}
				className="focus:bg-yellow-400 focus:text-black outline-none rounded-sm text-yellow-400"
			>
				<Item className="flex items-center justify-between hover:bg-yellow-400 hover:text-black outline-none px-4 py-1 rounded-sm">
					Premium <StarIcon width={20} height={20} />
				</Item>
			</Link>

			<button
				onClick={signOut}
				className="focus:bg-danger focus:text-gray300 outline-none rounded-sm text-danger"
			>
				<Item className="flex items-center justify-between hover:bg-danger hover:text-gray300 outline-none px-4 py-1 rounded-sm">
					Sair <ArrowRightOnRectangleIcon width={20} height={20} />
				</Item>
			</button>
		</Content>
	);
}
