import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { IUserLogin, IRegistrationForm, IProduct } from '../utils/types';
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
		const user = await axios.post(url, data, {
			headers,
		}).then((response) => response.data);

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

export async function getCustomerForId(id: string) { // eslint-disable-line consistent-return
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

		const responseData = response.data;
		localStorage.setItem('userData', JSON.stringify(responseData));
		return responseData;
	} catch (error) {
		console.error('Error getting customer data:', error);
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
			store.dispatch(
				showModal({
					title: 'Success',
					description: `Welcome ${user.firstName} ${user.lastName} `,
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

export function getSortingProducts(limit: number, offset: number, sort: string, order: string): Promise<void | IProduct[]> { // eslint-disable-line consistent-return
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
	const products = axios.get(url, {
		headers,
	}).then((response) => {
		response.data.results.forEach((product:
			{
				id: string;
				name: { [x: string]: string; };
				description: { [x: string]: string; };
				variants: {
					images: { url: string }[];
					prices: { value: { centAmount: number, currencyCode: string }; }[];
				}[];
			}) => {
			const productValues: IProduct = {
				id: product.id,
				name: product.name['en-US'],
				description: product.description['en-US'],
				image: product.variants[0].images[0].url,
				currencyCode: product.variants[0].prices[0].value.currencyCode,
				price: (product.variants[0].prices[0].value.centAmount / 100)
					.toFixed(2) as string,
			};
			productsArr.push(productValues);
		});
		return productsArr;
	})
		.catch((error) => {
			console.log(error);
		});
	return products;
}

export function getFilterByPrice(limit: number, offset: number, from: number, to: number): Promise<void | IProduct[]> { // eslint-disable-line consistent-return
	let token = '';
	if (!localStorage.getItem('token')) {
		token = localStorage.getItem('anonimous') as string;
	} else {
		token = localStorage.getItem('token') as string;
	}
	const productsArr: IProduct[] = [];

	const url = `https://api.europe-west1.gcp.commercetools.com/glitter-magazine/product-projections/search?limit=${limit}&offset=${offset}&filter=variants.price.centAmount:range (${from} to ${to})`;
	const headers: {
		'Content-Type': string;
		Authorization: string;
	} = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const products = axios.get(url, {
		headers,
	}).then((response) => {
		response.data.results.forEach((product:
			{
				id: string;
				name: { [x: string]: string; };
				description: { [x: string]: string; };
				variants: {
					images: { url: string }[];
					prices: { value: { centAmount: number, currencyCode: string }; }[];
				}[];
			}) => {
			const productValues: IProduct = {
				id: product.id,
				name: product.name['en-US'],
				description: product.description['en-US'],
				image: product.variants[0].images[0].url,
				currencyCode: product.variants[0].prices[0].value.currencyCode,
				price: (product.variants[0].prices[0].value.centAmount / 100)
					.toFixed(2) as string,
			};
			productsArr.push(productValues);
		});
		return productsArr;
	})
		.catch((error) => {
			console.log(error);
		});
	return products;
}
export function getProductForId(id: string) {
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
	const product = axios.get(url, {
		headers,
	}).then((response) => {
		const imagesArr: string[] = [];
		response.data.variants[0].images.forEach((image: { url: string; }) => {
			imagesArr.push(image.url);
		});
		const productData = {
			name: response.data.name['en-US'],
			images: imagesArr,
			description: response.data.description['en-US'],
			currencyCode: response.data.variants[0].prices[0].value.currencyCode,
			price: (response.data.variants[0].prices[0].value.centAmount / 100).toFixed(2) as string,
			color: response.data.variants[0].attributes[0].value[0],
			weight: response.data.variants[0].attributes[1].value,
			stone: response.data.variants[0].attributes[2].value[0],
			standard: response.data.variants[0].attributes[3].value,
			metall: response.data.variants[0].attributes[4].value[0],
		};
		return productData;
	})
		.catch((error) => {
			console.log(error);
		});
	return product;
}

export function changePassword(currPass: string, newPass: string) {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const token = localStorage.getItem('token');
	const data = JSON.stringify({
		id,
		version,
		currentPassword: `${currPass}`,
		newPassword: `${newPass}`,
	});
	const headers = {
		'Content-Type': 'application/json', Authorization: `Bearer ${token}`,
	};
	const url = 'https://api.europe-west1.gcp.commercetools.com/glitter-magazine/customers/password';
	axios.post(url, data, {
		headers,
	})
		.then((response) => {
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
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
