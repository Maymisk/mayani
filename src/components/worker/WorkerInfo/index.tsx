import { FallbackAvatar } from '@/components/fallbackAvatar';
import Image from 'next/image';
import Link from 'next/link';

interface IUserInfoProps {
	id: string;
	name: string;
	bio: string | null;
	avatar: string | null;
	resume: string | null;
}

export function WorkerInfo({ id, name, bio, avatar, resume }: IUserInfoProps) {
	return (
		<section className="flex items-start justify-between gap-16 p-6 mt-8 rounded-lg text-blue100">
			<div className="flex flex-col items-center gap-10">
				<h1 className="text-6xl text-center leading-[5rem]">
					Olá, eu sou {name},
					<span className="block">Trabalhador</span>
				</h1>

				<p className="w-full max-w-3xl text-justify">{bio}</p>

				<div className="flex items-center justify-evenly w-full">
					<Link
						href={resume || '#'}
						className="w-full max-w-[200px] text-center font-bold p-3 rounded-md bg-blue700 hover:bg-blue500 transition-all"
					>
						Baixe meu currículo
					</Link>

					<Link
						href={`/hire/worker/${id}`}
						className="w-full max-w-[200px] text-center font-bold p-3 rounded-md bg-blue700 hover:bg-blue500 transition-all"
					>
						Contrate-me
					</Link>
				</div>
			</div>

			{avatar ? (
				<Image
					src={avatar}
					alt={`${name}'s profile picture`}
					width={250}
					height={250}
					className="rounded-full"
				/>
			) : (
				<FallbackAvatar
					name={name}
					text="text-9xl"
					width="w-[250px]"
					height="h-[250px]"
				/>
			)}
		</section>
	);
}
