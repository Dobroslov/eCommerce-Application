import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import {
	IUserLogin,
	IRegistrationForm,
	IProduct,
	IProductbyId,
	IAddress,
	IUpdatePassword,
	IUpdateUserData,
	IUserDataRespons,
} from '../utils/types';

import store from '../store/store';
import { hideModal, showModal } from '../store/actions';

const PROJECT_KEY = 'glitter-magazine';
const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
// const REGION = 'europe-west1.gcp';

// interface IToken {}
export async function getAnonimousToken(): Promise<void> {
	const url = `${AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token?grant_type=client_credentials`;
	const headers = {
		Authorization:
			'Basic UWFSY3F3bWdSVktKM25scVQ5NTV2bEhuOllVWk5NeUtWRzgtNnI5WUlVRi1IVWgxbDBxSmlQUFU5',
	};
	const data = '';

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => localStorage.setItem('anonimous', response.data.access_token))
		.catch((error) => {
			console.log(error);
		});
}

export async function createCustomer(
	params: IRegistrationForm,
	navigate: NavigateFunction,
): Promise<void> {
	// Здесь вы можете указать конкретный тип, который ожидаете получить от сервера
	const token = localStorage.getItem('anonimous');
	const data = JSON.stringify(params);
	const url = `${API_URL}/${PROJECT_KEY}/customers`;
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};

	try {
		const user = await axios
			.post(url, data, {
				headers,
			})
			.then((response) => response.data);

		// Показать модальное окно "Success" с задержкой
		store.dispatch(
			showModal({
				title: 'Success',
				description: `User ${user.customer.firstName} ${user.customer.lastName} successfully registered`,
				color: 'rgb(60, 179, 113,0.5)',
			}),
		);

		setTimeout(() => {
			store.dispatch(hideModal());
			// Перенаправить пользователя после закрытия модального окна
			navigate('/', {
				replace: true,
			});
		}, 5000);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error);
			// Показать модальное окно "Fault" в случае ошибки запроса
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					color: 'rgb(227, 23, 23,0.5)',
				}),
			);

			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);

			console.error('Axios Error:', error);
		}
		console.error('Problems connecting to the network:', error);
	}
}

export async function getCustomerForId(id: string): Promise<IUserDataRespons | undefined> {
	// eslint-disable-line consistent-return
	const token = localStorage.getItem('token');
	const url = `${API_URL}/${PROJECT_KEY}/customers/${id}`;
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};

	try {
		const response = await axios.get(url, {
			headers,
		});

		const responseData: IUserDataRespons = response.data;
		localStorage.setItem('userData', JSON.stringify(responseData));
		return responseData;
	} catch (error) {
		console.error('Error getting customer data:', error);
		return undefined; // Вернуть undefined в случае ошибки
	}
}

export async function getToken(params: IUserLogin): Promise<void> {
	const { email, password } = params;
	const url = `${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}`;
	const headers = {
		Authorization:
			'Basic Y1NuZjhlM3RLSllqMmhmdm1uc0E5UmtMOnJNLXExemFGTDl0dVRvUUdQV3E4ZlVQX2piOEY0aW9O',
	};
	const data = '';

	await axios
		.post(url, data, {
			headers,
		})
		.then(async (response) => {
			localStorage.setItem('token', response.data.access_token);
			const user = await getCustomerForId(response.data.scope.split(':')[2]);
			if (user) {
				// Проверка на undefined
				store.dispatch(
					showModal({
						title: 'Success',
						description: `Welcome ${user.firstName} ${user.lastName} `,
						color: 'rgb(60, 179, 113,0.5)',
					}),
				);
			} else {
				// Обработка случая, когда user === undefined
				console.error('Failed to get user data.');
			}
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					color: 'rgb(227, 23, 23,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}

export async function refreshToken(params: IUserLogin): Promise<void> {
	const { email, password } = params;
	const url = `${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}`;
	const headers = {
		Authorization:
			'Basic Y1NuZjhlM3RLSllqMmhmdm1uc0E5UmtMOnJNLXExemFGTDl0dVRvUUdQV3E4ZlVQX2piOEY0aW9O',
	};
	const data = '';

	await axios
		.post(url, data, {
			headers,
		})
		.then(async (response) => {
			localStorage.setItem('token', response.data.access_token);
			await getCustomerForId(response.data.scope.split(':')[2]);
		})
		.catch((error) => {
			console.log('file: apiServices.ts:170 ~ refreshToken ~ error:', error);
		});
}

export async function checkToken(token: string): Promise<{ email: string; active: string } | void> {
	const url = `${AUTH_URL}/oauth/introspect?token=${token}`;
	const headers = {
		'Content-Type': 'application/json',
		Authorization:
			'Basic Y1NuZjhlM3RLSllqMmhmdm1uc0E5UmtMOnJNLXExemFGTDl0dVRvUUdQV3E4ZlVQX2piOEY0aW9O',
	};
	const data = '';

	await axios
		.post(url, data, {
			headers,
		})
		.then(async (response) => {
			const email = await getCustomerForId(response.data.scope.split(':')[2]);
			const active = JSON.stringify(response.data.active);
			console.log(email);
			return {
				email,
				active,
			};
		})
		.catch((error) => {
			console.log(error);
		});

	// return customer;
}

export function getSortingProducts(
	limit: number | string,
	offset: number | string,
	sort: string,
	order: string,
): Promise<void | IProduct[]> {
	// eslint-disable-line consistent-return
	let token = '';
	// store.dispatch(addSort(sortData));
	if (!localStorage.getItem('token')) {
		token = localStorage.getItem('anonimous') as string;
	} else {
		token = localStorage.getItem('token') as string;
	}
	const productsArr: IProduct[] = [];

	const url = `https://api.europe-west1.gcp.commercetools.com/glitter-magazine/product-projections/search?limit=${limit}&offset=${offset}&sort=${sort} ${order}`;

	const headers: {
		'Content-Type': string;
		Authorization: string;
	} = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const products = axios
		.get(url, {
			headers,
		})
		.then((response) => {
			response.data.results.forEach(
				(product: {
					id: string;
					name: { [x: string]: string };
					description: { [x: string]: string };
					masterVariant: {
						images: { url: string }[];
						prices: {
							value: { centAmount: number; currencyCode: string };
							discounted: { value: { centAmount: number } };
						}[];
					};
				}) => {
					const productValues: IProduct = {
						id: product.id,
						name: product.name['en-US'],
						description: product.description['en-US'],
						image: product.masterVariant.images[0].url,
						currencyCode: product.masterVariant.prices[0].value.currencyCode,
						price: (product.masterVariant.prices[0].value.centAmount / 100).toFixed(2) as string,
						discount: (product.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(
							2,
						) as string,
					};
					productsArr.push(productValues);
				},
			);
			console.log(productsArr);
			return productsArr;
		})
		.catch((error) => {
			console.log(error);
		});
	return products;
}

export function getFilter(limit = 9, offset = 0, filter: string): Promise<void | IProduct[]> {
	// eslint-disable-line consistent-return
	let token = '';
	if (!localStorage.getItem('token')) {
		token = localStorage.getItem('anonimous') as string;
	} else {
		token = localStorage.getItem('token') as string;
	}
	const productsArr: IProduct[] = [];

	const url = `https://api.europe-west1.gcp.commercetools.com/glitter-magazine/product-projections/search?fuzzy=true&limit=${limit}&offset=${offset}${filter}`;
	const headers: {
		'Content-Type': string;
		Authorization: string;
	} = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const products = axios
		.get(url, {
			headers,
		})
		.then((response) => {
			response.data.results.forEach(
				(product: {
					id: string;
					name: { [x: string]: string };
					description: { [x: string]: string };
					masterVariant: {
						images: { url: string }[];
						prices: {
							value: { centAmount: number; currencyCode: string };
							discounted: { value: { centAmount: number } };
						}[];
					};
				}) => {
					const productValues: IProduct = {
						id: product.id,
						name: product.name['en-US'],
						description: product.description['en-US'],
						image: product.masterVariant.images[0].url,
						currencyCode: product.masterVariant.prices[0].value.currencyCode,
						price: (product.masterVariant.prices[0].value.centAmount / 100).toFixed(2) as string,
						discount: (product.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(
							2,
						) as string,
					};
					productsArr.push(productValues);
				},
			);
			return productsArr;
		})
		.catch((error) => {
			console.log(error);
		});
	return products;
}

export function getProductForId(id: string): Promise<void | IProductbyId> {
	let token = '';
	if (!localStorage.getItem('token')) {
		token = localStorage.getItem('anonimous') as string;
	} else {
		token = localStorage.getItem('token') as string;
	}

	const url = `https://api.europe-west1.gcp.commercetools.com/glitter-magazine/product-projections/${id}`;
	const headers: {
		'Content-Type': string;
		Authorization: string;
	} = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const product = axios
		.get(url, {
			headers,
		})
		.then((response) => {
			const imagesArr: string[] = [];
			response.data.masterVariant.images.forEach((image: { url: string }) => {
				imagesArr.push(image.url);
			});
			const productData: IProductbyId = {
				name: response.data.name['en-US'],
				images: imagesArr,
				description: response.data.description['en-US'],
				currencyCode: response.data.masterVariant.prices[0].value.currencyCode,
				price: (response.data.masterVariant.prices[0].value.centAmount / 100).toFixed(2) as string,
				color: response.data.masterVariant.attributes[0].value[0],
				weight: response.data.masterVariant.attributes[1].value,
				stone: response.data.masterVariant.attributes[2].value[0],
				standard: response.data.masterVariant.attributes[3].value,
				metall: response.data.masterVariant.attributes[4].value[0],
				discount: (response.data.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(
					2,
				) as string,
			};
			console.log(productData);

			return productData;
		})
		.catch((error) => {
			console.log(error);
		});
	return product;
}

export function changePassword({ oldPassword, newPassword }: IUpdatePassword): void {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const token = localStorage.getItem('token');
	const data = JSON.stringify({
		id,
		version,
		currentPassword: `${oldPassword}`,
		newPassword: `${newPassword}`,
	});
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const url = 'https://api.europe-west1.gcp.commercetools.com/glitter-magazine/customers/password';
	axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
			const param: IUserLogin = {
				email: response.data.email,
				password: newPassword,
			};
			// смена токена после смены пароля
			getToken(param);
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Password changed successfully',
					color: 'rgb(60, 179, 113,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					color: 'rgb(227, 23, 23,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}

export function changeCustomerValues({ firstName, lastName, email, dateOfBirth }: IUpdateUserData) {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const token = localStorage.getItem('token');
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const url = `https://api.europe-west1.gcp.commercetools.com/glitter-magazine/customers/${id}`;
	const data = {
		version,
		actions: [
			{
				action: 'changeEmail',
				email,
			},
			{
				action: 'setFirstName',
				firstName,
			},
			{
				action: 'setLastName',
				lastName,
			},
			{
				action: 'setDateOfBirth',
				dateOfBirth,
			},
		],
	};
	axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			console.log(response);
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Data changed successfully',
					color: 'rgb(60, 179, 113,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					color: 'rgb(227, 23, 23,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}

// Для установки или удаления используем addressAction:
// 'setDefaultShippingAddress'
// "setDefaultBillingAddress"
//  "addBillingAddressId"
//  "addShippingAddressId"
// "removeBillingAddressId"
// "removeShippingAddressId"
// "removeAddress"

export function addressActions(addressAction: string, addressId: string) {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const token = localStorage.getItem('token');
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const url = `https://api.europe-west1.gcp.commercetools.com/glitter-magazine/customers/${id}`;
	const data = {
		version,
		actions: [
			{
				action: addressAction,
				addressId,
			},
		],
	};
	axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			console.log(response);
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Data changed successfully',
					color: 'rgb(60, 179, 113,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					color: 'rgb(227, 23, 23,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}

export function changeAddress(addressId: string, addressData: IAddress) {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const token = localStorage.getItem('token');
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const url = `https://api.europe-west1.gcp.commercetools.com/glitter-magazine/customers/${id}`;
	const data = {
		version,
		actions: [
			{
				action: 'changeAddress',
				addressId,
				address: addressData,
			},
		],
	};
	axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			console.log(response);
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Address changed successfully',
					color: 'rgb(60, 179, 113,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					color: 'rgb(227, 23, 23,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}

export function addAddress(addressData: IAddress) {
	const user = localStorage.getItem('userData') as string;
	const { id } = JSON.parse(user);
	const token = localStorage.getItem('token');
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const url = `https://api.europe-west1.gcp.commercetools.com/glitter-magazine/customers/${id}`;
	const data = {
		actions: [
			{
				action: 'addAddress',
				address: addressData,
			},
		],
	};
	axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			console.log(response);
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Data changed successfully',
					color: 'rgb(60, 179, 113,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					color: 'rgb(227, 23, 23,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}
