import { ICart, ModalProperties } from '../utils/types';

export enum DataActionTypes {
	AddCartData = 'ADD'
}
export enum ValueActionTypes {
	AddValue = 'ADD_VALUE'
}

export enum CodeActionTypes {
	AddCode = 'ADD_CODE'
}
export enum ModalActionTypes {
	ShowModal,
	HideModal,
}
export enum BurgerActionTypes {
	ShowBurger = 2,
	HideBurger = 3
}

export enum SearchActionTypes {
	ShowSearch = 4,
	HideSearch = 5
}

export interface ModalAction {
	type: ModalActionTypes;
	payload?: ModalProperties;
}
export interface DataAction {
	type: DataActionTypes;
	payload?: ICart;
}

export interface ValueAction {
	type: ValueActionTypes;
	payload?: number|null;
}
export interface CodeAction {
	type: CodeActionTypes;
	payload?: string | null;
}

export interface BurgerAction {
	type: BurgerActionTypes;
	payload?: boolean;
}

export interface SearchAction {
	type: SearchActionTypes;
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

export function addValue(payload: number) {
	return {
		type: ValueActionTypes.AddValue,
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

export function showSearch(): SearchAction {
	return {
		type: SearchActionTypes.ShowSearch,
	};
}
export function hideSearch(): SearchAction {
	return {
		type: SearchActionTypes.HideSearch,
	};
}
