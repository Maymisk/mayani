'use client';

import Image from 'next/image';
import { Info } from './Info';

export function UserCard() {
	return (
		<div className="mt-[-5rem] flex gap-8 bg-gray400 py-8 px-10 rounded-lg">
			<Image
				src={'/favicon.png'}
				alt="User profile picture"
				width={148}
				height={148}
				priority
				className="object-cover rounded-xl"
			/>

			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold text-blue100">
					Khalil Bohner
				</h1>

				<p className="text-gray300">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Veniam, consequuntur!
				</p>

				<Info company="Minha Empresa" followers={1000} rating={4.9} />
			</div>
		</div>
	);
}
