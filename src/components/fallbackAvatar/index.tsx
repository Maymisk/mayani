interface IFallbackAvatarProps {
	name: string;
	width?: string;
	height?: string;
	text?: string;
}

export function FallbackAvatar({
	name,
	width = 'w-[60px]',
	height = 'h-[60px]',
	text = 'text-3xl',
}: IFallbackAvatarProps) {
	const firstLetter = name[0];

	return (
		<div
			className={`${width} ${height} bg-blue700 text-white rounded-full flex items-center justify-center`}
		>
			<span className={`${text} font-bold uppercase`}>{firstLetter}</span>
		</div>
	);
}
