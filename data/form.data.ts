import { TFormItem } from '@/types/form.type'

export const formItems: TFormItem[] = [
	{ id: 'name', type: 'input', label: 'Имя' },
	{ id: 'surname', type: 'input', label: 'Фамилия' },
	{
		id: 'attendance',
		type: 'radio',
		label: 'Придете?',
		options: [
			{ value: 'solo', text: 'Приду', isDefault: true },
			// {
			// 	value: 'couple',
			// 	text: 'Приду с половинкой',
			// },
			{ value: 'nope', text: 'Не приду :(' },
		],
	},
	{
		id: 'transport',
		type: 'radio',
		label: 'Как планируете добираться до места свадьбы?',
		options: [
			{ value: 'transfer', text: 'На нашем трансфере' },
			{ value: 'self', text: 'Самостоятельно', isDefault: true },
		],
	},
	{
		id: 'meal',
		type: 'radio',
		label: 'Мясо/Рыба',
		options: [
			{ value: 'beef', text: 'Мясо', isDefault: true },
			{ value: 'fish', text: 'Рыба' },
		],
	},
	{
		id: 'alcohol',
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
	{
		id: 'allergies',
		type: 'radio',
		label: 'Есть ли у вас аллергия?',
		options: [
			{ value: 'yeap', text: 'Да' },
			{ value: 'nope', text: 'Нет', isDefault: true },
		],
	},
	{
		id: 'phone',
		type: 'input',
		label: 'Введите ваш номер телефона'
	},
	{
		id: 'telegram',
		type: 'input',
		label: 'Введите ваш ник в telegram (если пользуетесь)'
	},
	{
		id: 'about',
		type: 'textarea',
		label: 'Расскажите что-нибудь о себе, какой-то интересный факт или что вы любите/не любите ❤️',
	},
]
