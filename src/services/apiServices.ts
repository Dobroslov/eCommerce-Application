import axios from 'axios';
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
		.then((response) => {localStorage.setItem('token', response.data.access_token)
		getCustomerForId(response.data.scope.split(':')[2])
		store.dispatch(showModal({title:"Success",description:"KJKZVNHJL",color:"rgb(60, 179, 113,0.5)"}))
			setTimeout(()=>{store.dispatch(hideModal())},4000)
			
	})
		.catch((error) => {
			store.dispatch(showModal({title:"Fault",description:"khdasvkvhdkalhsdkh",color:"rgb(227, 23, 23,0.5)"}))
			setTimeout(()=>{store.dispatch(hideModal())},4000)
			
		});
}
export async function checkToken(token: string): Promise<void> {
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
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function createCustomer(params: IRegistrationForm, navigate: Function): Promise<void> {
	const token = localStorage.getItem('anonimous')
    const data = JSON.stringify(params);
    const url = `${API_URL}/${PROJECT_KEY}/customers`;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
        await axios.post(url, data, { headers }).then(()=>{
			store.dispatch(showModal({title:"Success",description:"KJKZVNHJL",color:"rgb(60, 179, 113,0.5)"}))
			setTimeout(()=>{store.dispatch(hideModal())},4000)
			navigate('/', { replace: true });
		})
    .catch (() => {
        store.dispatch(showModal({title:"Fault",description:"khdasvkvhdkalhsdkh",color:"rgb(227, 23, 23,0.5)"}))
			setTimeout(()=>{store.dispatch(hideModal())},4000)
    })
}
export async function getCustomerForId(id: string): Promise<void> {
	const token = localStorage.getItem('token')
	const url = `${API_URL}/${PROJECT_KEY}/customers/${id}`;
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};

	await axios
		.get(url, {
			headers,
		})
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.log(error);
		});
}
