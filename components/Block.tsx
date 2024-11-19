import React, { ReactNode } from 'react'

type Props = {
	children: ReactNode
	className?: string
	noGrid?: boolean
}

const Block = ({ children, className, noGrid }: Props) => {
	return (
		<div
			className={`h-screen max-w-7xl mx-auto px-4 ${className || ''} ${
				noGrid ? '' : 'grid grid-cols-[7fr_5fr] gap-x-10 items-center'
			}`}
		>
			{children}
		</div>
	)
}

export default Block
