import Image from 'next/image';
import { TabsFileInput } from '../TabsFileInput';

export function BasicInfoUserCard() {
	return (
		<div className="h-full flex-1 mt-8 bg-gray400 p-8 rounded-md shadow-black shadow-md">
			<div className="flex flex-col items-center justify-center gap-4 mx-auto w-full mb-14">
				<Image
					src={'https://github.com/maymisk.png'}
					alt="User profile picture"
					width={200}
					height={300}
					className="rounded-full"
				/>

				<h2 className="text-3xl text-white font-bold">Khalil Bohner</h2>
			</div>

			<TabsFileInput
				id="avatarInput"
				label="Mudar avatar"
				accept="image/jpeg,image/png,image/jpg"
			/>
		</div>
	);
}
