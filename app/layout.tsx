import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
	src: './fonts/Kudry.woff',
	variable: '--font-kudry',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

const gyreMono = localFont({
	src: './fonts/Gyre.woff',
	variable: '--font-gyre-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Кирилл & Вика - Приглашение на свадьбу',
	description: 'Привет, друг! Мы будем рады видеть тебя на нашей свадьбе!',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${gyreMono.variable} antialiased overflow-x-hidden w-screen`}
			>
				{children}
			</body>
		</html>
	)
}
