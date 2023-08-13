# Документация для работы с CommerceTools

**Навигация по документации**

1. Общий раздел  
   [1.1 Переменные для работы с API](#api-variables)  
   [1.2 Получение access_token](#get-access_token)
2. Работа с пользователем  
   [2.1 Получение всех пользователей](#get-customers)  
   [2.2 Получение пользователя по id](#get-customer-by-id)  
   [2.3 Удаление пользователя по id](#delete-customer-by-id)  
   [2.4 Добавление нового пользователя](#create-new-customer)
3. Работа с товарами  
   [3.1 Получение всех товаров](#get-products)  
   [3.2 Получение товара по ключу](#get-product-by-key)
4. Ответы сервера  
   [4.1 Объект access_token](#access_token-response)  
   [4.2 Объект customer](#get-customers-response)  
   [4.3 Объект product](#get-products-response)
## Общий раздел

### Api variables

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
const CUSTOMER_SCOPE = 'manage_my_quotes:glitter-magazine manage_my_orders:glitter-magazine manage_my_payments:glitter-magazine view_categories:glitter-magazine manage_my_shopping_lists:glitter-magazine manage_my_quote_requests:glitter-magazine manage_my_business_units:glitter-magazine create_anonymous_token:glitter-magazine view_published_products:glitter-magazine manage_my_profile:glitter-magazine';
```

### Get access_token

```js
// Пример функции (ненужные console.log и комментарии можно удалить)
async function getAccessToken() {
	//Делаем POST запрос
	const requestOptions = {
		method: 'POST',
		headers: {
			Authorization: 'Basic UWFSY3F3bWdSVktKM25scVQ5NTV2bEhuOllVWk5NeUtWRzgtNnI5WUlVRi1IVWgxbDBxSmlQUFU5',
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
[Пример объекта access_token](#access_token-response) 

---

## Работа с пользователем

### Get customers

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
[Пример объекта пользователя](#get-customers-response)  

### Get customer by id

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
[Пример объекта пользователя](#get-customers-response)  
### Delete customer by id

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
[Пример объекта пользователя](#get-customers-response)  
### Create new customer

```js
// Пример функции создания нового пользователя (ненужные console.log и комментарии можно удалить)
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
[Пример объекта пользователя](#get-customers-response)  

---

## Работа с товарами

### Get products

```js
// Пример функции получение всех товаров (ненужные console.log и комментарии можно удалить)
async function getProducts() {
  if (!localStorage.getItem('token')) {
		getAccessToken(); // Результат функции смотри в блоке Получение `access_token`
	}
  const requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    redirect: 'follow'
  };
  
  await fetch("https://api.europe-west1.gcp.commercetools.com/glitter-magazine/products", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(JSON.parse(result).total)     // Общее число всех продуктов
      console.log(JSON.parse(result).count)     // Число продуктов на странице
      console.log(JSON.parse(result).results)   // Массив с объектов, каждый объект содержит полную информацию о продукте
      JSON.parse(result).results.forEach(product => {
        console.log(product.key)         // Ключ продукта
        console.log(product.id)          // Id продукта
        console.log(product.masterData.current.description['en-US']) // Описание продукта
        console.log(product.masterData.current.name['en-US']) // Название продукта
        product.masterData.current.variants.forEach(variant => {
          console.log(variant.images) // Массив изображений продукта
          console.log(variant.prices[0].value.currencyCode) // Валюта (EUR)  
          console.log(variant.prices[0].value.centAmount) // Цена товара (БЕЗ ЗНАКОВ ПОСЛЕ ЗАПЯТОЙ)
                                                          // при цене продукта в 30,00EUR, цена будет 3000 
          console.log(variant.prices[0].value.fractionDigits) // Количество знаков перед запятой у цены товара
        });



        product.masterData.current.masterVariant.attributes.forEach(attribute => { // Массив атрибутов ГЛАВНОГО продукта (с id: 1)
          console.log(Object.values(attribute).flat(Infinity));      // примеры: ['color', 'yellow-metall'], ['weight', 1.7]
        });                                                          // сколько у продукта атрибутов, столько и массивов

        console.log(product.masterData.current.masterVariant.images); // Массив изображенией ГЛАВНОГО продукта                                
        console.log(product.masterData.current.masterVariant.prices[0].value.currencyCode); // Валюта (EUR)                             
        console.log(product.masterData.current.masterVariant.prices[0].value.centAmount); // Цена ГЛАВНОГО товара (БЕЗ ЗНАКОВ ПОСЛЕ ЗАПЯТОЙ),  
                                                                                          // при цене продукта в 30,00EUR, цена будет 3000   
        console.log(product.masterData.current.masterVariant.prices[0].value.fractionDigits); // Количество знаков перед запятой у цены ГЛАВНОГО товара
      });                                                                                 
    })
    .catch(error => console.log('error', error));
}
```
[Пример объекта товара](#get-products-response)

### Get product by key

```js
// Пример функции получение всех товаров (ненужные console.log и комментарии можно удалить)
async function getProductByKey(key) {
  if (!localStorage.getItem('token')) {
		getAccessToken(); // Результат функции смотри в блоке Получение `access_token`
	}
  const requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    redirect: 'follow'
  };

  await fetch(`https://api.europe-west1.gcp.commercetools.com/glitter-magazine/products/key=${key}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result)))
    .catch(error => console.log('error', error));
}
```
[Пример объекта товара](#get-products-response)

---
## Ответы сервера

### Access_token response
```js
// Пример возвращаемого объекта
{
    "access_token": "IJHnxvORg64RBUJsCAxitenwR8gP0JiQ",
    "expires_in": 10800,
    "token_type": "Bearer",
    "scope": "manage_project:glitter-magazine anonymous_id:7978703b-934a-4e7b-8cfb-3680b86d6c97",
    "refresh_token": "glitter-magazine:rXMXMpQzrAWcOTV_6bnncKNoqkpXz4w0UCXwiYNdy5U"
}
```

### Get customers response
```js
// Пример возвращаемого объекта
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

### Get products response
```js
// Пример возвращаемого объекта
{
  "id": "e7ba4c75-b1bb-483d-94d8-2c4a10f78472",
  "version": 2,
  "masterData": {
    "current": {
      "categories": [
        {
          "id": "cf6d790a-f027-4f46-9a2b-4bc9a31066fb",
          "typeId": "category"
        }
      ],
      "description": {
        "en": "Sample description"
      },
      "masterVariant": {
        "attributes": [],
        "id": 1,
        "images": [
          {
            "dimensions": {
              "h": 1400,
              "w": 1400
            },
            "url": "https://commercetools.com/cli/data/253245821_1.jpg"
          }
        ],
        "prices": [
          {
            "value": {
              "type": "centPrecision",
              "fractionDigits": 2,
              "centAmount": 10000,
              "currencyCode": "EUR"
            },
            "id": "753472a3-ddff-4e0f-a93b-2eb29c90ba54"
          }
        ],
        "sku": "sku_MB_PREMIUM_TECH_T_variant1_1369226795424"
      },
      "name": {
        "en": "MB PREMIUM TECH T"
      },
      "slug": {
        "en": "mb-premium-tech-t1369226795424"
      },
      "variants": [],
      "searchKeywords": {}
    },
    "hasStagedChanges": false,
    "published": true,
    "staged": {
      "categories": [
        {
          "id": "cf6d790a-f027-4f46-9a2b-4bc9a31066fb",
          "typeId": "category"
        }
      ],
      "description": {
        "en": "Sample description"
      },
      "masterVariant": {
        "attributes": [],
        "id": 1,
        "images": [
          {
            "dimensions": {
              "h": 1400,
              "w": 1400
            },
            "url": "https://commercetools.com/cli/data/253245821_1.jpg"
          }
        ],
        "prices": [
          {
            "value": {
              "type": "centPrecision",
              "fractionDigits": 2,
              "centAmount": 10000,
              "currencyCode": "EUR"
            },
            "id": "753472a3-ddff-4e0f-a93b-2eb29c90ba54"
          }
        ],
        "sku": "sku_MB_PREMIUM_TECH_T_variant1_1369226795424"
      },
      "name": {
        "en": "MB PREMIUM TECH T"
      },
      "slug": {
        "en": "mb-premium-tech-t1369226795424"
      },
      "variants": [],
      "searchKeywords": {}
    }
  },
  "productType": {
    "id": "24f510c3-f334-4099-94e2-d6224a8eb919",
    "typeId": "product-type"
  },
  "taxCategory": {
    "id": "f1e10e3a-45eb-49d8-ad0b-fdf984202f59",
    "typeId": "tax-category"
  },
  "createdAt": "1970-01-01T00:00:00.001Z",
  "lastModifiedAt": "1970-01-01T00:00:00.001Z"
}
```