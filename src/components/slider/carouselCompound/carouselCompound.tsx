import React, { useState, ReactElement, useEffect, useRef } from 'react';
import CarouselPage from './carouselPage/carouselPage';
import style from './carouselCompound.module.scss';
import CarouselContext from './carouselContext';

interface CarouselProps {
	children: ReactElement[];
}

function CarouselCompound({ children }: CarouselProps) {
	const [offset, setOffset] = useState<number>(0);
	const [width, setwidth] = useState<number>(500);
	const windowElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const resizeHandler = () => {
			if (windowElementRef.current) {
				const WindowWidth = windowElementRef.current?.offsetWidth;
				setwidth(WindowWidth);
				setOffset(0);
			}
		};
		resizeHandler();
		window.addEventListener('resize', resizeHandler);

		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	}, []);

	const handleLeftArrowClick = () => {
		setOffset((current) => {
			const newOffset = current + width;
			return Math.min(newOffset, 0);
		});
	};

	const handleRightArrowClick = () => {
		setOffset((current) => {
			const newOffset = current - width;
			const maxOffset = -(width * (children.length - 1));
			return Math.max(newOffset, maxOffset);
		});
	};

	return (
		<CarouselContext.Provider
			// eslint-disable-next-line react/jsx-no-constructed-context-values
			value={{
				width,
			}}
		>
			<div className={style.container}>
				<button type='button' className={style.arrow_left_button} onClick={handleLeftArrowClick}>
					❮
				</button>
				<div className={style.window} ref={windowElementRef}>
					<div
						className={style.allPagesContainer}
						style={{
							transform: `translateX(${offset}px)`,
						}}
					>
						{children}
					</div>
				</div>
				<button type='button' className={style.arrow_right_button} onClick={handleRightArrowClick}>
					❯
				</button>
			</div>
		</CarouselContext.Provider>
	);
}

CarouselCompound.CarouselPage = CarouselPage;

export default CarouselCompound;
