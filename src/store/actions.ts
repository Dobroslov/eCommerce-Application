import { ISorting, ModalProperties } from '../utils/types';

export enum DataActionTypes{
AddSort = 'ADD'
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
    payload?: ISorting;
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
export function addSort(payload:ISorting) {
	return {
		type: DataActionTypes.AddSort,
		payload,
	};
}
