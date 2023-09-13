import { ICart, ModalProperties } from '../utils/types';

export enum DataActionTypes {
	AddCartData = 'ADD'
}
export enum CodeActionTypes {
	AddCode = 'ADD_CODE'
}
export enum ModalActionTypes {
	ShowModal,
	HideModal,
}
export enum BurgerActionTypes {
	ShowBurger,
	HideBurger
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
	payload?: string | null;
}

export interface BurgerAction {
	type: BurgerActionTypes;
	payload?: boolean;
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
export function addCartData(payload: ICart) {
	return {
		type: DataActionTypes.AddCartData,
		payload,
	};
}
export function addCode(payload: string | null) {
	return {
		type: CodeActionTypes.AddCode,
		payload,
	};
}

export function showBurger(): BurgerAction {
	return {
		type: BurgerActionTypes.ShowBurger,
	};
}
export function hideBurger(): BurgerAction {
	return {
		type: BurgerActionTypes.HideBurger,
	};
}
