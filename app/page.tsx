'use client'

import { useEffect, useRef, useState } from 'react'
import Block from '@/components/Block'
import Map from '@/components/Map'
import Text from '@/components/Text'
import Heading from '@/components/typo/Heading'
import Paragraph from '@/components/typo/Paragraph'
import Image from 'next/image'
import '../styles/global.scss'
import Preview from '@/components/Preview'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from '@studio-freight/react-lenis'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
	const [isMapLoaded, setIsMapLoaded] = useState(false)
	const [isPreviewComplete, setIsPreviewComplete] = useState(true)
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
	const containerRef = useRef<HTMLDivElement>(null) // Реф для корневого контейнера

	useEffect(() => {
		console.log('isPreviewComplete')
	}, [isPreviewComplete])

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

	useEffect(() => {
		setIsMapLoaded(true)

		// Настройка ResizeObserver
		const observer = new ResizeObserver(() => {
			window.dispatchEvent(new Event('resize', { bubbles: true }))
			console.log('ResizeObserver: размеры изменены')
		})

		if (containerRef.current) {
			observer.observe(containerRef.current) // Следим за изменениями размеров корневого элемента
		}

		return () => {
			observer.disconnect() // Отключаем наблюдатель при размонтировании
		}
	}, [])

	useEffect(() => {
		const animateElement = (element: HTMLElement | undefined) => {
			if (!element) return
			gsap.fromTo(
				element,
				{ opacity: 0 },
				{
					opacity: 1,
					scrollTrigger: {
						markers: false,
						trigger: element,
						start: 'top 100%',
						end: 'top 0',
						scrub: true,
					},
				}
			)
		}

		Object.entries(slideRefs.current).forEach(([key, refs]) => {
			if (!refs) return

			animateElement(refs.heading)
			animateElement(refs.text)
			animateElement(refs.image)
			animateElement(refs.map)

			console.log(key);
			
		})
	}, [isMapLoaded])

	const getYearPhrase = (targetYear: number = 2025): string => {
		const currentYear = new Date().getFullYear()
		return currentYear === targetYear ? 'этом' : 'следующем'
	}

	return (
		<ReactLenis root>
			<div ref={containerRef} className='relative bg-stone-50'>
				<div className='relative z-20'>
					<div className='h-screen'>
						<Preview
							totalImages={6}
							onComplete={() => setIsPreviewComplete(true)}
						/>
					</div>
					<Block className='py-10 h-screen'>
						<Text className='py-20'>
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
							className='w-full h-full max-h-[800px] object-cover object-left rounded-t-full'
							ref={el => addToSlideRefs(1, 'image', el)}
						/>
					</Block>

					<Block noGrid className='flex items-center justify-center h-screen'>
						<Text>
							<Heading
								text='When?'
								className='text-center'
								ref={el => addToSlideRefs(2, 'heading', el)}
							/>
							<Paragraph
								size='text-5xl'
								className='text-center'
								ref={el => addToSlideRefs(2, 'text', el)}
							>
								11.06.2025
							</Paragraph>
						</Text>
					</Block>

					<Block noGrid className='flex flex-col justify-center h-screen'>
						<Text>
							<Heading
								text='Where?'
								ref={el => addToSlideRefs(3, 'heading', el)}
								className='opacity-0'
							/>
							<Paragraph
								ref={el => addToSlideRefs(3, 'text', el)}
								className='opacity-0'
							>
								Наш праздник пройдет в&nbsp;ресторане &quot;Русская
								рыбалка&quot;
								<br />
								<span className='font-semibold'>
									По адресу: Пос. Комарово, Приморское шоссе, 452 А,
									<br />
									банкетный зал &quot;Летний&quot;
								</span>
							</Paragraph>
							{isMapLoaded && (
								<Map
									className='opacity-0 w-full h-[50vh] rounded-3xl overflow-hidden mt-10'
									ref={el => addToSlideRefs(3, 'map', el)}
								/>
							)}
						</Text>
					</Block>

					<Block noGrid className='flex flex-col justify-center h-screen'>
						<Text>
							<Heading
								text='Plan of the Day'
								className='text-center'
								ref={el => addToSlideRefs(4, 'heading', el)}
							/>
						</Text>
					</Block>
				</div>
				<div className='inset-0 pointer-events-none absolute z-10'>
					<div className='w-full h-full bg-[length:128px_128px] bg-repeat bg-[url("/img/pattern.png")] opacity-15'></div>
				</div>
			</div>
		</ReactLenis>
	)
}
