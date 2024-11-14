import { ReactNode } from 'react'
import Heading from './typo/Heading'
import Paragraph from './typo/Paragraph'

type Props = {
	className?: string
	children: ReactNode
}

const Text = ({ className, children}: Props) => {
	return <div className={`flex flex-col gap-y-8 ${className || ''}`}>{children}</div>
}

export default Text
