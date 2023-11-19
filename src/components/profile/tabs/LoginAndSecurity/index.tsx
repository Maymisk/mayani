'use client';

import { Content } from '@radix-ui/react-tabs';
import { TabsInput } from '../TabsInput';
import Link from 'next/link';

export function LoginAndSecurity() {
	return (
		<Content
			className="max-w-3xl mx-auto mt-8 bg-gray400 p-8 rounded-md shadow-black shadow-md"
			value="security"
		>
			<div className="flex items-center justify-between gap-12">
				<TabsInput
					label="Email"
					type="text"
					disabled={true}
					readOnly={true}
					value={'khalilbohner@gmail.com'}
				/>

				<Link
					href={''}
					className="w-full max-w-[20%] font-bold text-xs text-white bg-gray500 p-4 rounded-sm uppercase text-center hover:bg-gray600 transition-all shadow-sm shadow-black"
				>
					Mudar email
				</Link>
			</div>

			<div className="flex items-center justify-between gap-12">
				<TabsInput
					label="senha"
					type="password"
					disabled={true}
					readOnly={true}
					value={'***************************'}
				/>

				<Link
					href={''}
					className="w-full max-w-[20%] font-bold text-xs text-white bg-gray500 p-4 rounded-sm uppercase text-center hover:bg-gray600 transition-all shadow-sm shadow-black"
				>
					Mudar senha
				</Link>
			</div>

			<div className="flex items-center justify-between gap-12">
				<TabsInput
					label="telefone"
					type="text"
					disabled={true}
					readOnly={true}
					value={'21312372193'}
				/>

				<Link
					href={''}
					className="w-full max-w-[20%] font-bold text-xs text-white bg-gray500 p-4 rounded-sm uppercase text-center hover:bg-gray600 transition-all shadow-sm shadow-black"
				>
					Mudar número
				</Link>
			</div>
		</Content>
	);
}
