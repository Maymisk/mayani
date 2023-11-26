'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { Root, Item } from '@radix-ui/react-radio-group';
import './stars.css';

interface IStarsInputProps {
	value: string;
	onChange(value: string): void;
}

export function StarInput({ value, onChange }: IStarsInputProps) {
	return (
		<Root
			dir="rtl"
			defaultValue="0"
			defaultChecked={false}
			value={value}
			onValueChange={onChange}
		>
			<label className="block text-center text-white font-bold text-sm uppercase mb-4">
				Avaliação geral
			</label>

			<Item className="star" value={'5'}>
				<StarIcon width={50} height={50} />
			</Item>

			<Item className="star" value={'4'}>
				<StarIcon width={50} height={50} />
			</Item>

			<Item className="star" value={'3'}>
				<StarIcon width={50} height={50} />
			</Item>

			<Item className="star" value={'2'}>
				<StarIcon width={50} height={50} />
			</Item>

			<Item className="star" value={'1'}>
				<StarIcon width={50} height={50} />
			</Item>
		</Root>
	);
}
