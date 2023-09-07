import React, { FormEvent, useEffect, useState } from 'react';
import ChangeInput from '../../../components/inputs/changeInput/changeInput';

import AddNewAddress from './addAddress';
import SubmitButton from '../../../components/buttons/submitButton';
import style from './address.module.scss';
// import { IAddress } from '../../../utils/types';

// function getAddresses() {
// 	const user = localStorage.getItem('userData') as string;
// 	const { billingAddressIds, shippingAddressIds, addresses } = JSON.parse(user);

// 	// Фильтруем адреса с учетом billing адресов
// 	const billingAddresses = addresses.filter((address: IAddress) =>
// 		billingAddressIds.includes(address.id),
// 	);

// 	// Фильтруем адреса с учетом shipping адресов
// 	const shippingAddresses = addresses.filter((address: IAddress) =>
// 		shippingAddressIds.includes(address.id),
// 	);

// 	return { billingAddresses, shippingAddresses };
// }

// function getDefaultAddresses() {
// 	const user = localStorage.getItem('userData') as string;
// 	const { defaultShippingAddressId, defaultBillingAddressId, addresses } = JSON.parse(user);

// 	const defaultBillingAddress = addresses.find((address: IAddress) => address.id === defaultBillingAddressId);
// 	const defaultShippingAddress = addresses.find((address: IAddress) => address.id === defaultShippingAddressId);

// 	return { defaultBillingAddress, defaultShippingAddress };
// }

export default function Addresses() {
	// const [addresses, setAddresses] = useState<IAddress[]>([]);

	useEffect(() => {
		const storedUserData = localStorage.getItem('userData');
		if (storedUserData) {
			// const parsedUserData = JSON.parse(storedUserData);
			localStorage.setItem('path', window.location.pathname);

			// setAddress({
			// 	country: parsedUserData.country || '',
			// 	city: parsedUserData.city || '',
			// 	streetName: parsedUserData.streetName || '',
			// 	streetNumber: parsedUserData.streetNumber || '',
			// 	postalCode: parsedUserData.postalCode || '',
			// 	id: parsedUserData.id || '',
			// });
		}
	}, []);

	const [showBillingForm, setShowBillingForm] = useState(false);
	const [showShippingForm, setShowShippingForm] = useState(false);

	const toggleBillingForm = () => {
		setShowBillingForm(!showBillingForm);
	};

	const toggleShippingForm = () => {
		setShowShippingForm(!showShippingForm);
	};

	const handleInputChange = (newValue: string, id: string): void => {
		console.log(newValue, id);
		// setAddress((prevUserData) => ({
		// 	...prevUserData,
		// 	[id]: newValue,
		// }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		try {
			// await createCustomer(registrationFormData, navigate);
		} catch (error) {
			console.error('Error handleSubmit:', error);
			// Обработайте ошибку, если что-то пошло не так
		}
	};

	return (
		<div className={`${style.container} container`}>
			<div className={style.body}>
				<h2 className={style.title_h2}>Adress</h2>
				<AddNewAddress addressType='billing' />
				<AddNewAddress addressType='shipping' />
				<div className={style.buttons}>
					<button onClick={toggleBillingForm} type='button'>
						{showBillingForm ? 'Hide Billing Address' : 'Add Billing Address'}
					</button>
					<button onClick={toggleShippingForm} type='button' className={style.toggle_gutton}>
						{showShippingForm ? 'Hide Shipping Address' : 'Add Shipping Address'}
					</button>
				</div>
				{showBillingForm && (
					<form className={style.form} onSubmit={handleSubmit}>
						<div className={style.inputs}>
							<form className={style.form} onSubmit={handleSubmit}>
								<div className={style.inputs}>
									<select
										className={style.select}
										// value={selectedCountry}
										// onChange={(e) => setSelectedCountry(e.target.value)}
										name='country'
										id='country'
									>
										<option value='RU'>Russia</option>
										<option value='BY'>Belarus</option>
										<option value='UA'>Ukraine</option>
										<option value='PL'>Poland</option>
										<option value='CN'>China</option>
										<option value='AM'>Armenia</option>
										<option value='GE'>Georgia</option>
										<option value='RO'>Romania</option>
										<option value='NL'>Netherlands</option>
										<option value='KZ'>Kazakhstan</option>
										<option value='KG'>Kyrgyzstan</option>
										<option value='DE'>Germany</option>
										<option value='GR'>Greece</option>
										<option value='EU'>Other</option>
									</select>
									<ChangeInput
										placeholder='City'
										type='text'
										onValueChange={handleInputChange}
										id='city'
										errorMessage="City should be 1-16 characters and shoudn'nt include any special character"
										pattern='^[A-Za-zА-Яа-я]{1,16}$'
									/>
									<ChangeInput
										placeholder='Street name'
										type='text'
										onValueChange={handleInputChange}
										id='streetName'
										errorMessage="Street name should be 1-16 characters and shoudn'nt include any special character"
										pattern='^[A-Za-zА-Яа-я]{1,16}$'
									/>
									<ChangeInput
										placeholder='Street number'
										type='number'
										onValueChange={handleInputChange}
										id='streetNumber'
										errorMessage='Street number should contains only positive numbers'
										pattern='^[0-9]+$'
									/>
									<ChangeInput
										placeholder='Postal code'
										type='text'
										onValueChange={handleInputChange}
										id='postalCode'
										errorMessage='The postal code must be like this ("12345" or
					"12345-6789" or "K1M 1E3").'
										pattern='^(?:\d{5}(?:-\d{4})?|[A-Z]\d[A-Z] \d[A-Z]\d)$'
									/>
								</div>
								<SubmitButton value='Save Billing Address' />
							</form>
						</div>
					</form>
				)}

				{showShippingForm && (
					<form className={style.form} onSubmit={handleSubmit}>
						<div className={style.inputs}>
							<form className={style.form} onSubmit={handleSubmit}>
								<div className={style.inputs}>
									<select
										className={style.select}
										// value={selectedCountry}
										// onChange={(e) => setSelectedCountry(e.target.value)}
										name='country'
										id='country'
									>
										<option value='RU'>Russia</option>
										<option value='BY'>Belarus</option>
										<option value='UA'>Ukraine</option>
										<option value='PL'>Poland</option>
										<option value='CN'>China</option>
										<option value='AM'>Armenia</option>
										<option value='GE'>Georgia</option>
										<option value='RO'>Romania</option>
										<option value='NL'>Netherlands</option>
										<option value='KZ'>Kazakhstan</option>
										<option value='KG'>Kyrgyzstan</option>
										<option value='DE'>Germany</option>
										<option value='GR'>Greece</option>
										<option value='EU'>Other</option>
									</select>
									<ChangeInput
										placeholder='City'
										type='text'
										onValueChange={handleInputChange}
										id='city'
										errorMessage="City should be 1-16 characters and shoudn'nt include any special character"
										pattern='^[A-Za-zА-Яа-я]{1,16}$'
									/>
									<ChangeInput
										placeholder='Street name'
										type='text'
										onValueChange={handleInputChange}
										id='streetName'
										errorMessage="Street name should be 1-16 characters and shoudn'nt include any special character"
										pattern='^[A-Za-zА-Яа-я]{1,16}$'
									/>
									<ChangeInput
										placeholder='Street number'
										type='number'
										onValueChange={handleInputChange}
										id='streetNumber'
										errorMessage='Street number should contains only positive numbers'
										pattern='^[0-9]+$'
									/>
									<ChangeInput
										placeholder='Postal code'
										type='text'
										onValueChange={handleInputChange}
										id='postalCode'
										errorMessage='The postal code must be like this ("12345" or
						"12345-6789" or "K1M 1E3").'
										pattern='^(?:\d{5}(?:-\d{4})?|[A-Z]\d[A-Z] \d[A-Z]\d)$'
									/>
								</div>
								<SubmitButton value='Save Shipping Address' />
							</form>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
