import React, { forwardRef } from 'react'

type Props = {
	text?: string
	className?: string
}

const Heading = forwardRef<HTMLHeadingElement, Props>(
	({ text, className }, ref) => {
		if (!text) return null

		return (
			<h2
				ref={ref}
				className={`font-kudry text-9xl ${className || ''}`}
				dangerouslySetInnerHTML={{ __html: text }}
			/>
		)
	}
)

Heading.displayName = 'Heading'

export default Heading
