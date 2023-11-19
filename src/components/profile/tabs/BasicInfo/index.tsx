'use client';

import { useAuth } from '@/contexts/auth/AuthContext';
import { Content } from '@radix-ui/react-tabs';
import { TabsInput } from '../TabsInput';
import { TabsTextArea } from '../TabsTextArea';
import { BasicInfoUserCard } from './BasicInfoUserCard';
import { TabsFileInput } from '../TabsFileInput';

export function BasicInfo() {
	const { user } = useAuth();

	return (
		<Content value="info" asChild>
			<form className="w-full flex gap-8">
				<BasicInfoUserCard />

				<div className="w-full max-w-3xl mt-8 bg-gray400 p-8 rounded-md shadow-black shadow-md">
					<div className="flex gap-4">
						<TabsInput
							label="Nome"
							type="text"
							placeholder="Digite seu nome.."
						/>

						<TabsInput
							label="Nome de usuário"
							type="text"
							placeholder="Digite seu nome de usuário.."
						/>
					</div>

					<TabsInput
						label="Localização"
						type="text"
						placeholder="Cidade, País"
					/>

					{user?.isWorker && (
						<>
							<TabsTextArea
								label="biografia"
								placeholder="Digite sua biografia.."
							/>

							<div className="flex gap-4">
								<TabsInput
									label="Ocupação"
									type="text"
									placeholder="Diga-nos seu trabalho "
								/>

								<TabsFileInput
									id="resumeInput"
									label="Envie seu currículo"
									accept="application/pdf"
								/>
							</div>
						</>
					)}

					<div className="flex items-center justify-center gap-8">
						<button
							type="button"
							className="bg-transparent px-8 py-4 border-2 border-blue500 rounded-md font-bold uppercase text-white flex-1"
						>
							Cancelar
						</button>

						<button
							type="submit"
							className="flex-1 px-8 py-4 bg-blue500 rounded-md font-bold uppercase text-gray500 hover:bg-blue700 hover:text-white transition-all disabled:cursor-not-allowed disabled:opacity-75"
						>
							Salvar
						</button>
					</div>
				</div>
			</form>
		</Content>
	);
}
