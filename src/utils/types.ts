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
}
export interface ModalProperties {
	title: string;
	description: string;
	color: string;
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
}
export interface ISorting {
	sortLimit: number | string;
	sortOffset: number | string;
	sorting: string;
	sortOrder: string;
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
}
