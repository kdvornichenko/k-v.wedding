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
				className={`font-kudry py-2 text-9xl ${
					className || ''
				} bg-clip-text bg-[length:50px_50px] bg-repeat bg-[url("/img/pattern.png")] text-transparent`}
				dangerouslySetInnerHTML={{ __html: text }}
			/>
		)
	}
)

Heading.displayName = 'Heading'

export default Heading
