import Image from 'next/image';

interface IWorkCardProps {
	title: string;
	description: string | null;
	users: {
		name: string;
	};
}

export function WorkCard({ title, description, users }: IWorkCardProps) {
	return (
		<li className="flex gap-4 border-b-2 pb-4 mb-12 border-gray400">
			<div>
				<h1 className="text-3xl font-bold text-blue500 hover:text-blue700 transition-all">
					{title}
				</h1>

				<span className="font-extralight text-sm uppercase text-gray300 block mt-3">
					requisitado por {users.name}
				</span>

				<p className="max-h-[9rem] leading-6 mt-4 overflow-hidden">
					{description}
				</p>
			</div>
		</li>
	);
}
