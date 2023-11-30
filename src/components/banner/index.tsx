import Image from 'next/image';

export function MainBanner() {
	return (
		<header className="w-full h-[24rem] bg-[#fff] flex flex-col justify-center items-center">
			<Image
				className="w-[200px] h-[200px] object-cover"
				width={400}
				height={400}
				src={'/logo.png'}
				alt="Mayani Logo"
			/>
		</header>
	);
}
