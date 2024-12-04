import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/modal'
import React from 'react'
import TelegramLink from './TelegramLink'
import { Snippet } from '@nextui-org/snippet'
import { Button } from '@nextui-org/button'
import { Heart } from './icons/IconHeart'
import useFormState from '@/store/form.store'

const FormModal = () => {
	const {
		formSended,
		showFormModal,
		setShowFormModal,
		willBeAttended,
		formError,
	} = useFormState()

	return (
		<Modal
			isOpen={showFormModal}
			onOpenChange={isOpen => setShowFormModal(isOpen)}
			backdrop='blur'
			placement='center'
			size='2xl'
		>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1 font-kudry text-3xl'>
							{formSended ? 'Ответы отправлены!' : 'Ошибка при отправке формы'}
						</ModalHeader>
						<ModalBody className='font-gyre-mono text-xl'>
							{formSended ? (
								willBeAttended ? (
									<div className='flex flex-col gap-y-4'>
										<span>Спасибо! С нетерпением ждем Вас на свадьбе!</span>
										<span>
											Если есть вопросы насчет свадьбы или хотите что-то
											поменять в ответах, то пишите нам{' '}
											<TelegramLink person='k' /> <TelegramLink person='v' />
										</span>
										<span>
											Если есть что-то, о чем нам знать не надо, то можете
											пошушукаться с нашим организатором{' '}
											<TelegramLink person='a' />
										</span>
									</div>
								) : (
									<div>
										<span>Очень жаль 😢 Если передумаете, напишите нам </span>
										<TelegramLink person='k' /> <TelegramLink person='v' />
									</div>
								)
							) : (
								<>
									<div>
										<span>
											Ошибка при отправке формы. Пожалуйста, скопируйте это
											сообщение нажав на значок{' '}
										</span>
										<Snippet
											symbol=''
											variant='bordered'
											size='sm'
											disableCopy
											classNames={{
												base: 'gap-0',
												copyButton: 'opacity-100',
											}}
										/>{' '}
										<span>(или сделайте скриншот) и отправьте мне </span>
										<TelegramLink person='k' />
									</div>
									<Snippet
										symbol=''
										variant='bordered'
										size='lg'
										classNames={{ pre: 'whitespace-pre-line' }}
									>
										{formError}
									</Snippet>
									<span className='text-xs opacity-30'>
										Да-да, мне впадлу было делать логирование и привязывать
										какую-то БД
									</span>
								</>
							)}
						</ModalBody>
						<ModalFooter className='flex items-center justify-between'>
							<p className='text-lg font-kudry'>K&V</p>

							<Button
								color='primary'
								className='bg-slate-950'
								onPress={onClose}
							>
								<Heart className='size-4' />
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default FormModal
