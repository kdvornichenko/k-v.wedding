import { TIcon } from '@/types/icon.type'
import { forwardRef } from 'react'

export const Finger = forwardRef<SVGSVGElement, TIcon>(({ className }, ref) => {
	return (
		<svg
			width='470'
			height='528'
			viewBox='0 0 470 528'
			className={className}
			ref={ref}
		>
			<path
				d='M426.028 172.642C416.193 172.642 407.069 175.763 399.551 181.065C394.529 160.599 376.232 145.383 354.485 145.383C343.569 145.383 333.526 149.227 325.589 155.635C318.458 138.933 302.03 127.211 282.945 127.211C273.7 127.211 265.085 129.972 257.841 134.705V47.0127C257.841 21.0894 237.009 0 211.404 0C185.797 0 164.967 21.0894 164.967 47.0127V285.838L138.169 260.629C126.039 248.438 109.972 241.733 92.8867 241.733H92.7242C75.5099 241.776 59.3508 248.619 47.225 261.003C36.2182 272.241 36.2648 290.483 47.3268 301.668L205.622 461.661C234.67 493.658 275.862 512.002 318.717 512.002C403.495 512.002 472.466 441.999 472.466 355.952V219.655C472.466 193.732 451.634 172.642 426.028 172.642Z'
				fill='#DCDCDC'
			/>
			<path
				d='M426.028 172.642C416.193 172.642 407.069 175.763 399.551 181.065C394.529 160.599 376.232 145.383 354.485 145.383C343.569 145.383 333.526 149.227 325.589 155.635C318.458 138.933 302.03 127.211 282.945 127.211C273.7 127.211 265.085 129.972 257.841 134.705V47.0127C257.841 21.0894 237.009 0 211.404 0C185.797 0 164.967 21.0894 164.967 47.0127V285.838L138.169 260.629C126.039 248.438 109.972 241.733 92.8867 241.733H92.7242C75.5099 241.776 59.3508 248.619 47.225 261.003C36.2182 272.241 36.2648 290.483 47.3268 301.668L205.622 461.661C234.67 493.658 275.862 512.002 318.717 512.002C403.495 512.002 472.466 441.999 472.466 355.952V219.655C472.466 193.732 451.634 172.642 426.028 172.642ZM451.131 265.086V355.951C451.131 430.234 391.73 490.668 318.716 490.668C281.735 490.668 246.172 474.762 221.147 447.031C221.076 446.953 220.999 446.887 220.928 446.811C220.886 446.767 220.85 446.72 220.808 446.677L62.4925 286.664C59.5729 283.712 59.561 278.895 62.4665 275.928C70.5601 267.662 81.3253 263.095 92.7773 263.067H92.8845C104.293 263.067 115.037 267.577 123.143 275.773C123.233 275.864 123.324 275.953 123.417 276.041L168.324 318.288C169.841 319.714 171.742 320.664 173.792 321.023C175.843 321.382 177.953 321.133 179.864 320.307C181.775 319.481 183.402 318.115 184.546 316.375C185.689 314.636 186.299 312.6 186.3 310.518V47.0127C186.3 32.8534 197.561 21.3332 211.404 21.3332C225.246 21.3332 236.507 32.8534 236.507 47.0127V210.568C236.507 216.459 241.284 221.234 247.174 221.234C253.064 221.234 257.841 216.458 257.841 210.568V174.222C257.841 160.063 269.102 148.543 282.945 148.543C296.788 148.543 308.049 160.063 308.049 174.222V228.741C308.049 234.632 312.826 239.408 318.716 239.408C324.606 239.408 329.382 234.631 329.382 228.741V192.395C329.382 178.236 340.644 166.715 354.485 166.715C368.328 166.715 379.59 178.236 379.59 192.395V246.913C379.59 252.804 384.366 257.58 390.256 257.58C396.146 257.58 400.923 252.803 400.923 246.913V219.654C400.923 205.495 412.184 193.974 426.027 193.974C439.869 193.974 451.13 205.495 451.13 219.654V265.086H451.131Z'
				fill='black'
			/>
		</svg>
	)
})

Finger.displayName = 'Finger'