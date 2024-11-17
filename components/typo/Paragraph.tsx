import { forwardRef, ReactNode } from 'react'

type Props = {
	children?: ReactNode
	className?: string
	size?: 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl'
}

const Paragraph = forwardRef<HTMLParagraphElement, Props>(
	({ children, className, size }, ref) => {
		if (!children) return null

		return (
			<p
				ref={ref} // Передаем ref в элемент <p>
				className={`font-gyre-mono opacity-0 translate-y-1/2 ${
					className || ''
				} ${size || 'text-3xl'}`}
			>
				{children}
			</p>
		)
	}
)

Paragraph.displayName = 'Paragraph'

export default Paragraph
