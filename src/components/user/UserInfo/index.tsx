import Image from 'next/image';
import { Suspense } from 'react';

interface IUserInfoProps {
	name: string;
	bio: string;
	occupation: string;
	avatar_url: string;
}

export function UserInfo({
	name,
	bio,
	occupation,
	avatar_url,
}: IUserInfoProps) {
	return (
		<section className="flex items-start justify-between gap-16 p-6 mt-8 rounded-lg text-blue100">
			<div className="flex flex-col items-center gap-10">
				<h1 className="text-6xl text-center leading-[5rem]">
					Olá, eu sou {name},
					<span className="block">{occupation}</span>
				</h1>

				<p className="w-full max-w-3xl text-justify">{bio}</p>

				<a
					href=""
					className="w-full max-w-[200px] text-center font-bold p-3 rounded-md bg-blue700 hover:bg-blue500 transition-all"
				>
					Baixe meu currículo
				</a>
			</div>

			<Image
				src={avatar_url}
				alt={`${name}'s profile picture`}
				width={250}
				height={250}
				className="rounded-full"
			/>
		</section>
	);
}
