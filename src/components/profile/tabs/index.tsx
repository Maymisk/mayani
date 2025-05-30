'use client';

import { List, Root, Trigger } from '@radix-ui/react-tabs';
import { BasicInfo } from './BasicInfo';
import { LoginAndSecurity } from './LoginAndSecurity';
import { useState } from 'react';

export function Tabs() {
	const [active, setActive] = useState<string>('info');

	function handleChange(value: string) {
		setActive(value);
	}

	return (
		<Root defaultValue="info" value={active} onValueChange={handleChange}>
			<List className="w-full border-b-2 border-gray400 flex items-center justify-start gap-10 max-xl:items-end">
				<Trigger
					value="info"
					className={`text-xl border-b-2 text-white capitalize font-light px-1 py-4 max-xl:w-full max-xl:text-lg ${
						active === 'info'
							? 'border-blue500'
							: 'border-transparent'
					}`}
				>
					Informações básicas
				</Trigger>

				<Trigger
					value="security"
					className={`text-xl border-b-2 text-white capitalize font-light px-1 py-4 max-xl:w-full max-xl:text-lg ${
						active === 'security'
							? 'border-blue500'
							: 'border-transparent'
					}`}
				>
					Segurança
				</Trigger>
			</List>

			<BasicInfo />

			<LoginAndSecurity />
		</Root>
	);
}
