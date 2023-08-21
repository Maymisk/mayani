import { LoginForm } from '@/components/login/LoginForm';
import Link from 'next/link';

export default function Login() {
	return (
		<div className="text-center w-full max-w-xs scale-95 hover:scale-100 transition-all">
			<div className="bg-gray400 h-96 p-4 rounded-md flex flex-col gap-2">
				<h1 className="text-blue100 font-bold text-2xl">Login</h1>

				<LoginForm />
			</div>

			<Link
				href={'/auth/signUp'}
				className="text-blue500 font-bold hover:text-blue700 transition-all mt-2 block"
			>
				Ainda não é registrado?
			</Link>
		</div>
	);
}
