import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

interface ILoadingIconProps {
	classname?: string;
}

export function LoadingIcon({ classname }: ILoadingIconProps) {
	return (
		<WrenchScrewdriverIcon
			width={24}
			height={24}
			className={classname || 'text-gray400 animate-spin'}
		/>
	);
}
