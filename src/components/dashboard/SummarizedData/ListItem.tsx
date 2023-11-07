import { ReactElement } from 'react';

interface IListItemProps {
	title: string;
	data: number | string;
	Icon: ReactElement;
	iconColor?: string;
}

export function ListItem({ title, data, Icon, iconColor }: IListItemProps) {
	return (
		<li className="flex items-center gap-4">
			<span
				className={`bg-gray400 p-4 rounded-md text-${
					iconColor || 'blue500'
				}`}
			>
				{Icon}
			</span>

			<div className="flex flex-col justify-between h-full text-xl text-white uppercase font-bold">
				<span className="text-gray200 text-xs mb-2">{title}</span>

				<span className="hover:translate-y-[-2px] transition-all">
					{data}
				</span>
			</div>
		</li>
	);
}
