'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Block from '@/components/Block'
import Map from '@/components/Map/Map'
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
import { Finger } from '@/components/icons/IconFinger'
import { Location } from '@/components/icons/IconLocation'
import { Rings } from '@/components/icons/IconRings'
import { Dinner } from '@/components/icons/IconDinner'
import { Cake } from '@/components/icons/IconCake'
import { Clock } from '@/components/icons/IconClock'
import PlanItem from '@/components/PlanItem'
import Color from '@/components/Color'
import Form from '@/components/Form'
import useFormState from '@/store/form.store'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Snippet,
} from '@nextui-org/react'
import { Heart } from '@/components/icons/IconHeart'
import TelegramLink from '@/components/TelegramLink'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
	const [isMapLoaded, setIsMapLoaded] = useState(false)
	const {
		formSended,
		showFormModal,
		setShowFormModal,
		willBeAttended,
		formError,
	} = useFormState()
	const { isSlideShowComplete } = useSlideShowStore()
	const screenRefs = useRef<
		Record<
			number,
			{
				heading?: HTMLElement
				text?: HTMLElement
				image?: HTMLElement
				map?: HTMLElement
				plan?: HTMLElement
				block?: HTMLElement
				form?: HTMLElement
			}
		>
	>({})
	const containerRef = useRef<HTMLDivElement>(null)
	const addressRef = useRef<HTMLAnchorElement>(null)
	const fingerRef = useRef<SVGSVGElement>(null)
	const letterFxTriggerRef1 = useRef<() => void>()
	const letterFxTriggerRef2 = useRef<() => void>()
	const letterFxTriggerRef3 = useRef<() => void>()
	const letterFxTriggerRef4 = useRef<() => void>()
	const lenis = useLenis()

	const refFunctions = useRef<Record<string, (el: HTMLElement | null) => void>>(
		{}
	)

	// Универсальная функция для получения функции рефа
	const getRefFunction = useCallback(
		(
			index: number,
			type: 'heading' | 'text' | 'image' | 'map' | 'plan' | 'block' | 'form'
		) => {
			const key = `${index}-${type}`
			if (!refFunctions.current[key]) {
				refFunctions.current[key] = (el: HTMLElement | null) => {
					if (!el) return
					if (!screenRefs.current[index]) {
						screenRefs.current[index] = {}
					}
					screenRefs.current[index][type] = el
				}
			}
			return refFunctions.current[key]
		},
		[]
	)

	useEffect(() => {
		setIsMapLoaded(true)

		const textElement = screenRefs.current[2]?.text // Убедитесь, что это правильный элемент

		if (textElement) {
			ScrollTrigger.create({
				trigger: textElement,
				start: 'bottom bottom',
				onEnter: () => {
					const letters = [
						letterFxTriggerRef1,
						letterFxTriggerRef2,
						letterFxTriggerRef3,
						letterFxTriggerRef4,
					]

					letters.forEach(item => {
						item.current?.()
					})
				},
				once: true,
			})
		}

		if (addressRef && fingerRef) {
			ScrollTrigger.create({
				trigger: addressRef.current,
				start: 'top 60%',
				markers: false,
				onEnter: () => {
					gsap
						.timeline()
						.to(
							addressRef.current,
							{
								borderColor: 'rgb(2 6 23 / 1)',
								duration: 1,
								ease: 'power1.inOut',
							},
							'>'
						)
						.to(
							fingerRef.current,
							{
								opacity: 1,
								delay: 0.5,
								y: '-50%',
								duration: 0.5,
								ease: 'power1.inOut',
							},
							'>'
						)
						.to(
							[addressRef.current, fingerRef.current],
							{
								scale: 0.98,
								duration: 0.2,
							},
							'>'
						)
						.to(
							[addressRef.current, fingerRef.current],
							{
								scale: 1,
								duration: 0.2,
							},
							'>'
						)
						.to(fingerRef.current, {
							duration: 1,
							y: '-4px',
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
						end: 'top +=50%',
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

		Object.entries(screenRefs.current).forEach(([, refs]) => {
			if (!refs) return

			animateElement(refs.heading)
			animateElement(refs.text)
			animateElement(refs.image)
			animateElement(refs.map)
			animateElement(refs.plan)
			animateElement(refs.block)
			animateElement(refs.form)
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

			<Modal
				isOpen={showFormModal}
				onOpenChange={isOpen => setShowFormModal(isOpen)}
				backdrop='blur'
				placement='center'
				size='2xl'
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1 font-kudry text-3xl'>
								{formSended
									? 'Ответы отправлены!'
									: 'Ошибка при отправке формы'}
							</ModalHeader>
							<ModalBody className='font-gyre-mono text-xl'>
								{formSended ? (
									willBeAttended ? (
										<div className='flex flex-col gap-y-4'>
											<p>Спасибо! С нетерпением ждем Вас на свадьбе!</p>
											<p>
												Если есть вопросы насчет свадьбы или хотите что-то
												поменять в ответах, то пишите нам{' '}
												<TelegramLink person='k' /> <TelegramLink person='v' />
											</p>
											<p>
												Если есть что-то, о чем нам знать не надо, то можете
												пошушукаться с нашим организатором{' '}
												<TelegramLink person='a' />
											</p>
										</div>
									) : (
										<p>
											Очень жаль 😢 Если передумаете, напишите мне{' '}
											<TelegramLink person='k' />
										</p>
									)
								) : (
									<>
										<p>
											Ошибка при отправке формы. Пожалуйста, скопируйте это
											сообщение нажав на значок{' '}
											<Snippet
												symbol=''
												variant='bordered'
												size='sm'
												disableCopy
												classNames={{
													base: 'gap-0',
													copyButton: 'opacity-100',
												}}
											/>{' '}
											(или сделайте скриншот) и отправьте мне в Telegram{' '}
											<a
												className='text-sky-600 underline underline-offset-4'
												href='https://t.me/mercyyy813'
												target='_blank'
											>
												@mercyyy813
											</a>
										</p>
										<Snippet
											symbol=''
											variant='bordered'
											size='lg'
											classNames={{ pre: 'whitespace-pre-line' }}
										>
											{formError}
										</Snippet>
									</>
								)}
							</ModalBody>
							<ModalFooter className='flex items-center justify-between'>
								<p className='text-lg font-kudry'>K&V</p>

								<Button
									color='primary'
									className='bg-slate-950'
									onPress={onClose}
								>
									<Heart className='size-4' />
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>

			<div ref={containerRef} className='relative bg-stone-50 z-10 '>
				<div className='relative z-20'>
					<SlideShow totalImages={6} />
					{/* Dear Guests! */}
					<Block grid className='py-10'>
						<Text className='py-10 xl:py-20'>
							<Heading text='Dear Guests!' ref={getRefFunction(1, 'heading')} />
							<Paragraph ref={getRefFunction(1, 'text')}>
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
							ref={getRefFunction(1, 'image')}
						/>
					</Block>
					{/* When? */}
					<Block className='flex items-center justify-center'>
						<Text>
							<Heading
								text='When?'
								ref={getRefFunction(2, 'heading')}
								className='text-center'
							/>
							<Paragraph
								customSize
								className='text-center text-4xl md:text-5xl whitespace-nowrap'
								ref={getRefFunction(2, 'text')}
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
					{/* Where? */}
					<Block className='flex flex-col justify-center h-screen'>
						<Text>
							<Heading text='Where?' ref={getRefFunction(3, 'heading')} />
							<Paragraph ref={getRefFunction(3, 'text')} className='opacity-0'>
								Наш праздник пройдет в&nbsp;ресторане &quot;Русская
								рыбалка&quot;
								<br />
								<span className='font-semibold'>
									По адресу:
									<a
										href='https://yandex.ru/maps/2/saint-petersburg/?ll=29.818303%2C60.170111&mode=routes&rtext=~60.170556%2C29.813107&rtt=taxi&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D1059804378&z=17'
										target='_blank'
										ref={addressRef}
										className=' border px-1 pb-1 border-slate-950/0 rounded-md relative inline-block translate-y-0.5  will-change-transform'
									>
										Пос. Комарово, Приморское шоссе, 452 А
										<Finger
											ref={fingerRef}
											className='absolute w-8 h-8 end-4 top-full translate-y-1/2 opacity-0 will-change-transform'
										/>
									</a>
									<br />
									банкетный зал &quot;Летний&quot;
								</span>
							</Paragraph>
							<Map
								className='opacity-0 w-full portrait:h-[60vh] h-[50vh] rounded-3xl overflow-hidden mt-10 will-change-transform'
								ref={getRefFunction(3, 'map')}
							/>
						</Text>
					</Block>

					{/* Dress-code */}
					<Block className='flex flex-col items-center justify-center gap-y-10'>
						<Heading
							text='Dress-code'
							ref={getRefFunction(9, 'heading')}
							className='text-center'
						/>
						<Paragraph className='text-center' ref={getRefFunction(9, 'text')}>
							Мы&nbsp;будем признательны, если вы&nbsp;поддержите цветовую гамму
							нашей свадьбы в&nbsp;своих нарядах.
						</Paragraph>
						<div
							className='grid grid-cols-2 md:grid-cols-4 items-center justify-center flex-wrap gap-4'
							ref={getRefFunction(9, 'block')}
						>
							<Color color='#677965' />
							<Color color='#DBDBDB' />
							<Color color='#F2E3D1' />
							<Color color='#000000' />
						</div>
					</Block>

					{/* Plan of the Day */}
					<Block className='flex flex-col justify-center py-40'>
						<Text>
							<Heading
								text='Plan of the Day'
								ref={getRefFunction(4, 'heading')}
							/>
						</Text>
						<div>
							<div className='mt-10 lg:mt-16 flex flex-col gap-y-3'>
								<PlanItem
									time='15:30'
									text='Сбор гостей'
									ref={getRefFunction(4, 'plan')}
								>
									<Location className='size-full' />
								</PlanItem>
								<PlanItem
									time='16:00'
									text='Свадебная церемония'
									ref={getRefFunction(5, 'plan')}
								>
									<Rings className='size-full' />
								</PlanItem>
								<PlanItem
									time='17:00'
									text='Банкет'
									ref={getRefFunction(6, 'plan')}
								>
									<Dinner className='size-full' />
								</PlanItem>
								<PlanItem
									time='20:30'
									text='Торт'
									ref={getRefFunction(7, 'plan')}
								>
									<Cake className='size-full' />
								</PlanItem>
								<PlanItem
									time='22:00'
									text='Завершение вечера'
									ref={getRefFunction(8, 'plan')}
								>
									<Clock className='size-full' />
								</PlanItem>
							</div>
						</div>
					</Block>

					{/* A few questions */}
					<Block className='flex flex-col justify-center'>
						<Heading
							text='A few questions'
							ref={getRefFunction(10, 'heading')}
						/>
						<Paragraph className='mt-4' ref={getRefFunction(10, 'text')}>
							Пожалуйста, заполните данную анкету до{' '}
							<span className='underline underline-offset-4'>01.01.2025</span>
						</Paragraph>

						<Form ref={getRefFunction(10, 'form')} className='mt-4 lg:mt-20' />
					</Block>
				</div>
				<div className='inset-0 pointer-events-none absolute z-10'>
					<div className='w-full h-full bg-[length:128px_128px] bg-repeat bg-[url("/img/pattern.png")] opacity-15'></div>
				</div>
			</div>
		</ReactLenis>
	)
}
