'use client'

import React, { FormEvent, forwardRef, useState } from 'react'
import { RadioGroup, Radio } from '@nextui-org/radio'
import { cn } from '@nextui-org/theme'
import { Input } from '@nextui-org/input'
import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox'
type TForm = {
	className?: string
}

type TFormItem = {
	type: 'radio' | 'checkbox' | 'input'
	label: string
	options?: Array<{ value: string; text: string; isDefault?: boolean }>
}

const Form = forwardRef<HTMLFormElement, TForm>(({ className }, ref) => {
	const [checkboxValues, setCheckboxValues] = useState<string[]>(['nope'])
	const labelClassNames = 'text-slate-950 text-2xl lg:text-3xl mb-3'

	const onFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		console.log(e)
	}

	const formItems: TFormItem[] = [
		{ type: 'input', label: 'Ваше Имя и Фамилия' },
		{
			type: 'radio',
			label: 'Придете?',
			options: [
				{ value: 'solo', text: 'Приду один (одна)', isDefault: true },
				{ value: 'couple', text: 'Приду с половинкой' },
				{ value: 'nope', text: 'Не смогу присутствовать (не сможем)' },
			],
		},
		{
			type: 'radio',
			label: 'Как планируете добираться до места свадьбы?',
			options: [
				{ value: 'transfer', text: 'На нашем трансфере' },
				{ value: 'self', text: 'Самостоятельно', isDefault: true },
			],
		},
		{
			type: 'checkbox',
			label: 'Алкоголь?',
			options: [
				{ value: 'red-dry', text: 'Красное сухое' },
				{ value: 'red-semi-sweet', text: 'Красное полусухое' },
				{ value: 'white-dry', text: 'Белое сухое' },
				{ value: 'white-semi-sweet', text: 'Белое полусухое' },
				{ value: 'champaign', text: 'Шампанское' },
				{ value: 'nope', text: 'Не пью', isDefault: true },
			],
		},
	]

	const handleCheckboxChange = (value: string) => {
		setCheckboxValues(prevValues => {
			if (value === 'nope') {
				// Если выбрано `nope`, оставляем только его
				return ['nope']
			} else if (prevValues.includes(value)) {
				// Если значение уже есть, удаляем его
				return prevValues.filter(v => v !== value)
			} else {
				// Убираем `nope` и добавляем новое значение
				return [...prevValues.filter(v => v !== 'nope'), value]
			}
		})
	}

	return (
		<form
			ref={ref}
			onSubmit={onFormSubmit}
			className={`${className ?? ''} flex flex-col gap-y-10 font-gyre-mono`}
		>
			{formItems.map(item => {
				if (item.type === 'radio') {
					return (
						<RadioGroup
							key={`group-${item.label}`}
							label={item.label}
							classNames={{ label: cn(labelClassNames) }}
							defaultValue={
								item.options?.find(option => option.isDefault)?.value
							}
						>
							{item.options?.map(option => (
								<Radio
									key={`radio-${item.label}-${option.value}`}
									classNames={{
										wrapper: cn('group-data-[selected=true]:border-slate-950'),
										control: cn('group-data-[selected=true]:bg-slate-950'),
										label: cn('text-xl'),
									}}
									value={option.value}
								>
									{option.text}
								</Radio>
							))}
						</RadioGroup>
					)
				}

				if (item.type === 'input') {
					return (
						<Input
							key={`input-${item.label}`}
							type='text'
							variant='underlined'
							label={item.label}
							placeholder=''
							size='lg'
							classNames={{
								inputWrapper:
									'transition-all border-slate-950 data-[hover=true]:border-slate-950/50',
								input: 'text-xl',
								label: 'text-lg',
							}}
						/>
					)
				}

				if (item.type === 'checkbox') {
					return (
						<CheckboxGroup
							key={`group-${item.label}`}
							label={item.label}
							classNames={{
								label: cn(labelClassNames),
							}}
							defaultValue={item.options
								?.filter(option => option.isDefault)
								.map(option => option.value)}
							value={checkboxValues}
						>
							{item.options?.map(option => (
								<Checkbox
									key={`checkbox-${item.label}-${option.value}`}
									classNames={{
										wrapper: cn(
											'group-data-[selected=true]:border-slate-950 after:bg-slate-950'
										),
										label: cn('text-xl'),
									}}
									value={option.value}
									onChange={() => handleCheckboxChange(option.value)}
								>
									{option.text}
								</Checkbox>
							))}
						</CheckboxGroup>
					)
				}
			})}
		</form>
	)
})

Form.displayName = 'Form'

export default Form
