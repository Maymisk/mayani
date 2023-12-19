'use client';

import { Input } from '@/components/global/inputs/Input';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Content } from '@radix-ui/react-tabs';
import Link from 'next/link';

export function LoginAndSecurity() {
	const { user } = useAuth();

	return (
		<Content
			className="max-w-3xl mx-auto mt-8 flex flex-col gap-6 bg-gray400 p-8 rounded-md shadow-black shadow-md"
			value="security"
			asChild
		>
			<div>
				<div className="flex items-center justify-between gap-12 max-md:gap-4">
					<Input
						label="Email"
						type="text"
						disabled={true}
						readOnly={true}
						value={user?.email || ''}
					/>

					<Link
						href={''}
						className="w-full max-w-[20%] font-bold text-xs text-white bg-gray500 p-4 rounded-sm uppercase text-center hover:bg-gray600 transition-all shadow-sm shadow-black mt-6 max-md:max-w-[30%]"
					>
						Mudar email
					</Link>
				</div>

				<div className="flex items-center justify-between gap-12 max-md:gap-4">
					<Input
						label="senha"
						type="password"
						disabled={true}
						readOnly={true}
						value={'***************************'}
					/>

					<Link
						href={''}
						className="w-full max-w-[20%] font-bold text-xs text-white bg-gray500 p-4 rounded-sm uppercase text-center hover:bg-gray600 transition-all shadow-sm shadow-black mt-6 max-md:max-w-[30%]"
					>
						Mudar senha
					</Link>
				</div>

				<div className="flex items-center justify-between gap-12 max-md:gap-4">
					<Input
						label="telefone"
						type="text"
						disabled={true}
						readOnly={true}
						value={user?.phone || '2132132131231'}
					/>

					<Link
						href={''}
						className="w-full max-w-[20%] font-bold text-xs text-white bg-gray500 p-4 rounded-sm uppercase text-center hover:bg-gray600 transition-all shadow-sm shadow-black mt-6 max-md:max-w-[30%]"
					>
						Mudar número
					</Link>
				</div>
			</div>
		</Content>
	);
}
