'use client'

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
import { Translations, useTranslation } from '@/lib/i18n'

const FormModal = () => {
	const {
		formSended,
		showFormModal,
		setShowFormModal,
		willBeAttended,
		formError,
	} = useFormState()

	const { t } = useTranslation()
	const formSendedTranslation = t(
		'formSendedModal'
	) as Translations['RU']['formSendedModal']

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
							{formSended
								? formSendedTranslation.success
								: formSendedTranslation.error}
						</ModalHeader>

						<ModalBody className='font-gyre-mono text-xl'>
							{formSended ? (
								willBeAttended ? (
									<div className='flex flex-col gap-y-4'>
										<span>{formSendedTranslation.successAttendedTitle}</span>
										<span>
											{formSendedTranslation.successAttendedHelp}{' '}
											<TelegramLink person='k' /> <TelegramLink person='v' />
										</span>
										<span>
											{formSendedTranslation.successAttendedOrganizer}{' '}
											<TelegramLink person='a' />
										</span>
									</div>
								) : (
									<div className='flex flex-col gap-y-4'>
										<span>{formSendedTranslation.successNotAttendedTitle}</span>
										<span>
											{formSendedTranslation.successNotAttendedHelp}{' '}
											<TelegramLink person='k' /> <TelegramLink person='v' />
										</span>
									</div>
								)
							) : (
								<div className='flex flex-col gap-y-4'>
									<div>
										<span>{formSendedTranslation.errorCopyInstruction} </span>
										<Snippet
											symbol=''
											variant='bordered'
											size='sm'
											disableCopy
											classNames={{
												base: 'gap-0',
												copyButton: 'opacity-100',
											}}
										/>

										<span>{formSendedTranslation.errorScreenshot} </span>
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
										{formSendedTranslation.errorNote}
									</span>
								</div>
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
