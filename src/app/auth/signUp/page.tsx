import { SignUpForm } from '@/components/signUp/SignUpForm';
import Link from 'next/link';

export default function SignUp() {
	return (
		<div className="w-full max-w-xs text-center">
			<div className="bg-gray400 h-96 p-4 rounded-md flex flex-col gap-2 shadow-md shadow-gray-600">
				<h1 className="text-blue100 font-bold text-2xl">Sign Up</h1>

				<SignUpForm />
			</div>

			<Link
				href={'/auth/login'}
				className="text-blue500 font-bold hover:text-blue700 transition-all mt-2 block"
			>
				Já tem uma conta?
			</Link>
		</div>
	);
}
