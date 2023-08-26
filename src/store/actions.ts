import { IProduct, ModalProperties } from '../utils/types';

export enum DataActionTypes{
AddProducts = 'ADD'
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
    payload?: IProduct[];
  }

export function hideModal(): ModalAction {
	return {
		type: ModalActionTypes.HideModal,
	};
}

export function showModal(payload: ModalProperties): ModalAction {
	return {
		type: ModalActionTypes.ShowModal,
		payload,
	};
}
export function addProducts(payload:IProduct[]) {
	return {
		type: DataActionTypes.AddProducts,
		payload,
	};
}
