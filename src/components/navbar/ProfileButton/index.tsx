'use client';

import { Root, Portal } from '@radix-ui/react-dropdown-menu';
import { ProfileIcon } from './ProfileIcon';
import { ProfileMenu } from './ProfileMenu';
import { useAuth } from '@/contexts/auth/AuthContext';
import Link from 'next/link';
import {
	UserCircleIcon,
	WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';

export function ProfileButton() {
	const { user, isLoading } = useAuth();

	return (
		<li>
			{isLoading ? (
				<WrenchScrewdriverIcon
					width={20}
					height={20}
					className="animate-spin"
				/>
			) : user ? (
				<Root>
					<div className="flex items-center gap-4 border-l-2 border-gray400 pl-6">
						<div className="flex flex-col gap-2 items-start justify-center max-xl:hidden">
							<span className="text-white font-bold text-sm">
								{user.username}
							</span>
							<span className="font-extralight text-gray300 text-xs max-w-[150px] overflow-hidden text-ellipsis">
								{user.email}
							</span>
						</div>

						<ProfileIcon />
					</div>

					<Portal>
						<ProfileMenu />
					</Portal>
				</Root>
			) : (
				<Link
					href="/login"
					className="bg-white rounded-full hover:border-blue700 transition-all brightness-50"
				>
					<UserCircleIcon width={60} height={60} />
				</Link>
			)}
		</li>
	);
}
