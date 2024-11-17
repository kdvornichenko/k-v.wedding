'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type PreviewProps = {
	totalImages: number // Количество изображений
	interval?: number // Интервал между изображениями в миллисекундах
	onComplete?: () => void // Функция обратного вызова после завершения
}

const Loader = ({ progress }: { progress: number }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center text-white text-2xl'>{`Loading ${progress}%`}</div>
	)
}

const Preview: React.FC<PreviewProps> = ({
	totalImages,
	interval = 1000,
	onComplete,
}) => {
	const [loaded, setLoaded] = useState(false) // Указывает, загружены ли изображения
	const [currentImage, setCurrentImage] = useState(0) // Текущий индекс изображения
	const [progress, setProgress] = useState(0) // Прогресс загрузки
	const [isMounted, setIsMounted] = useState(false) // Указывает, что превью смонтирован
	const imageUrls = Array.from(
		{ length: totalImages },
		(_, i) => `/img/loader-${i + 1}.jpg`
	)

	// Предзагрузка изображений с отслеживанием прогресса
	useEffect(() => {
		let loadedCount = 0

		const imagePromises = imageUrls.map(src => {
			return new Promise<void>(resolve => {
				const img: HTMLImageElement = new globalThis.Image()
				img.src = src
				img.onload = () => {
					loadedCount++
					setProgress(Math.round((loadedCount / totalImages) * 100)) // Обновляем прогресс
					resolve()
				}
				img.onerror = () => {
					loadedCount++
					setProgress(Math.round((loadedCount / totalImages) * 100)) // Обновляем прогресс даже при ошибке
					resolve()
				}
			})
		})

		Promise.all(imagePromises).then(() => {
			setLoaded(true) // Все изображения загружены
		})
	}, [imageUrls, totalImages])

	// Переключение изображений с использованием точного таймера
	useEffect(() => {
		if (!loaded || !isMounted) return // Ждём, пока превью смонтируется и загрузится

		let startTime = performance.now()
		let frameId: number | null = null

		const switchImage = (time: number) => {
			const elapsed = time - startTime

			// Проверяем, прошло ли заданное время для переключения
			if (elapsed >= interval) {
				setCurrentImage(prev => {
					const nextIndex = prev + 1
					if (nextIndex >= totalImages) {
						// Когда все изображения показаны
						setTimeout(() => {
							onComplete?.() // Вызываем onComplete, если он передан
						}, interval)
						return prev // Останавливаем переключение на последнем изображении
					}
					return nextIndex
				})
				startTime = time // Сбрасываем начальное время
			}

			// Рекурсивный вызов для следующего кадра
			frameId = requestAnimationFrame(switchImage)
		}

		frameId = requestAnimationFrame(switchImage)

		return () => {
			if (frameId) cancelAnimationFrame(frameId) // Очищаем таймер при размонтировании
		}
	}, [loaded, interval, totalImages, onComplete, isMounted])

	if (!loaded) return <Loader progress={progress} />

	return (
		<div className='relative w-full h-screen'>
			{imageUrls.map((src, index) => (
				<Image
					key={src}
					src={src}
					alt={`Preview ${index + 1}`}
					width={2560}
					height={1440}
					className={`grayscale w-full h-full object-cover object-center ${
						index === currentImage ? 'block' : 'hidden'
					}`}
					priority // Ускоряет загрузку изображений
					onLoad={() => {
						if (index === 0) setIsMounted(true) // Устанавливаем, что первый кадр отображён
					}}
				/>
			))}
		</div>
	)
}

export default Preview
