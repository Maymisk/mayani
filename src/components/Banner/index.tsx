import Image from 'next/image';

export function Banner() {
	return (
		<div className="w-full h-[24rem] bg-white flex flex-col justify-center items-center">
			<Image
				className="w-auto h-auto"
				width={400}
				height={400}
				src={'/logo.png'}
				alt="Job Connect Logo"
			/>
		</div>
	);
}
