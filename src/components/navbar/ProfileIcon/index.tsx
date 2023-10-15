import Image from 'next/image';

interface IProfileIconProps {
	profile_picture: string;
}

export function ProfileIcon({ profile_picture }: IProfileIconProps) {
	return (
		<Image
			src={profile_picture}
			alt="Logged in user's profile picture"
			height={60}
			width={60}
			className="rounded-full"
		/>
	);
}
