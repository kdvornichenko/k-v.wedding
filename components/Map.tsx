import React, { FC, useRef } from 'react'
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

const Map: FC<TMap> = ({ className }) => {
	const ymap3Ref = useRef(null)
	const api = process.env.NEXT_PUBLIC_YMAPS_API

	const location = {
		center: [29.813082, 60.170556],
		zoom: 9.5,
	}

	if (!api) return

	return (
		<div className={className}>
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
}

export default Map
