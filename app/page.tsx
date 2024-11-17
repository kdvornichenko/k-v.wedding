'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import Block from '@/components/Block'
import Map from '@/components/Map'
import Text from '@/components/Text'
import Heading from '@/components/typo/Heading'
import Paragraph from '@/components/typo/Paragraph'
import Image from 'next/image'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import '../styles/global.scss'
import { Mousewheel } from 'swiper/modules'
import Preview from '@/components/Preview'

export default function Home() {
	const [isMapLoaded, setIsMapLoaded] = useState(false)
	const [isPreviewComplete, setIsPreviewComplete] = useState(false)
	const [animDelay] = useState(0.3)
	const slideRefs = useRef<
		Record<
			number,
			{
				heading?: HTMLElement
				text?: HTMLElement
				image?: HTMLElement
				map?: HTMLElement
			}
		>
	>({})

	useEffect(() => {
		setIsMapLoaded(true)
	}, [])

	// Универсальная функция для добавления рефов
	const addToSlideRefs = (
		index: number,
		type: 'heading' | 'text' | 'image' | 'map',
		el: HTMLElement | null
	): void => {
		if (!el) return // Пропускаем, если элемент отсутствует
		if (!slideRefs.current[index]) {
			slideRefs.current[index] = {}
		}
		slideRefs.current[index][type] = el
	}

	// Анимация при завершении смены слайда
	const handleSlideTransitionEnd = (swiper: SwiperClass) => {
		const activeRefs = slideRefs.current[swiper.activeIndex]

		if (!activeRefs) return

		Object.entries(activeRefs).forEach(([type, element]) => {
			if (!element || element.classList.contains('animated')) return

			// Определяем параметры анимации
			const animationParams =
				type === 'heading' || type === 'text'
					? {
							opacity: 1,
							y: 0,
							duration: 1,
							delay: type === 'text' ? animDelay : 0,
					  }
					: { opacity: 1, duration: 1, ease: 'power1.in' }

			// Запускаем анимацию
			gsap.to(element, {
				...animationParams,
				onComplete: () => {
					// Добавляем класс после завершения анимации
					element.classList.add('animated')
				},
			})
		})
	}

	const getYearPhrase = (targetYear: number = 2025): string => {
		const currentYear = new Date().getFullYear()
		return currentYear === targetYear ? 'этом' : 'следующем'
	}

	return (
		<Swiper
			slidesPerView={1}
			modules={[Mousewheel]}
			direction='vertical'
			className='h-screen ease-in-out'
			mousewheel={{ forceToAxis: true }}
			speed={1200}
			onSlideChangeTransitionEnd={handleSlideTransitionEnd}
			allowSlideNext={isPreviewComplete}
			allowSlidePrev={isPreviewComplete}
		>
			<SwiperSlide className='h-screen'>
				<Preview
					totalImages={6}
					onComplete={() => setIsPreviewComplete(true)}
				/>
			</SwiperSlide>
			<SwiperSlide className='h-screen'>
				<Block>
					<Text>
						<Heading
							text='Dear Guests!'
							ref={el => addToSlideRefs(1, 'heading', el)}
						/>
						<Paragraph ref={el => addToSlideRefs(1, 'text', el)}>
							<>
								Один день в {getYearPhrase()} году станет для нас особенно
								важным, и мы хотим провести его в кругу близких и друзей!
								<br />С большим удовольствием приглашаем Вас на нашу свадьбу!
							</>
						</Paragraph>
					</Text>
					<Image
						src='/img/block-1.jpg'
						alt=''
						width={2560}
						height={1440}
						className='opacity-0 w-full h-full max-h-[800px] object-cover object-left rounded-t-full'
						ref={el => addToSlideRefs(1, 'image', el)}
					/>
				</Block>
			</SwiperSlide>

			<SwiperSlide className='h-screen'>
				<Block noGrid className='flex items-center justify-center'>
					<Text>
						<Heading
							text='When?'
							className='text-center'
							ref={el => addToSlideRefs(2, 'heading', el)}
						/>
						<Paragraph
							ref={el => addToSlideRefs(2, 'text', el)}
							size='text-5xl'
							className='text-center'
						>
							11.06.2025
						</Paragraph>
					</Text>
				</Block>
			</SwiperSlide>

			<SwiperSlide className='h-screen'>
				<Block noGrid className='flex flex-col justify-center'>
					<Text>
						<Heading
							text='Where?'
							ref={el => addToSlideRefs(3, 'heading', el)}
						/>
						<Paragraph ref={el => addToSlideRefs(3, 'text', el)}>
							Наш праздник пройдет в&nbsp;ресторане &quot;Русская рыбалка&quot;
							<br />
							<span className='font-semibold'>
								По адресу: Пос. Комарово, Приморское шоссе, 452 А
							</span>
						</Paragraph>
						{isMapLoaded && (
							<Map
								ref={el => addToSlideRefs(3, 'map', el)}
								className='w-full h-[50vh] rounded-3xl overflow-hidden mt-10'
							/>
						)}
					</Text>
				</Block>
			</SwiperSlide>
		</Swiper>
	)
}
