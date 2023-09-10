import { ICart, ModalProperties } from '../utils/types';

export enum DataActionTypes{
AddCartData = 'ADD'
}

export enum ModalActionTypes {
    ShowModal,
    HideModal,
  }
export interface ModalAction {
    type: ModalActionTypes;
    payload?: ModalProperties;
  }
export interface DataAction {
    type: DataActionTypes;
    payload?: ICart;
  }

export function hideModal(): ModalAction {
	return {
		type: ModalActionTypes.ShowModal,
	};
}

export function showModal(payload: ModalProperties): ModalAction {
	return {
		type: ModalActionTypes.ShowModal,
		payload,
	};
}
export function addCartData(payload:ICart) {
	return {
		type: DataActionTypes.AddCartData,
		payload,
	};
}
