'use client';

import Image from 'next/image';

export function UserCard() {
	return (
		<div>
			<Image
				src={'/'}
				alt="User profile picture"
				width={148}
				height={148}
			/>

			<div>
				<header>
					<h1>Khalil Bohner</h1>
				</header>

				<div></div>

				<footer></footer>
			</div>
		</div>
	);
}
