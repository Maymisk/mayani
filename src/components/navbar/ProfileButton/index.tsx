'use client';

import { Root, Portal } from '@radix-ui/react-dropdown-menu';
import { ProfileIcon } from './ProfileIcon';
import { ProfileMenu } from './ProfileMenu';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

export function ProfileButton() {
	const { user, isLoading } = useAuth();
	const avatar = user?.isWorker?.avatar;

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
						<div className="flex flex-col gap-2 items-start justify-center">
							<span className="text-white font-bold text-sm">
								{user.username}
							</span>
							<span className="font-extralight text-gray300 text-xs max-w-[150px] overflow-hidden text-ellipsis">
								{user.email}
							</span>
						</div>

						<ProfileIcon avatar={avatar || ''} />
					</div>

					<Portal>
						<ProfileMenu />
					</Portal>
				</Root>
			) : (
				<Link
					href="/auth/login"
					className="border-2 border-gray400 p-3 rounded-sm hover:border-blue700 transition-all"
				>
					Fazer Login
				</Link>
			)}
		</li>
	);
}
