import React, { forwardRef, useRef } from 'react'
import {
	YMap,
	YMapComponentsProvider,
	YMapDefaultSchemeLayer,
	YMapDefaultFeaturesLayer,
	YMapDefaultMarker,
} from 'ymap3-components'

type TMap = {
	className?: string
}

const Map = forwardRef<HTMLDivElement, TMap>(({ className }, ref) => {
	const ymap3Ref = useRef(null)
	const api = process.env.NEXT_PUBLIC_YMAPS_API

	const location = {
		center: [29.813082, 60.170556],
		zoom: 9.5,
	}

	if (!api) return null

	return (
		<div className={`opacity-0 ${className}`} ref={ref}>
			<YMapComponentsProvider apiKey={api} lang='ru_RU'>
				<YMap
					key='map'
					ref={ymap3Ref}
					location={location}
					mode='vector'
					theme='dark'
				>
					<YMapDefaultSchemeLayer />
					<YMapDefaultFeaturesLayer />
					<YMapDefaultMarker coordinates={location.center} />
				</YMap>
			</YMapComponentsProvider>
		</div>
	)
})

// Устанавливаем имя компонента для отладки
Map.displayName = 'Map'

export default Map
