import React, { useState, FormEvent } from 'react';
import { addAddress, addBillingAddressId, addShippingAddressId, setDefaultBillingAddress, setDefaultShippingAddress } from '../../../services/apiServices';
import RegistrationInput from '../../../components/inputs/registrationInput';
import RegistrationButton from '../../../components/buttons/registrationButton';

import style from './address.module.scss';

export default function AddNewAddress({ addressType }: { addressType: string }): React.ReactElement {
	const [address, setAddress] = useState({
		country: 'RU',
		city: '',
		streetName: '',
		streetNumber: '',
		postalCode: '',
	});

	const [defaultAddress, setDefaultAddress] = useState(false);
	// чекбокс адресса по умолчанию

	const handleInputChange = (newValue: string, id: string): void => {
		setAddress((prevUserData) => ({
			...prevUserData,
			[id]: newValue,
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const isChecked = e.target.checked;
		setDefaultAddress(isChecked);
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newValue = e.target.value;

		setAddress({
			...address, country: newValue,
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		addAddress(address).then((responseData) => {
			const addressId = responseData.addresses.slice(-1)[0].id;
			if (addressId) {
				switch (addressType) {
					case 'billing':
						addBillingAddressId(addressId).then(() => {
							if (defaultAddress) {
								setDefaultBillingAddress(addressId);
							}
						});
						break;

					case 'shipping':
					default:
						addShippingAddressId(addressId).then(() => {
							if (defaultAddress) {
								setDefaultShippingAddress(addressId);
							}
						});
						break;
				}
			}
			setAddress({
				country: 'RU',
				city: '',
				streetName: '',
				streetNumber: '',
				postalCode: '',
			});
			setDefaultAddress(false);
		});
	};

	return (
		<div className={style.registration}>
			<div className={`${style.container} container`}>
				<div className={style.body}>
					<h1 className={style.title}>Add new address</h1>
					<form className={style.form} onSubmit={handleSubmit}>
						<div className={style.remember}>
							<input type='checkbox' id='checkbox-1' className={style.formCheckBox} onChange={handleCheckboxChange} />
							<label htmlFor='checkbox-1' className={style.checkboxLabel}>
								{`Default ${addressType} address`}
							</label>
						</div>
						<div className={style.inputs}>
							<select
								className={style.select}
								onChange={handleSelectChange}
								name='country'
								id='country'
								defaultValue='RU'
								value={address.country}
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
							<RegistrationInput
								placeholder='City'
								type='text'
								onValueChange={handleInputChange}
								id='city'
								errorMessage="City should be 1-16 characters and shoudn'nt include any special character"
								pattern='^[A-Za-zА-Яа-я]{1,16}$'
								defaultValue={address.city}
							/>
							<RegistrationInput
								placeholder='Street name'
								type='text'
								onValueChange={handleInputChange}
								id='streetName'
								errorMessage="Street name should be 1-16 characters and shoudn'nt include any special character"
								pattern='^[A-Za-zА-Яа-я]{1,16}$'
								defaultValue={address.streetName}
							/>
							<RegistrationInput
								placeholder='Street number'
								type='number'
								onValueChange={handleInputChange}
								id='streetNumber'
								errorMessage='Street number should contains only positive numbers'
								pattern='^[0-9]+$'
								defaultValue={address.streetNumber}
							/>
							<RegistrationInput
								placeholder='Postal code'
								type='text'
								onValueChange={handleInputChange}
								id='postalCode'
								errorMessage='The postal code must be like this ("12345" or
								"12345-6789" or "K1M 1E3").'
								pattern='^(?:\d{5}(?:-\d{4})?|[A-Z]\d[A-Z] \d[A-Z]\d)$'
								defaultValue={address.postalCode}
							/>
							<RegistrationButton value='Register' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
