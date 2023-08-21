import React from 'react';
import ReactDOM from 'react-dom';
import style from "./modal.module.scss"
import { RootState } from '../../store/reducers';
import { hideModal } from '../../store/actions';
import { ConnectedProps, connect } from 'react-redux';



const mapStateToProps = (state: RootState) => ({
    modal: state.modal.modal,
  });
  
  const mapDispatchToProps = {
    dispatchHideModal: hideModal,
  };
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type ModalProps = {} & ConnectedProps<typeof connector>;

const Modal = (props: ModalProps) =>{
    const { dispatchHideModal, modal } = props;

    if (!modal) {
      return null;
    }
  
    const onCloseButtonClick = () => {
      dispatchHideModal();
    };
return(
    <div className={style.modal} style={{backgroundColor:`${modal.color}`}}>
            <button className={style.button} onClick={onCloseButtonClick}></button>
            <h3 className={style.title}>{modal.title}</h3>
            <p className={style.text}>{modal.description}</p>

        </div>
  
)}

export default connector(Modal);
