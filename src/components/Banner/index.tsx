import Image from 'next/image';
import Link from 'next/link';

export function Banner() {
	return (
		<header className="w-full h-[24rem] bg-white flex flex-col justify-center items-center">
			<Link href={'/'}>
				<Image
					className="w-auto h-auto"
					width={400}
					height={400}
					src={'/logo.png'}
					alt="Job Connect Logo"
					priority
				/>
			</Link>
		</header>
	);
}
