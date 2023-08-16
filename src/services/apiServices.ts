import axios from 'axios';

const PROJECT_KEY = 'glitter-magazine';
// const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
// const REGION = 'europe-west1.gcp';

// interface IToken {}

async function getAccessToken() {
	const config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `${AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
		headers: {
			Authorization:
				'Basic UWFSY3F3bWdSVktKM25scVQ5NTV2bEhuOllVWk5NeUtWRzgtNnI5WUlVRi1IVWgxbDBxSmlQUFU5',
		},
		data: '',
	};

	await axios.request(config).then((response) => {
		localStorage.setItem('token', response.data.access_token);
	});
}

export default getAccessToken;
