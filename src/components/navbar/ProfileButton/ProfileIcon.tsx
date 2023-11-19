'use client';

import Image from 'next/image';
import { Trigger } from '@radix-ui/react-dropdown-menu';
import { FallbackAvatar } from '@/components/fallbackAvatar';
import { useAuth } from '@/contexts/auth/AuthContext';

interface IProfileIconProps {
	avatar: string | null;
}

export function ProfileIcon({ avatar }: IProfileIconProps) {
	const { user } = useAuth();

	return (
		<Trigger className="outline-none hover:scale-105 transition-all">
			{avatar ? (
				<Image
					src={avatar}
					alt="Logged in user's profile picture"
					height={60}
					width={60}
					className="rounded-full"
				/>
			) : (
				<FallbackAvatar name={user?.email || 'U'} />
			)}
		</Trigger>
	);
}
