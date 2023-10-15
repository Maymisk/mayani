import { currencyFormatter } from '@/utils/currencyFormatter';
import Image from 'next/image';
import Link from 'next/link';

interface IPricingCardProps {
	title: string;
	description: string;
	price: number;
	image: string;
}

export function PricingCard({
	title,
	description,
	price,
	image,
}: IPricingCardProps) {
	return (
		<div className="max-w-[400px] h-full rounded-lg shadow-lg shadow-gray-900 flex flex-col hover:scale-[1.015] transition-all">
			<Image
				src={image}
				alt="Image describing the paid plan"
				height={200}
				width={300}
				className="w-full max-h-[200px] rounded-t-lg bg-white"
			/>

			<div className="flex flex-col justify-center items-center gap-8 flex-1 p-8">
				<div className="w-full flex justify-between items-center">
					<h3 className="text-3xl">{title}</h3>

					<div className="flex flex-col gap-2">
						<h3 className="text-2xl font-light">
							{currencyFormatter.format(price)}
						</h3>
						<span className="font-extralight text-sm">/ mês</span>
					</div>
				</div>

				<p className="font-light">{description}</p>

				<Link
					href={''}
					className="px-8 py-4 border-2 border-blue700 text-blue700 hover:border-blue500 hover:text-blue500 transition-all rounded-md mt-auto"
				>
					Assinar
				</Link>
			</div>
		</div>
	);
}
