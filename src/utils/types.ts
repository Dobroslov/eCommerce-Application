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
	password: string;
}

export interface IAddress {
	city: string;
	streetName: string;
	streetNumber: string;
	postalCode: string;
	country: string;
}

// export interface IUserLogin {
// 	email: string;
// 	password: string;
// }

// export interface IRegistrationForm {
// 	login: string;
// 	password: string;
// 	userName: string;
// 	userPhone: string;
// }
