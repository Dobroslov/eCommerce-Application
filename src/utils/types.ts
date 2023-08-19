export interface IProductCard {
	id: number;
	title: string;
	image: string;
	altImage: string;
	price: number;
}

export interface IUserLogin {
	email: string;
	password: string;
}

export interface INewUser {
	email: string;
	password?: string;
	username: string;
}

export interface IRegistrationForm {
	login: string;
	password: string;
	userName: string;
	userPhone: string;
}
