import { ReactNode } from 'react'

type Props = {
	children?: ReactNode
	className?: string
	size?: 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl'
}

const Paragraph = ({ children, className, size }: Props) => {
	if (!children) return

	return (
		<p className={`font-gyre-mono ${className || ''} ${size || 'text-3xl'}`}>
			{children}
		</p>
	)
}

export default Paragraph
