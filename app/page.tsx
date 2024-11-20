'use client'

import { useEffect, useRef, useState } from 'react'
import Block from '@/components/Block'
import Map from '@/components/Map'
import Text from '@/components/Text'
import Heading from '@/components/typo/Heading'
import Paragraph from '@/components/typo/Paragraph'
import Image from 'next/image'
import '../styles/global.scss'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import Loader from '@/components/Loader'
import SlideShow from '@/components/SlideShow'
import useSlideShowStore from '@/store/slideShow.store'
import LetterFx from '@/lib/LetterFX'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
	const [isMapLoaded, setIsMapLoaded] = useState(false)
	const { isSlideShowComplete } = useSlideShowStore()
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
	const containerRef = useRef<HTMLDivElement>(null)
	const letterFxTriggerRef1 = useRef<() => void>()
	const letterFxTriggerRef2 = useRef<() => void>()
	const letterFxTriggerRef3 = useRef<() => void>()
	const letterFxTriggerRef4 = useRef<() => void>()
	const lenis = useLenis()

	// Универсальная функция для добавления рефов
	const addToSlideRefs = (
		index: number,
		type: 'heading' | 'text' | 'image' | 'map',
		el: HTMLElement | null
	): void => {
		if (!el) return
		if (!slideRefs.current[index]) {
			slideRefs.current[index] = {}
		}
		slideRefs.current[index][type] = el
	}

	useEffect(() => {
		setIsMapLoaded(true)

		const textElement = slideRefs.current[2]?.text // Убедитесь, что это правильный элемент

		if (textElement) {
			ScrollTrigger.create({
				trigger: textElement,
				start: 'bottom bottom', // Когда элемент достигает низа области видимости
				onEnter: () => {
					const letters = [
						letterFxTriggerRef1,
						letterFxTriggerRef2,
						letterFxTriggerRef3,
						letterFxTriggerRef4,
					]

					letters.forEach(item => {
						item.current?.() // Вызываем функцию анимации, если она существует
					})
				},
				once: true,
			})
		}

		// Настройка ResizeObserver
		const observer = new ResizeObserver(() => {
			window.dispatchEvent(new Event('resize', { bubbles: true }))
		})

		if (containerRef.current) {
			observer.observe(containerRef.current)
		}

		return () => {
			observer.disconnect()
			ScrollTrigger.killAll() // Удаляем триггер при размонтировании
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
						start: 'top bottom',
						end: 'top +=30%',
						scrub: true,
					},
				}
			)

			const mm = gsap.matchMedia()
			const breakPoint = 1024

			mm.add(
				{
					isDesktop: `(min-width: ${breakPoint}px)`,
					isMobile: `(max-width: ${breakPoint - 1}px)`,
				},
				({ isDesktop }) => {
					gsap.fromTo(
						element,
						{ y: isDesktop ? 100 : '5vh' },
						{
							y: isDesktop ? -100 : '-5vh',
							scrollTrigger: {
								markers: false,
								trigger: element,
								start: 'top bottom',
								scrub: true,
							},
						}
					)
				}
			)
		}

		Object.entries(slideRefs.current).forEach(([, refs]) => {
			if (!refs) return

			animateElement(refs.heading)
			animateElement(refs.text)
			animateElement(refs.image)
			animateElement(refs.map)
		})
	}, [isMapLoaded])

	const getYearPhrase = (targetYear: number = 2025): string => {
		const currentYear = new Date().getFullYear()
		return currentYear === targetYear ? 'этом' : 'следующем'
	}

	useEffect(() => {
		if (!isSlideShowComplete || lenis?.scroll >= 20) return

		lenis?.scrollTo(window.innerHeight / 1.5, {
			duration: 1.5,
			easing: (t: number) => Math.min(1, Math.sqrt(1 - Math.pow(t - 1, 2))),
		})
	}, [lenis, isSlideShowComplete])

	return (
		<ReactLenis
			root
			options={{ syncTouch: true, smoothWheel: true, touchMultiplier: 0 }}
		>
			<Loader />
			<div ref={containerRef} className='relative bg-stone-50 z-10 '>
				<div className='relative z-20'>
					<SlideShow totalImages={6} />
					<Block className='py-10'>
						<Text className='py-10 xl:py-20'>
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
							className='w-full h-[90vh] max-w-md mx-auto lg:max-h-[800px] object-cover object-left rounded-t-full'
							ref={el => addToSlideRefs(1, 'image', el)}
						/>
					</Block>

					<Block noGrid className='flex items-center justify-center'>
						<Text>
							<Heading
								text='When?'
								className='text-center'
								ref={el => addToSlideRefs(2, 'heading', el)}
							/>
							<Paragraph
								customSize
								className='text-center text-4xl md:text-5xl whitespace-nowrap'
								ref={el => addToSlideRefs(2, 'text', el)}
							>
								<span>
									<LetterFx
										speed='slow'
										trigger='custom'
										duration={2500}
										initialText='0'
										finalText='1'
										onTrigger={triggerFn1 => {
											letterFxTriggerRef1.current = triggerFn1
										}}
									/>

									<LetterFx
										speed='slow'
										trigger='custom'
										duration={2000}
										initialText='0'
										finalText='1'
										onTrigger={triggerFn2 => {
											letterFxTriggerRef2.current = triggerFn2
										}}
									/>
								</span>
								<span>
									.
									<LetterFx
										speed='slow'
										trigger='custom'
										duration={1500}
										initialText='0'
										finalText='0'
										onTrigger={triggerFn3 => {
											letterFxTriggerRef3.current = triggerFn3
										}}
									/>
									<LetterFx
										speed='slow'
										trigger='custom'
										duration={1000}
										initialText='0'
										finalText='6'
										onTrigger={triggerFn4 => {
											letterFxTriggerRef4.current = triggerFn4
										}}
									/>
									.2025
								</span>
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
