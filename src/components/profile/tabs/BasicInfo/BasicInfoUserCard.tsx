'use client';

import { FallbackAvatar } from '@/components/fallbackAvatar';
import { LoadingIcon } from '@/components/loadingIcon';
import { useAuth } from '@/contexts/auth/AuthContext';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { TabsFileInput } from '../TabsFileInput';

export function BasicInfoUserCard() {
	const { user } = useAuth();
	const { register } = useFormContext();

	return (
		<div className="h-full flex-1 mt-8 bg-gray400 p-8 rounded-md shadow-black shadow-md">
			<div className="flex flex-col items-center justify-center gap-4 mx-auto w-full mb-14">
				{!user ? (
					<LoadingIcon classname="text-blue500 animate-spin" />
				) : user.avatar ? (
					<Image
						src={user.avatar}
						alt="User profile picture"
						width={200}
						height={200}
						className="w-[200px] h-[200px] object-cover rounded-full"
					/>
				) : (
					<FallbackAvatar
						width="w-[200px]"
						height="h-[200px]"
						text="text-7xl"
						name={user.email}
					/>
				)}

				<h2 className="text-3xl text-white font-bold">{user?.name}</h2>
			</div>

			<TabsFileInput
				id="avatarInput"
				label="Mudar avatar"
				accept="image/jpeg,image/png,image/jpg"
				{...register('avatar')}
			/>
		</div>
	);
}
