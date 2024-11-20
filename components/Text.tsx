import { ReactNode } from 'react'

type Props = {
	className?: string
	children: ReactNode
}

const Text = ({ className, children}: Props) => {
	return <div className={`flex flex-col gap-y-4 lg:gap-y-8 ${className || ''}`}>{children}</div>
}

export default Text
