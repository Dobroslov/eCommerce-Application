import { ICart, ModalProperties } from '../utils/types';

export enum DataActionTypes{
AddCartData = 'ADD'
}
export enum CodeActionTypes{
	AddCode = 'ADD_CODE'
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
export interface CodeAction {
    type: CodeActionTypes;
    payload?: string|null;
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
export function addCode(payload:string|null) {
	return {
		type: CodeActionTypes.AddCode,
		payload,
	};
}
