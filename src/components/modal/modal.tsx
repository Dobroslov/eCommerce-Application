import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import style from './modal.module.scss';
import { RootState } from '../../store/reducers';
import { hideModal } from '../../store/actions';

const mapStateToProps = (state: RootState) => ({
	modal: state.modal.modal,
});

const mapDispatchToProps = {
	dispatchHideModal: hideModal,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

  type ModalProps = object & ConnectedProps<typeof connector>;

function Modal(props: ModalProps) {
	const { dispatchHideModal, modal } = props;

	if (!modal) {
		return null;
	}

	const onCloseButtonClick = () => {
		dispatchHideModal();
	};
	return (
		<div className={style.modal}>
			<button type='button' aria-label='button' className={style.button} onClick={onCloseButtonClick} />
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

export default connector(Modal);
