'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import Block from '@/components/Block'
import Map from '@/components/Map'
import Text from '@/components/Text'
import Heading from '@/components/typo/Heading'
import Paragraph from '@/components/typo/Paragraph'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import '../styles/global.scss'
import { Mousewheel } from 'swiper/modules'

export default function Home() {
	const [isMapLoaded, setIsMapLoaded] = useState(false)
	const headingRefs = useRef<HTMLHeadingElement[]>([])

	useEffect(() => {
		setIsMapLoaded(true)
	}, [])

	// Функция для добавления рефов к заголовкам
	const addToHeadingRefs = (el: HTMLHeadingElement) => {
		if (el && !headingRefs.current.includes(el)) {
			headingRefs.current.push(el)
		}
	}

	// Анимация заголовка при смене слайда
	const handleSlideTransitionEnd = (swiper: any) => {
		const activeIndex = swiper.activeIndex - 1
		const activeHeading = headingRefs.current[activeIndex]

		// Анимация для активного заголовка
		if (activeHeading) {
			gsap.to(activeHeading, { opacity: 1, y: 0, duration: 1 })
		}
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
		>
			<SwiperSlide>
				<Image
					src='/img/3.jpg'
					alt=''
					width={2560}
					height={1440}
					className='w-full h-screen object-cover object-left'
				/>
			</SwiperSlide>
			<SwiperSlide>
				<Block>
					<Text>
						{/* Добавляем реф к заголовку */}
						<Heading text='Dear Guests!' ref={addToHeadingRefs} />
						<Paragraph>
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
						className='w-full h-full max-h-[800px] object-cover object-left rounded-t-full'
					/>
				</Block>
			</SwiperSlide>

			<SwiperSlide>
				<Block noGrid className='flex items-center justify-center'>
					<Text>
						<Heading
							text='When?'
							className='text-center'
							ref={addToHeadingRefs}
						/>
						<Paragraph size='text-4xl' className='text-center'>
							00.06.2025
						</Paragraph>
					</Text>
				</Block>
			</SwiperSlide>

			<SwiperSlide>
				<Block noGrid className='flex flex-col justify-center'>
					<Text>
						<Heading text='Where?' ref={addToHeadingRefs} />
						<Paragraph>
							Наш праздник пройдет в&nbsp;ресторане "Русская рыбалка"
							<br />
							<span className='font-semibold'>
								По адресу: Пос. Комарово, Приморское шоссе, 452 А
							</span>
						</Paragraph>
					</Text>
					{isMapLoaded && (
						<Map className='w-full h-1/2 rounded-3xl overflow-hidden mt-10' />
					)}
				</Block>
			</SwiperSlide>
		</Swiper>
	)
}
