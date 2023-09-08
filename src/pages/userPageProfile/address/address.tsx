import React, { useEffect, useState } from 'react';

import AddNewAddress from './addAddress';
import style from './address.module.scss';
import { IAddress } from '../../../utils/types';
import ChangeInput from '../../../components/inputs/changeInput/changeInput';
import { changeAddress, removeAddress } from '../../../services/apiServices';

export default function Addresses() {
	function getAddresses(addressesUser: IAddress[], addressIds: string[]): IAddress[] | [] {
		const result = addressesUser.filter((address) => {
			if (address.id) {
				return addressIds.includes(address.id);
			}
			return null;
		});
		return result;
	}

	// function getDefaultAddress(addressesUser: IAddress[], id: string) {
	// 	const result = addressesUser.find((address) => address.id === id);
	// 	return result;
	// }

	const [changedAddress, setChangedAddress] = useState<IAddress>({
		id: '',
		city: '',
		streetName: '',
		streetNumber: '',
		postalCode: '',
		country: '',
	});

	const [shippingAddresses, setShippingAddresses] = useState<IAddress[] | []>([]);
	const [billingAddresses, setBillingAddresses] = useState<IAddress[] | []>([]);

	// const [selectedShippingAddress, setSelectedShippingAddress] = useState(false);
	// const [selectedBillingAddress, setSelectedBillingAddress] = useState(false);

	const [showBillingForm, setShowBillingForm] = useState(false);
	const [showShippingForm, setShowShippingForm] = useState(false);

	const toggleBillingForm = () => {
		setShowBillingForm(!showBillingForm);
	};

	const toggleShippingForm = () => {
		setShowShippingForm(!showShippingForm);
	};

	const handleInputChange = (newValue: string, id: string): void => {
		// console.log(newValue, id);
		setChangedAddress((prevUserData) => ({
			...prevUserData,
			[id]: newValue,
		}));
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newValue = e.target.value;
		setChangedAddress({
			...changedAddress, country: newValue,
		});
	};

	const handleSubmit = async (addressId: string, addressData: IAddress): Promise<void> => {
		changeAddress(addressId, addressData);
	};

	const deleteAddress = async (addressId: string): Promise<void> => {
		try {
			removeAddress(addressId);
			setShippingAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId));
			setBillingAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId));
		} catch (error) {
			console.error('Error handleSubmit:', error);
			// Обработайте ошибку, если что-то пошло не так
		}
	};

	useEffect(() => {
		localStorage.setItem('path', window.location.pathname);
		const storedUserData = localStorage.getItem('userData');
		if (storedUserData) {
			const { addresses, shippingAddressIds, billingAddressIds } = JSON.parse(storedUserData);
			// const { addresses, defaultShippingAddressId, shippingAddressIds, defaultBillingAddressId, billingAddressIds } = JSON.parse(storedUserData);

			setShippingAddresses(getAddresses(addresses, shippingAddressIds));
			setBillingAddresses(getAddresses(addresses, billingAddressIds));

			// setSelectedShippingAddress(getDefaultAddress(addresses, defaultShippingAddressId) || null);
			// setSelectedBillingAddress(getDefaultAddress(addresses, defaultBillingAddressId) || null);

			// const initialAddress = getDefaultAddress(addresses, defaultShippingAddressId) || {
			// 	id: '',
			// 	city: '',
			// 	streetName: '',
			// 	streetNumber: '',
			// 	postalCode: '',
			// 	country: '',
			// };

			// setChangedAddress(initialAddress);
		}
	}, []);

	return (
		<div className={`${style.container}`}>
			<div className={style.body}>
				<h2 className={style.title_h2}>Adress</h2>
				<div className={style.container}>
					<div className={style.content__column}>
						<button onClick={toggleShippingForm} type='button' className={style.button}>
							{showShippingForm ? 'Hide Shipping Address' : 'Add Shipping Address'}
						</button>

						{showShippingForm
							&& <AddNewAddress addressType='shipping' />}

						<ul>

							{shippingAddresses.map((address) => (
								<li key={address.id}>
									<form className={style.form} onSubmit={() => address.id && handleSubmit(address.id, changedAddress)}>
										{/* <div className={style.remember}>
											<input type='checkbox' id='checkbox-1' className={style.formCheckBox} onChange={handleCheckboxChange} />
											<label htmlFor='checkbox-1' className={style.checkboxLabel}>
												{`Default ${addressType} address`}
											</label>
										</div> */}
										<div className={style.inputs}>
											<select
												className={style.select}
												onChange={handleSelectChange}
												name='country'
												id='country'
											// defaultValue={address.country}
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
												initValue={address.city}
											/>
											<ChangeInput
												placeholder='Street name'
												type='text'
												onValueChange={handleInputChange}
												id='streetName'
												errorMessage="Street name should be 1-16 characters and shoudn'nt include any special character"
												pattern='^[A-Za-zА-Яа-я]{1,16}$'
												initValue={address.streetName}
											/>
											<ChangeInput
												placeholder='Street number'
												type='number'
												onValueChange={handleInputChange}
												id='streetNumber'
												errorMessage='Street number should contains only positive numbers'
												pattern='^[0-9]+$'
												initValue={address.streetNumber}
											/>
											<ChangeInput
												placeholder='Postal code'
												type='text'
												onValueChange={handleInputChange}
												id='postalCode'
												errorMessage='The postal code must be like this ("12345" or
								"12345-6789" or "K1M 1E3").'
												pattern='^(?:\d{5}(?:-\d{4})?|[A-Z]\d[A-Z] \d[A-Z]\d)$'
												initValue={address.postalCode}
											/>
											<div className={style.buttons}>
												<button className={style.button} type='submit'>Edit</button>
												<button className={style.button} onClick={() => (address.id ? deleteAddress(address.id) : null)} type='button'>Delete</button>
											</div>
										</div>
									</form>
								</li>
							))}
						</ul>
					</div>

					<div className={style.content__column}>
						<button onClick={toggleBillingForm} type='button' className={style.button}>
							{showBillingForm ? 'Hide Billing Address' : 'Add Billing Address'}
						</button>
						{showBillingForm && <AddNewAddress addressType='billing' />}

						<ul>
							{billingAddresses.map((address) => (
								<li key={address.id}>
									<form className={style.form} onSubmit={() => address.id && handleSubmit(address.id, changedAddress)}>
										{/* <div className={style.remember}>
											<input type='checkbox' id='checkbox-1' className={style.formCheckBox} onChange={handleCheckboxChange} />
											<label htmlFor='checkbox-1' className={style.checkboxLabel}>
												{`Default ${addressType} address`}
											</label>
										</div> */}
										<div className={style.inputs}>
											<select
												className={style.select}
												onChange={handleSelectChange}
												name='country'
												id='country'
											// defaultValue={address.country}
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
												initValue={address.city}
											/>
											<ChangeInput
												placeholder='Street name'
												type='text'
												onValueChange={handleInputChange}
												id='streetName'
												errorMessage="Street name should be 1-16 characters and shoudn'nt include any special character"
												pattern='^[A-Za-zА-Яа-я]{1,16}$'
												initValue={address.streetName}
											/>
											<ChangeInput
												placeholder='Street number'
												type='number'
												onValueChange={handleInputChange}
												id='streetNumber'
												errorMessage='Street number should contains only positive numbers'
												pattern='^[0-9]+$'
												initValue={address.streetNumber}
											/>
											<ChangeInput
												placeholder='Postal code'
												type='text'
												onValueChange={handleInputChange}
												id='postalCode'
												errorMessage='The postal code must be like this ("12345" or
								"12345-6789" or "K1M 1E3").'
												pattern='^(?:\d{5}(?:-\d{4})?|[A-Z]\d[A-Z] \d[A-Z]\d)$'
												initValue={address.postalCode}
											/>
											<div className={style.buttons}>
												<button className={style.button} type='submit'>Edit</button>
												<button className={style.button} onClick={() => (address.id ? deleteAddress(address.id) : null)} type='button'>Delete</button>
											</div>
										</div>
									</form>
								</li>
							))}
						</ul>
					</div>

				</div>
			</div>
		</div>
	);
}
