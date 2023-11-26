'use client';

import { BellIcon } from '@heroicons/react/24/solid';
import { Root, Trigger, Portal, Content } from '@radix-ui/react-popover';
import { fetchNotifications } from './fetch';
import { NotificationCard } from './NotificationCard';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useEffect, useState } from 'react';

interface INotification {
	id: string;
	description: string;
	href: string | null;
	created_at: string;
}

interface INotificationsData {
	notifications: INotification[];
	hasUnread: boolean;
}

export function NotificationButton() {
	const { user } = useAuth();
	const [data, setData] = useState<INotificationsData | null>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!user) return;

		// update every notification's "read_at" whenever the user clicks the notification bell
		fetchNotifications(user!.auth_id).then(data => setData(data));
	}, [user]);

	function onClick() {
		setOpen(false);
	}

	return (
		<li className={`${!user && 'hidden'}`}>
			<Root open={open} onOpenChange={setOpen}>
				<Trigger className="text-white relative font-bold flex items-center justify-center">
					{data && data.hasUnread && (
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
						<div className="w-[40rem] max-h-96 overflow-y-scroll relative z-50 bg-gray400 text-gray300 py-4 rounded-md px-2 flex flex-col gap-1 shadow-md shadow-black animate-fadeOut data-[state='open']:animate-fadeIn mt-7">
							{data?.notifications?.map(notification => (
								<NotificationCard
									key={notification.id}
									{...notification}
									onClick={onClick}
								/>
							))}
						</div>
					</Content>
				</Portal>
			</Root>
		</li>
	);
}
