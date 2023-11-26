'use client';

import { LoadingIcon } from '@/components/loadingIcon';
import { api } from '@/services/api';
import {
	Root,
	Trigger,
	Overlay,
	Content,
	Portal,
	Title,
	Description,
	Cancel,
	Action,
} from '@radix-ui/react-alert-dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IFinishWorkButton {
	work_id: string;
	client_id: string;
}

export function FinishWorkButton({ work_id, client_id }: IFinishWorkButton) {
	const router = useRouter();

	async function onConfirm() {
		const response = await api.put('/work', {
			id: work_id,
			end_date: new Date().toISOString(),
			client_id,
		});

		if (response.status === 200) router.refresh();
	}

	return (
		<Root>
			<Trigger asChild>
				<button className="w-1/2 mx-auto mt-8 px-8 py-4 uppercase text-sm bg-blue700 text-white rounded-lg font-bold hover:bg-blue500 outline-none transition-all">
					Finalizar serviço
				</button>
			</Trigger>

			<Portal>
				<Overlay className="absolute inset-0 bg-black opacity-40" />
				<Content className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-gray600 p-8 rounded-md shadow-lg shadow-black">
					<Title className="text-xl text-danger font-bold">
						Você tem certeza que quer terminar o trabalho?
					</Title>

					<Description className="font-extralight text-white mt-2">
						Essa ação não pode ser desfeita. Tenha a certeza de que
						já recebeu seu pagamento
					</Description>

					<div className="w-1/2 mx-auto flex justify-center items-center gap-4 mt-8">
						<Cancel asChild>
							<button className="w-full border-2 border-gray400 px-6 py-3 rounded-md text-white hover:brightness-125 outline-none">
								Cancelar
							</button>
						</Cancel>

						<Action asChild>
							<button
								onClick={() => onConfirm()}
								className="w-full bg-blue700 px-6 py-3 rounded-md text-white hover:brightness-125 transition-all disabled:brightness-75 flex items-center justify-center outline-none"
							>
								Confirmar
							</button>
						</Action>
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
