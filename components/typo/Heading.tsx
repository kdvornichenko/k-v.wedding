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
				className={`font-kudry py-2 text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${
					className || ''
				} bg-clip-text bg-[length:60px_60px] bg-repeat bg-slate-950/80 bg-[url("/img/pattern-50.png")] text-transparent`}
				dangerouslySetInnerHTML={{ __html: text }}
			/>
		)
	}
)

Heading.displayName = 'Heading'

export default Heading
