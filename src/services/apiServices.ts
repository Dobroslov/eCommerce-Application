/* eslint-disable no-unsafe-optional-chaining */
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
	IProductCart,
	ICartData,
	IProductCatalog,
	ICart,
} from '../utils/types';
import store from '../store/store';
import { addCartData, addCode, hideModal, showModal } from '../store/actions';
import errorModal from '../../public/assets/svg/error.svg';
import successModal from '../../public/assets/svg/success.svg';
// import { $CombinedState } from '@reduxjs/toolkit';

const PROJECT_KEY = 'glitter-magazine';
const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const HEADERS_BASIC: {
	'Content-Type': string;
	Authorization: string;
} = {
	'Content-Type': 'application/json',
	Authorization:
		'Basic Y1NuZjhlM3RLSllqMmhmdm1uc0E5UmtMOnJNLXExemFGTDl0dVRvUUdQV3E4ZlVQX2piOEY0aW9O',
};

function getHeaders(): object {
	let token = '';
	if (!localStorage.getItem('token')) {
		token = localStorage.getItem('anonimous') as string;
	} else {
		token = localStorage.getItem('token') as string;
	}
	const headers: {
		'Content-Type': string;
		Authorization: string;
	} = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	return headers;
}

export async function getAnonimousToken(): Promise<void> {
	const url = `${AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token?grant_type=client_credentials`;
	const headers = HEADERS_BASIC;
	const data = '';

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => localStorage.setItem('anonimous', response.data.access_token))
		.catch((error: Error) => {
			console.log(error);
		});
}

export async function createCustomer(
	params: IRegistrationForm,
	navigate: NavigateFunction,
): Promise<void> {
	// Здесь вы можете указать конкретный тип, который ожидаете получить от сервера
	const data: string = JSON.stringify(params);
	const url = `${API_URL}/${PROJECT_KEY}/customers`;
	const headers = getHeaders();
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
				url: successModal,
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
					url: errorModal,
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

export async function getCustomerForId(
	email: string,
	password: string | undefined,
): Promise<IUserDataRespons | undefined> {
	const cartData = store.getState().data.cart as ICart;
	const data = JSON.stringify({
		email: `${email}`,
		password: `${password}`,
		anonymousCart: {
			id: `${cartData.id}`,
			typeId: 'cart',
		},
	});
	const url = `${API_URL}/${PROJECT_KEY}/login`;
	const headers = getHeaders();
	try {
		const response = await axios.post(url, data, {
			headers,
		});
		const responseData: IUserDataRespons = response.data.customer;
		const cart: ICart = {
			id: response.data.cart.id,
			version: response.data.cart.version,
			quantity: response.data.cart.totalLineItemQuantity,
			total: response.data.cart.totalPrice.centAmount,
		};
		localStorage.setItem('userData', JSON.stringify(responseData));
		store.dispatch(addCartData(cart));
		return responseData;
	} catch (error) {
		console.error('Error getting customer data:', error);
		return undefined; // Вернуть undefined в случае ошибки
	}
}

export async function getToken(params: IUserLogin): Promise<void> {
	const { email, password } = params;
	const url = `${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}`;
	const headers = HEADERS_BASIC;
	const data = '';

	await axios
		.post(url, data, {
			headers,
		})
		.then(async (response) => {
			localStorage.setItem('token', response.data.access_token);
			const user = await getCustomerForId(email, password);
			if (user) {
				// Проверка на undefined
				store.dispatch(
					showModal({
						title: 'Success',
						description: `Welcome ${user.firstName} ${user.lastName} `,
						url: successModal,
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
					url: errorModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}
/* export async function refreshToken(params: IUserLogin): Promise<void> {
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
			await getCustomerForId(email,password);
		})
		.catch((error) => {
			console.log('file: apiServices.ts:170 ~ refreshToken ~ error:', error);
		});
}
*/
export async function checkToken(token: string): Promise<{ active: string } | void> {
	const url = `${AUTH_URL}/oauth/introspect?token=${token}`;
	const headers = HEADERS_BASIC;
	const data = '';

	await axios
		.post(url, data, {
			headers,
		})
		.then(async (response) => {
			const active = JSON.stringify(response.data.active);
			return {
				active,
			};
		})
		.catch((error) => {
			console.log(error);
		});

	// return customer;
}

export async function getFilter(
	limit = 9,
	offset = 0,
	filter: string,
): Promise<void | IProductCatalog> {
	// eslint-disable-line consistent-return

	const url = `${API_URL}/${PROJECT_KEY}/product-projections/search?fuzzy=true&limit=${limit}&offset=${offset}${filter}`;
	const headers = getHeaders();
	const products = await axios
		.get(url, {
			headers,
		})
		.then((response) => {
			const productsArr: IProduct[] = [];
			const totalQuantity = response.data.total;
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
						/* eslint-disable-next-line no-unsafe-optional-chaining */
						discount: (product.masterVariant.prices[0].discounted?.value.centAmount / 100).toFixed(
							2,
						) as string,
					};
					productsArr.push(productValues);
				},
			);
			return { productsArr, totalQuantity };
		})
		.catch((error) => {
			console.log(error);
		});
	return products;
}

export async function getProductForId(id: string): Promise<void | IProductbyId> {
	const url = `${API_URL}/${PROJECT_KEY}/product-projections/${id}`;
	const headers = getHeaders();

	const product = await axios
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
				discount: (
					response.data.masterVariant.prices[0].discounted?.value.centAmount / 100
				).toFixed(2) as string,
				sku: response.data.masterVariant.sku,
			};
			return productData;
		})
		.catch((error) => {
			console.log(error);
		});

	return product;
}

export async function changePassword({ oldPassword, newPassword }: IUpdatePassword): Promise<void> {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const data = JSON.stringify({
		id,
		version,
		currentPassword: `${oldPassword}`,
		newPassword: `${newPassword}`,
	});
	const headers = getHeaders();
	const url = `${API_URL}/${PROJECT_KEY}/customers/password`;

	await axios
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
					url: successModal,
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
					url: errorModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}

export async function changeCustomerValues({
	firstName,
	lastName,
	email,
	dateOfBirth,
}: IUpdateUserData) {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const headers = getHeaders();
	const url = `${API_URL}/${PROJECT_KEY}/customers/${id}`;
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

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
			// window.location.reload();
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Data changed successfully',
					url: successModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
				window.location.reload();
			}, 5000);
		})
		.catch((error) => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					url: errorModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}

export async function changeAddress(addressId: string, addressData: IAddress) {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const headers = getHeaders();
	const url = `${API_URL}/${PROJECT_KEY}/customers/${id}`;
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

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Address changed successfully',
					url: successModal,
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
					url: errorModal,
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

export async function addressActions(addressAction: string, addressId: string) {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const headers = getHeaders();
	const url = `${API_URL}/${PROJECT_KEY}/customers/${id}`;
	const data = {
		version,
		actions: [
			{
				action: addressAction,
				addressId,
			},
		],
	};

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Data changed successfully',
					url: successModal,
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
					url: errorModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}

export async function addAddress(addressData: IAddress) {
	const user = localStorage.getItem('userData') as string;
	const { id, version } = JSON.parse(user);
	const headers = getHeaders();
	const url = `${API_URL}/${PROJECT_KEY}/customers/${id}`;
	const data = {
		version,
		actions: [
			{
				action: 'addAddress',
				address: addressData,
			},
		],
	};

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const responseData = response.data;
			localStorage.setItem('userData', JSON.stringify(responseData));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Data changed successfully',
					url: successModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
			return responseData;
		})
		.catch((error) => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					url: errorModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
}

export async function createCart() {
	const productIdArr: { item: string; product: string }[] = [];
	const data = JSON.stringify({
		currency: 'EUR',
	});
	const url = `${API_URL}/${PROJECT_KEY}/me/carts`;
	const headers = getHeaders();

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			response.data.lineItems.forEach((item: { id: string; productId: string }) => {
				const idData: {
					item: string;
					product: string;
				} = {
					item: item.id,
					product: item.productId,
				};
				productIdArr.push(idData);
			});
			localStorage.setItem('productsCartId', JSON.stringify(productIdArr));
			const cartData = {
				id: response.data.id,
				version: response.data.version,
				quantity: response.data.totalLineItemQuantity,
				total: response.data.totalPrice.centAmount,
			};
			store.dispatch(addCartData(cartData));
			console.log(store.getState());
		})
		.catch((error) => {
			console.log(error);
		});
}
export async function getCart() {
	const url = `${API_URL}/${PROJECT_KEY}/me/active-cart`;
	const headers = getHeaders();
	const cart: void | ICartData = await axios
		.get(url, {
			headers,
		})
		.then((response) => {
			const productIdArr: {
				item: string;
				product: string;
			}[] = [];
			const priceArr: number[] = [];
			const productArr: IProductCart[] = [];
			const { currencyCode } = response.data.totalPrice;
			const totalQuantity = response.data.totalLineItemQuantity;
			const totalDiscount = (response.data.totalPrice.centAmount / 100).toFixed(2);

			response.data.lineItems.forEach(
				(item: {
					id: string;
					productId: string;
					name: { [x: string]: string };
					variant: { attributes: { value: string }[]; images: { url: string }[] };
					totalPrice: { centAmount: number };
					price: { value: { centAmount: number } };
					discountedPrice: { value: { centAmount: number } };
					quantity: number;
				}) => {
					let discount: string;
					if (item.discountedPrice) {
						discount = (item.discountedPrice.value.centAmount / 100).toFixed(2) as string;
					} else {
						discount = '';
					}
					const productCart: IProductCart = {
						id: item.id,
						productId: item.productId,
						name: item.name['en-US'],
						weight: item.variant.attributes[1].value,
						metall: item.variant.attributes[4].value[0],
						image: item.variant.images[0].url,
						currencyCode: response.data.totalPrice.currencyCode,
						totalPrice: (item.totalPrice.centAmount / 100).toFixed(2) as string,
						price: (item.price.value.centAmount / 100).toFixed(2) as string,
						discount,
						quantity: item.quantity,
					};
					const idData: {
						item: string;
						product: string;
					} = {
						item: item.id,
						product: item.productId,
					};
					productArr.push(productCart);
					productIdArr.push(idData);
					priceArr.push(item.price.value.centAmount * item.quantity);
				},
			);
			localStorage.setItem('productsCartId', JSON.stringify(productIdArr));
			const cartData = {
				id: response.data.id,
				version: response.data.version,
				quantity: response.data.totalLineItemQuantity,
				total: response.data.totalPrice.centAmount,
			};
			const totalPrice = (priceArr.reduce((a, b) => a + b) / 100).toFixed(2);
			const discountProcent = Math.round(100 - (+totalDiscount / +totalPrice) * 100);
			store.dispatch(addCartData(cartData));
			return {
				productArr,
				totalPrice,
				currencyCode,
				totalQuantity,
				totalDiscount,
				discountProcent,
			};
		})
		.catch(() => {
			createCart();
		});
	console.log(cart);
	return cart;
}

export async function addProductForCart(productId: string | undefined, quantity: number) {
	const cartData = store.getState().data.cart as ICart;
	const data = {
		version: cartData.version,
		actions: [
			{
				action: 'addLineItem',
				productId: `${productId}`,
				variantId: 1,
				quantity,
			},
		],
	};
	const url = `${API_URL}/${PROJECT_KEY}/me/carts/${cartData.id}`;
	const headers = getHeaders();

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const cartProductId: {
				item: string;
				product: string;
			}[] = [];
			const cart: ICart = {
				id: response.data.id,
				version: response.data.version,
				quantity: response.data.totalLineItemQuantity,
				total: response.data.totalPrice.centAmount,
			};
			store.dispatch(addCartData(cart));
			response.data.lineItems.forEach((item: { id: string; productId: string }) => {
				const idData: {
					item: string;
					product: string;
				} = {
					item: item.id,
					product: item.productId,
				};
				cartProductId.push(idData);
			});
			localStorage.setItem('productsCartId', JSON.stringify(cartProductId));
			store.dispatch(addCartData(cart));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'the product has been added to the cart',
					url: successModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function changeQuantityProductForCart(itemId: string, quantity: number) {
	console.log(store.getState());
	const cartData = store.getState().data.cart as ICart;
	const data = JSON.stringify({
		version: cartData.version,
		actions: [
			{
				action: 'changeLineItemQuantity',
				lineItemId: `${itemId}`,
				quantity,
			},
		],
	});
	const url = `${API_URL}/${PROJECT_KEY}/me/carts/${cartData.id}`;
	const headers = getHeaders();

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const cart = {
				id: response.data.id,
				version: response.data.version,
				quantity: response.data.totalLineItemQuantity,
				total: response.data.totalPrice.centAmount,
			};
			store.dispatch(addCartData(cart));
			store.dispatch(
				showModal({
					title: 'Success',
					description: '+',
					url: successModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			console.log(error);
		});
}
export async function DeleteProductForCart(itemId: string) {
	const cartData = store.getState().data.cart as ICart;
	const url = `${API_URL}/${PROJECT_KEY}/me/carts/${cartData.id}`;
	const headers = getHeaders();
	const data = JSON.stringify({
		version: cartData.version,
		actions: [
			{
				action: 'removeLineItem',
				lineItemId: itemId,
			},
		],
	});
	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const cart = {
				id: response.data.id,
				version: response.data.version,
				quantity: response.data.totalLineItemQuantity,
				total: response.data.totalPrice.centAmount,
			};
			store.dispatch(addCartData(cart));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'delete',
					url: successModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function clearCart(products: IProductCart[]) {
	const cartData = store.getState().data.cart as ICart;
	const url = `${API_URL}/${PROJECT_KEY}/me/carts/${cartData.id}`;
	const headers = getHeaders();
	const items: { action: string; lineItemId: string }[] = [];
	products.forEach((product: { id: string }) => {
		items.push({ action: 'removeLineItem', lineItemId: product.id });
	});
	const data = JSON.stringify({
		version: cartData.version,
		actions: items,
	});
	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const cart = {
				id: response.data.id,
				version: response.data.version,
				quantity: response.data.totalLineItemQuantity,
				total: response.data.totalPrice.centAmount,
			};
			store.dispatch(addCartData(cart));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Cart clear',
					url: successModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function addPromoCode(promo: string) {
	const cartData = store.getState().data.cart as ICart;
	const totalPrice = ((store.getState().data.cart?.total as number) / 100).toFixed(2);
	const data = {
		version: cartData.version,
		actions: [
			{
				action: 'addDiscountCode',
				code: promo,
			},
		],
	};
	const url = `${API_URL}/${PROJECT_KEY}/me/carts/${cartData.id}`;
	const headers = getHeaders();

	const cartDataValue: ICartData | void = await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			const promoCodeID: string = response.data.discountCodes[0].discountCode.id;
			store.dispatch(addCode(promoCodeID));
			const productIdArr: {
				item: string;
				product: string;
			}[] = [];
			const productArr: IProductCart[] = [];
			const totalDiscount = (response.data.totalPrice.centAmount / 100).toFixed(2);
			const { currencyCode } = response.data.totalPrice;
			const totalQuantity = response.data.totalLineItemQuantity;
			response.data.lineItems.forEach(
				(item: {
					id: string;
					productId: string;
					name: { [x: string]: string };
					variant: { attributes: { value: string }[]; images: { url: string }[] };
					totalPrice: { centAmount: number };
					price: { value: { centAmount: number } };
					discountedPrice: { value: { centAmount: number } };
					quantity: number;
				}) => {
					let discount: string;
					if (item.discountedPrice) {
						discount = (item.discountedPrice.value.centAmount / 100).toFixed(2) as string;
					} else {
						discount = '';
					}
					const productCart: IProductCart = {
						id: item.id,
						productId: item.productId,
						name: item.name['en-US'],
						weight: item.variant.attributes[1].value,
						metall: item.variant.attributes[4].value[0],
						image: item.variant.images[0].url,
						currencyCode: response.data.totalPrice.currencyCode,
						totalPrice: (item.totalPrice.centAmount / 100).toFixed(2) as string,
						price: (item.price.value.centAmount / 100).toFixed(2) as string,
						discount,
						quantity: item.quantity,
					};
					const idData: {
						item: string;
						product: string;
					} = {
						item: item.id,
						product: item.productId,
					};
					productArr.push(productCart);
					productIdArr.push(idData);
				},
			);
			localStorage.setItem('productsCartId', JSON.stringify(productIdArr));
			const cart = {
				id: response.data.id,
				version: response.data.version,
				quantity: response.data.totalLineItemQuantity,
				total: response.data.totalPrice.centAmount,
			};
			store.dispatch(addCartData(cart));
			store.dispatch(
				showModal({
					title: 'Success',
					description: 'Code completed',
					url: successModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
			const discountProcent = Math.round(100 - (+totalDiscount / +totalPrice) * 100);
			return {
				productArr,
				totalPrice,
				currencyCode,
				totalQuantity,
				totalDiscount,
				discountProcent,
			};
		})
		.catch((error) => {
			store.dispatch(
				showModal({
					title: 'Fault',
					description: error.response?.data.message,
					url: errorModal,
				}),
			);
			setTimeout(() => {
				store.dispatch(hideModal());
			}, 5000);
		});
	console.log(cartDataValue);
	return cartDataValue;
}

export async function checkAnonimousToken(
	token: string,
): Promise<{ email: string; active: string } | void> {
	const url = `${AUTH_URL}/oauth/introspect?token=${token}`;
	const headers = HEADERS_BASIC;
	const data = '';

	await axios
		.post(url, data, {
			headers,
		})
		.then((response) => {
			if (response.data.active === false) {
				getAnonimousToken().then(() => {
					getCart();
				});
			} else {
				getCart();
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function removePromoCode() {
	if (store.getState().code.code) {
		const promoId = store.getState().code.code;
		const cartData = store.getState().data.cart as ICart;
		const data = {
			version: cartData.version,
			actions: [
				{
					action: 'removeDiscountCode',
					discountCode: {
						typeId: 'discount-code',
						id: promoId,
					},
				},
			],
		};
		const url = `${API_URL}/${PROJECT_KEY}/me/carts/${cartData.id}`;
		const headers = getHeaders();
		await axios
			.post(url, data, {
				headers,
			})
			.then((response) => {
				const cart = {
					id: response.data.id,
					version: response.data.version,
					quantity: response.data.totalLineItemQuantity,
					total: response.data.totalPrice.centAmount,
				};
				store.dispatch(addCartData(cart));
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
