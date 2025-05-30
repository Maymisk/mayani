import { Tabs } from '@/components/profile/tabs';

interface IProfileProps {
	params: {
		id: string;
	};
}

export default function Profile({ params: { id } }: IProfileProps) {
	return (
		<main className="mt-[3rem] max-xl:px-4">
			<h1 className="text-4xl text-white font-bold mb-4">Perfil</h1>

			<Tabs />
		</main>
	);
}
