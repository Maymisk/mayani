import { FallbackAvatar } from '@/components/fallbackAvatar';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

interface IWorkOfferUserInfoProps {
	auth_id: string;
	name: string;
	avatar: string | null;
	rating: number;
	location: string | null;
	isWorker: boolean;
	authorIsWorker: boolean;
}

export function WorkOfferUserInfo({
	auth_id,
	name,
	avatar,
	rating,
	location,
	isWorker,
	authorIsWorker,
}: IWorkOfferUserInfoProps) {
	return (
		<Link
			href={isWorker ? `/worker/${auth_id}` : '#'}
			className="flex flex-col items-center jusitfy-center"
		>
			<span className="text-white font-extralight block mb-2">
				{authorIsWorker
					? 'Você recebeu uma contraoferta de:'
					: 'Você recebeu uma oferta de:'}
			</span>

			<div className="flex gap-4  p-4 rounded-xl">
				{avatar ? (
					<Image
						src={avatar}
						alt="User profile picture"
						width={100}
						height={100}
						className="rounded-xl"
					/>
				) : (
					<FallbackAvatar
						width="w-[100px]"
						height="h-[100px]"
						text="text-5xl"
						name={name}
					/>
				)}

				<div className="flex flex-col justify-between">
					<div>
						<h4 className="text-white font-bold text-2xl">
							{name}
						</h4>
						<span className="text-sm text-white font-extralight">
							{location}
						</span>
					</div>

					<span className="flex gap-2 text-blue700 font-semibold text-sm uppercase hover:text-blue500 transition-all">
						<StarIcon
							width={20}
							height={20}
							className="relative -top-[2px]"
						/>
						{rating
							? `${rating.toFixed(1)} em avaliações`
							: 'Sem avaliações'}
					</span>
				</div>
			</div>
		</Link>
	);
}
