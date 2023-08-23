import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { IUserLogin, IRegistrationForm } from '../utils/types';
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
		await axios.post(url, data, {
			headers,
		});
		// Показать модальное окно "Success" с задержкой
		store.dispatch(
			showModal({
				title: 'Success',
				description: 'User successfully registered',
				color: 'rgb(60, 179, 113,0.5)',
			}),
		);

		setTimeout(() => {
			store.dispatch(hideModal());
			// Перенаправить пользователя после закрытия модального окна
			navigate('/', {
				replace: true,
			});
		}, 4000);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Показать модальное окно "Fault" в случае ошибки запроса
			store.dispatch(
				showModal({
					title: 'Fault',
					description: 'Error while registering user. Please try again later.',
					color: 'rgb(227, 23, 23,0.5)',
				}),
			);

			setTimeout(() => {
				store.dispatch(hideModal());
			}, 4000);

			console.error('Axios Error:', error);
		}
		console.error('Problems connecting to the network:', error);
	}
}

export async function getCustomerForId(id: string): Promise<void> {
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
		.then((response) => {
			localStorage.setItem('token', response.data.access_token);
			getCustomerForId(response.data.scope.split(':')[2]);
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'You have successfully logged in',
					color: 'rgb(60, 179, 113,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 4000);
		})
		.catch(() => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: 'Incorrect login or password',
					color: 'rgb(227, 23, 23,0.5)',
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 4000);
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
