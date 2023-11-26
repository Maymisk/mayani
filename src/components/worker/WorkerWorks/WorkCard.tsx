import Image from 'next/image';

interface IWorkCardProps {
	title: string;
	tag?: string;
	description: string | null;
	banner_url?: string;
}

export function WorkCard({
	title,
	tag,
	description,
	banner_url,
}: IWorkCardProps) {
	return (
		<li className="flex gap-4 border-b-2 pb-4 mb-12 border-gray400">
			{banner_url && (
				<Image
					src={banner_url}
					alt="Previous work banner"
					width={246}
					height={180}
					className="w-auto h-auto rounded-lg"
				/>
			)}

			<div>
				<h1 className="text-3xl font-bold text-blue500 hover:text-blue700 transition-all">
					{title}
				</h1>

				<span className="font-extralight text-xl text-gray300 block mt-3">
					{tag || 'Trabalho'}
				</span>

				<p className="max-h-[9rem] leading-6 mt-4 overflow-hidden">
					{description}
				</p>
			</div>
		</li>
	);
}
