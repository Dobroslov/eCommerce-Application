# Документация для работы с CommerceTools

### Переменные для работы с API

```js
// Общие переменные
const PROJECT_KEY = 'glitter-magazine';
const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const REGION = 'europe-west1.gcp';
```

```js
// Переменные Admin клиента
const ADMIN_CLIENT_ID = 'QaRcqwmgRVKJ3nlqT955vlHn';
const ADMIN_SECRET = 'YUZNMyKVG8-6r9YIUF-HUh1l0qJiPPU9';
const ADMIN_SCOPE = 'manage_project:glitter-magazine';
```

```js
// Переменные Customer клиента
const CUSTOMER_CLIENT_ID = '9qFofEP0wU31hPh2i5FPI7vI';
const CUSTOMER_SECRET = 'b2o6txgkVNMEkqUrnQXW9-hwZynQFxrj';
const CUSTOMER_SCOPE =
	'manage_my_quotes:glitter-magazine manage_my_orders:glitter-magazine manage_my_payments:glitter-magazine view_categories:glitter-magazine manage_my_shopping_lists:glitter-magazine manage_my_quote_requests:glitter-magazine manage_my_business_units:glitter-magazine create_anonymous_token:glitter-magazine view_published_products:glitter-magazine manage_my_profile:glitter-magazine';
```

## Получение `access_token`

```js
// Пример функции (ненужные console.log и комментарии можно удалить)
async function getAccessToken() {
	//Делаем POST запрос
	const requestOptions = {
		method: 'POST',
		headers: {
			Authorization:
				'Basic UWFSY3F3bWdSVktKM25scVQ5NTV2bEhuOllVWk5NeUtWRzgtNnI5WUlVRi1IVWgxbDBxSmlQUFU5',
		},
		body: '',
		redirect: 'follow',
	};
	//Делаем fetch запроса
	await fetch(
		`${AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
		requestOptions
	)
		.then(response => response.text())
		.then(result => {
			console.log(JSON.parse(result)); // Пример возвращаемого result смотри ниже
			localStorage.setItem('token', `${JSON.parse(result).access_token}`); //Закидываем token в localStorage
		})
		.catch(error => console.log('error', error));
}
```

```js
// Пример возвращаемого result
{
    "access_token": "IJHnxvORg64RBUJsCAxitenwR8gP0JiQ",
    "expires_in": 10800,
    "token_type": "Bearer",
    "scope": "manage_project:glitter-magazine anonymous_id:7978703b-934a-4e7b-8cfb-3680b86d6c97",
    "refresh_token": "glitter-magazine:rXMXMpQzrAWcOTV_6bnncKNoqkpXz4w0UCXwiYNdy5U"
}
```

## Получение всех пользователей

```js
// Пример функции получения всех пользователей (ненужные console.log и комментарии можно удалить)
async function getCustomers() {
	if (!localStorage.getItem('token')) {
		getAccessToken(); // Результат функции смотри в блоке Получение `access_token`
	}
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		redirect: 'follow',
	};

	await fetch(`${API_URL}/${PROJECT_KEY}/customers`, requestOptions)
		.then(response => response.text())
		.then(result => {
			const JSONResult = JSON.parse(result);
			console.log(JSONResult.count); // общее число всех пользователей
			console.log(JSONResult.results); // Получение всех данных кажого пользователя
			// JSONResult.results это массив с объектами
			// каждый объект содержит полную информацию о пользователе
			// Пример объекта смотри в блоке 'Добавление нового пользователя'
			JSONResult.results.forEach(customer => {
				console.log(customer.id); // Получение id каждого пользователя
				console.log(customer.version); // Получение version каждого пользователя
			});
		})
		.catch(error => console.log('error', error));
}
```

## Получение пользователя по id

```js
// Пример функции получения пользователя по id (ненужные console.log и комментарии можно удалить)
async function getCustomerById(id) {
	if (!localStorage.getItem('token')) {
		getAccessToken(); // Результат функции смотри в блоке Получение `access_token`
	}
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		redirect: 'follow',
	};
	await fetch(`${API_URL}/${PROJECT_KEY}/${id}`, requestOptions)
		.then(response => response.text())
		.then(result => {
			console.log(JSON.parse(result));
		})
		.catch(error => console.log('error', error));
}
```

## Удаление пользователя по id

```js
// Пример функции получения пользователя по id (ненужные console.log и комментарии можно удалить)
async function DeleteCustomerById(id, version) {
	if (!localStorage.getItem('token')) {
		getAccessToken(); // Результат функции смотри в блоке Получение `access_token`
	}
	const requestOptions = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		redirect: 'follow',
	};
	await fetch(
		`${API_URL}/${PROJECT_KEY}/${id}?version=${version}`,
		requestOptions
	)
		.then(response => response.text())
		.then(result => {
			console.log(JSON.parse(result));
		})
		.catch(error => console.log('error', error));
}
```

## Добавление нового пользователя

```js
// Пример функции (ненужные console.log и комментарии можно удалить)
async function createCustomer(email, password, firstName, lastName) {
	if (!localStorage.getItem('token')) {
		getAccessToken(); // Результат функции смотри в блоке Получение `access_token`
	}
	const newCustomer = JSON.stringify({
		email: 'test.test@mail.ru', // Поля newCustomer заменить
		password: 'User1234', // аргументами функции
		firstName: 'Vitaly', // в которых нужно передать
		lastName: 'Gromyako', // значения нового пользователя
	});

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: newCustomer,
		redirect: 'follow',
	};

	await fetch(`${API_URL}/${PROJECT_KEY}/customers`, requestOptions)
		.then(response => response.text())
		.then(result => console.log(JSON.parse(result))) // Пример возвращаемого result смотри ниже
		.catch(error => console.log('error', error));
}
```

```js
// Пример возвращаемого result
    "customer": {
        "id": "509a2f9a-2f3d-4a2d-89ce-59361aea4fff",
        "version": 1,
        "versionModifiedAt": "2023-08-11T15:26:15.146Z",
        "lastMessageSequenceNumber": 1,
        "createdAt": "2023-08-11T15:26:15.146Z",
        "lastModifiedAt": "2023-08-11T15:26:15.146Z",
        "lastModifiedBy": {
            "clientId": "QaRcqwmgRVKJ3nlqT955vlHn",
            "isPlatformClient": false,
            "anonymousId": "7978703b-934a-4e7b-8cfb-3680b86d6c97"
        },
        "createdBy": {
            "clientId": "QaRcqwmgRVKJ3nlqT955vlHn",
            "isPlatformClient": false,
            "anonymousId": "7978703b-934a-4e7b-8cfb-3680b86d6c97"
        },
        "email": "barisova.96@mail.ru",
        "firstName": "Elena",
        "lastName": "Golovach",
        "password": "****m4k=",
        "addresses": [],
        "shippingAddressIds": [],
        "billingAddressIds": [],
        "isEmailVerified": false,
        "stores": [],
        "authenticationMode": "Password"
    }
```
