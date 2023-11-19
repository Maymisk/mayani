import { LoginForm } from '@/components/login/LoginForm';
import Link from 'next/link';

export default function Login() {
	return (
		<main className="text-center w-full max-w-xs">
			<div className="bg-gray400 min-h-[24rem] p-4 rounded-md flex flex-col gap-2 shadow-md shadow-gray-600">
				<h1 className="text-blue100 font-bold text-2xl">Login</h1>

				<LoginForm />
			</div>

			<Link
				href={'/signUp'}
				className="text-blue500 font-bold hover:text-blue700 transition-all mt-2 block hover:scale-105"
			>
				Ainda não é registrado?
			</Link>
		</main>
	);
}
