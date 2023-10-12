import Image from 'next/image';

interface IProfileIconProps {
	profile_picture: string;
}

export function ProfileIcon({ profile_picture }: IProfileIconProps) {
	return (
		<Image
			src={profile_picture}
			alt="Logged in user's profile picture"
			height={50}
			width={50}
			className="rounded-full"
		/>
	);
}
