export interface IProductCard {
	id: number;
	title: string;
	image: string;
	altImage: string;
	price: number;
}

export interface IRegistrationForm {
	firstName: string;
	lastName: string;
	email: string;
	dateOfBirth: string;
	addresses: IAddress[];
	password: string;
}
export interface IUserLogin {
	email: string;
	password?: string;
}

export interface IAddress {
	city: string;
	streetName: string;
	streetNumber: string;
	postalCode: string;
	country: string;
}

export interface ISubmitButton {
	value: string;
	onclick?(): void;
}
export interface ModalProperties {
	title: string;
	description: string;
	url: string;
}
export interface ICart {
	id:string,
	version:string,
	quantity:number
}
export interface ICartData{
		productArr: IProductCart[];
		totalPrice: string;
		currencyCode: string;
		totalQuantity: string;
}
export interface IUserDataRespons {
	id: string;
	version: number;
	versionModifiedAt: string;
	lastMessageSequenceNumber: number;
	createdAt: string;
	lastModifiedAt: string;
	lastModifiedBy: {
		isPlatformClient: boolean;
		user: {
			typeId: string;
			id: string;
		};
	};
	createdBy: {
		isPlatformClient: boolean;
		user: {
			typeId: string;
			id: string;
		};
	};
	email: string;
	firstName: string;
	lastName: string;
	middleName: string;
	title: string;
	salutation: string;
	dateOfBirth: string;
	password: string;
	addresses: string[];
	shippingAddressIds: string[];
	billingAddressIds: string[];
	isEmailVerified: boolean;
	stores: string[];
	authenticationMode: string;
}
export interface IProduct {
	id: string;
	name: string;
	description: string;
	image: string;
	currencyCode: string;
	price: string;
	discount: string;
}
export interface IProductCatalog{
	totalQuantity:string,
	productsArr:IProduct[]
}

export interface IProductCart {
	id: string,
	productId:string,
	name: string,
	weight: string,
	metall:string,
	image: string,
	currencyCode: string,
	price: string,
	quantity: number
}
export interface IProductbyId {
	name: string;
	images: string[];
	description: string;
	currencyCode: string;
	price: string;
	color: string;
	weight: number;
	stone: boolean;
	standard: number;
	metall: string;
	discount?:string;
	sku:string
}
export interface ISorting {
	sortLimit: number | string;
	sortOffset: number | string;
	sorting: string;
	sortOrder: string;
}

export interface Ifilter {
	resultArray: string[];
	metallProperty: string[];
	metallValue: string[];
	stoneProperty: string[];
	stoneValue: string[];
	addMetallProperty(property: string): void;
	removeMetallProperty(property: string): void;
	addMetallValue(property: string): void;
	removeMetallValue(property: string): void;
	addStoneProperty(property: string): void;
	removeStoneProperty(property: string): void;
	addStoneValue(property: string): void;
	removeStoneValue(property: string): void;
}

export interface IUpdatePassword {
	oldPassword: string;
	newPassword: string;
}

export interface IUpdateUserData {
	firstName: string;
	lastName: string;
	email: string;
	dateOfBirth: string;
	id: string;
}
