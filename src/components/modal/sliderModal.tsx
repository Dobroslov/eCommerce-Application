/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { ReactElement } from 'react';
import style from './sliderModal.module.scss';

interface IModal {
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactElement[];
}

function SliderModal({ active, setActive, children }: IModal) {
	return (
		<div className={active ? style.modalActive : style.modal} onClick={() => setActive(false)}>
			<div
				className={active ? style.contentActive : style.content}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}

export default SliderModal;
