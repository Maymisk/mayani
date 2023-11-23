'use client';

import Image from 'next/image';
import { Trigger } from '@radix-ui/react-dropdown-menu';
import { FallbackAvatar } from '@/components/fallbackAvatar';
import { useAuth } from '@/contexts/auth/AuthContext';

export function ProfileIcon() {
	const { user } = useAuth();

	return (
		<Trigger className="outline-none hover:scale-105 transition-all">
			{user && user.avatar ? (
				<Image
					src={user.avatar}
					alt="Logged in user's profile picture"
					height={60}
					width={60}
					className="w-auto h-auto object-cover rounded-full"
				/>
			) : (
				<FallbackAvatar name={user?.email || 'U'} />
			)}
		</Trigger>
	);
}
