'use client'

import { useEffect, useMemo, useState, FC } from 'react'
import Image from 'next/image'
import useLoaderStore from '@/store/loadre.store'
import useSlideShowStore from '@/store/slideShow.store'

type SlideShowProps = {
	totalImages: number
	interval?: number
	onComplete?: () => void
}

const SlideShow: FC<SlideShowProps> = ({
	totalImages,
	interval = 1200,
	onComplete,
}) => {
	const { loaded, setLoaded, setProgress } = useLoaderStore()
	const [currentImage, setCurrentImage] = useState(0)
	const [startSlideshow, setStartSlideshow] = useState(false)
	const [isLocalComplete, setIsLocalComplete] = useState(false) // Локальное состояние завершения
	const { setIsSlideShowComplete } = useSlideShowStore()

	const imageUrls = useMemo(
		() =>
			Array.from({ length: totalImages }, (_, i) => `/img/loader-${i + 1}.jpg`),
		[totalImages]
	)

	// Предзагрузка изображений с отслеживанием прогресса
	useEffect(() => {
		let loadedCount = 0

		const preloadImages = async () => {
			await Promise.all(
				imageUrls.map(src => {
					return new Promise<void>(resolve => {
						const img = new globalThis.Image()
						img.src = src
						img.onload = () => {
							loadedCount++
							setProgress(Math.round((loadedCount / totalImages) * 100))
							if (loadedCount === totalImages) {
								setLoaded(true) // Все изображения загружены
							}
							resolve()
						}
						img.onerror = () => {
							loadedCount++
							setProgress(Math.round((loadedCount / totalImages) * 100))
							if (loadedCount === totalImages) {
								setLoaded(true)
							}
							resolve()
						}
					})
				})
			)
		}

		preloadImages()
	}, [imageUrls, setProgress, setLoaded, totalImages])

	// Задержка перед началом слайдшоу
	useEffect(() => {
		if (!loaded) return

		const delayTimer = setTimeout(() => {
			setStartSlideshow(true) // Запускаем слайдшоу после задержки
		}, interval / 2)

		return () => clearTimeout(delayTimer)
	}, [loaded, interval])

	// Переключение изображений после загрузки
	useEffect(() => {
		if (!startSlideshow) return

		const intervalId = setInterval(() => {
			setCurrentImage(prev => {
				const nextImage = prev + 1
				if (nextImage >= totalImages) {
					clearInterval(intervalId) // Останавливаем слайдшоу
					setIsLocalComplete(true) // Локально отмечаем завершение
					return prev // Остаёмся на последнем изображении
				}
				return nextImage
			})
		}, interval)

		return () => clearInterval(intervalId)
	}, [startSlideshow, interval, totalImages])

	// Обновляем глобальное состояние завершения
	useEffect(() => {
		if (isLocalComplete) {
			setIsSlideShowComplete(true)
			onComplete?.()
		}
	}, [isLocalComplete, setIsSlideShowComplete, onComplete])

	return (
		<div
			className={`relative w-full h-screen duration-1000 delay-500 ${
				loaded ? 'opacity-100' : 'opacity-0'
			}`}
		>
			{loaded &&
				imageUrls.map((src, index) => (
					<Image
						key={src}
						src={src}
						alt={`SlideShow ${index + 1}`}
						width={2560}
						height={1440}
						className={`absolute inset-0 grayscale w-full h-full object-cover object-center transition-opacity duration-500 ${
							index === currentImage ? 'block' : 'hidden'
						}`}
						priority
					/>
				))}
		</div>
	)
}

export default SlideShow
