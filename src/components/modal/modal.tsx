import React from 'react';
import { useSelector } from 'react-redux';
import style from './modal.module.scss';
import { RootState } from '../../store/reducers';
import { hideModal } from '../../store/actions';

import store from '../../store/store';

function Modal() {
	const modal = useSelector((state:RootState) => state.modal.modal);
	const closeModal = ():void => {
		if (modal) {
			store.dispatch(hideModal());
		}
	};
	if (!modal) {
		return null;
	}
	return (
		<div className={style.modal}>
			<button type='button' aria-label='button' className={style.button} onClick={closeModal} />
			<h3 className={style.title}><span
				className={style.ico}
				style={{
					backgroundImage: `url(${modal.url})`,
				}}
			/>{modal.title}
			</h3>
			<p className={style.text}>{modal.description}</p>

		</div>

	);
}

export default Modal;
