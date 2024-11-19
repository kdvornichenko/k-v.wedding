import useLoaderStore from '@/store/loadre.store'
import Heading from './typo/Heading'

const Loader = () => {
	const { loaded, progress } = useLoaderStore()
	return (
		<div
			className={`fixed inset-0 w-screen h-screen bg-stone-50 flex items-center justify-center text-white text-2xl z-20 transition-opacity duration-1000 ${
				loaded ? 'opacity-0' : 'opacity-100'
			}`}
		>
			<Heading text={`Loading ${progress}%`} className='leading-relaxed' />
		</div>
	)
}

export default Loader
