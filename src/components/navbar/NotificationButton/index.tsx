'use client';

import { useAuth } from '@/contexts/auth/AuthContext';
import { api } from '@/services/api';
import { BellIcon } from '@heroicons/react/24/solid';
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import { useEffect, useMemo, useState } from 'react';
import { NotificationCard } from './NotificationCard';

export function NotificationButton() {
	const { user } = useAuth();
	const [open, setOpen] = useState(false);
	const [hasUnread, setHasUnread] = useState(false);

	const unread: any[] = useMemo(() => {
		const notifications: any[] = [];

		if (user)
			for (const notification of user.notifications)
				if (!notification.read_at) {
					if (!hasUnread) setHasUnread(true);
					notifications.push(notification.id);
				}

		return notifications;
	}, [user]);

	useEffect(() => {
		async function run() {
			if (open === false) return;

			if (hasUnread) {
				const response = await api.put('/notifications', {
					notifications: unread,
				});

				if (response.status === 200) setHasUnread(false);
			}
		}

		run();
	}, [open]);

	function onClick() {
		setOpen(false);
	}

	return (
		<li className={`${!user && 'hidden'}`}>
			<Root open={open} onOpenChange={setOpen}>
				<Trigger className="text-white relative font-bold flex items-center justify-center">
					{hasUnread && (
						<span className="w-[10px] h-[10px] text-xs absolute bg-danger top-0 right-0 rounded-full" />
					)}

					<BellIcon
						width={24}
						height={24}
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
					/>
				</Trigger>

				<Portal>
					<Content asChild align="center">
						<div className="w-full max-w-[40rem] max-h-96 overflow-y-auto relative z-50 bg-gray400 text-gray300 py-4 rounded-md px-2 flex flex-col gap-1 shadow-md shadow-black animate-fadeOut data-[state='open']:animate-fadeIn mt-7 max-xl:max-w-[20rem]">
							{user && user.notifications.length > 0 ? (
								user.notifications.map(notification => (
									<NotificationCard
										key={notification.id}
										{...notification}
										onClick={onClick}
									/>
								))
							) : (
								<span className="text-center text-gray300 brightness-75 uppercase">
									Sem notificações
								</span>
							)}
						</div>
					</Content>
				</Portal>
			</Root>
		</li>
	);
}
