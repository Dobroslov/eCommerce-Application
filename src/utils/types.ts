export interface IProductCard {
	id: number;
	title: string;
	image: string;
	altImage: string;
	price: number;
}

export interface IRegistration {
	firstName: string;
	lastName: string;
	email: string;
	dateOfBirth: string;
	addresses: IAddress[];
	password: string;
}
export interface ILogin {
	email: string;
	password: string;
}

export interface IAddress {
	city: string;
	streetName: string;
	streetNumber: string;
	postalCode: string;
	country: string;
}
