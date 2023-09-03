import React, { ReactElement, useContext } from 'react';
import style from './carouselPage.module.scss';
import CarouselContext from '../carouselContext';

interface ICarouselProps {
	children: ReactElement;
}

function CarouselPage({ children }: ICarouselProps) {
	const { width } = useContext(CarouselContext);
	return (
		<div className={style.container} style={{ minWidth: `${width}px`, maxWidth: `${width}px` }}>
			{children}
		</div>
	);
}

export default CarouselPage;
