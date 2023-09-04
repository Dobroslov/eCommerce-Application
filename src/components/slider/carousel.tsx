import React, { useEffect, useState, Children, cloneElement, ReactElement } from 'react';
import style from './carousel.module.scss';

interface CarouselProps {
	children: ReactElement[];
}

function Carousel({ children }: CarouselProps) {
	const [pages, setPages] = useState<JSX.Element[]>([]);
	const [offset, setOffset] = useState<number>(0);
	const PAGE_WIDTH = 450;

	const handleLeftArrowClick = () => {
		setOffset((current) => {
			const newOffset = current + PAGE_WIDTH;
			return Math.min(newOffset, 0);
		});
	};

	const handleRightArrowClick = () => {
		setOffset((current) => {
			const newOffset = current - PAGE_WIDTH;
			const maxOffset = -(PAGE_WIDTH * (pages.length - 1));
			return Math.max(newOffset, maxOffset);
		});
	};

	useEffect(() => {
		setPages(
			Children.map(children, (child) =>
				cloneElement(child, {
					style: {
						height: '100%',
						minWidth: `${PAGE_WIDTH}px`,
						maxWidth: `${PAGE_WIDTH}px`,
					},
				}),
			),
		);
	}, []);

	return (
		<div className={style.container}>
			<button type='button' className={style.arrow_left_button} onClick={handleLeftArrowClick} />
			<div className={style.window}>
				<div
					className={style.allPagesContainer}
					style={{
						transform: `translateX(${offset}px)`,
					}}
				>
					{pages}
				</div>
			</div>
			<button type='button' className={style.arrow_right_button} onClick={handleRightArrowClick} />
		</div>
	);
}

export default Carousel;
