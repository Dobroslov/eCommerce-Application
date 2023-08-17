import React, { useEffect, useState } from 'react';
import s from './registrationPage.module.scss';
import RegistrationSwitchButton from '../../components/buttons/registrationSwitchButton';
import RegistrationInput from '../../components/inputs/registrationInput';
import RegistrationButton from '../../components/buttons/registrationButton';
import { getAnonimousToken } from '../../services/apiServices';
import { IRegistration } from '../../utils/types';

const registrationData: IRegistration = {
	firstName: '',
	lastName: '',
	email: '',
	dateOfBirth: '',
	addresses: [
		{
			city: '',
			streetName: '',
			streetNumber: '',
			postalCode: '',
			country: '',
		},
	],
	password: '',
};
console.log(typeof registrationData);

function RegistrationPage(): React.ReactElement {
	if (!localStorage.getItem('token')) {
		getAnonimousToken();
	}
	const [selectedCountry, setSelectedCountry] = useState('RU');

	useEffect(() => {
		registrationData.addresses[0].country = selectedCountry;
	}, [selectedCountry]);

	const handleInputChange = (value: string, id: string) => {
		console.log(registrationData);

		switch (id) {
			case 'firstName':
				registrationData.firstName = value;
				break;
			case 'lastName':
				registrationData.lastName = value;
				break;
			case 'email':
				registrationData.email = value;
				break;
			case 'date':
				registrationData.dateOfBirth = value;
				break;
			case 'password':
				registrationData.password = value;
				break;
			case 'city':
				registrationData.addresses[0].city = value;
				break;
			case 'streetName':
				registrationData.addresses[0].streetName = value;
				break;
			case 'streetNumber':
				registrationData.addresses[0].streetNumber = value;
				break;
			case 'postalCode':
				registrationData.addresses[0].postalCode = value;
				break;
			default:
		}
	};

	return (
		<div>
			<div className={`${s.container} container`}>
				<div className={s.body}>
					<h1 className={s.title}>Registration</h1>
					<div className={s.buttons}>
						<RegistrationSwitchButton value='Sign in' />
						<RegistrationSwitchButton value='Register' />
					</div>
					<div className={s.inputs}>
						<RegistrationInput placeholder='Fist name' type='text' onValueChange={handleInputChange} id='firstName' />
						<RegistrationInput placeholder='Last Name' type='text' onValueChange={handleInputChange} id='lastName' />
						<RegistrationInput placeholder='Email' type='email' onValueChange={handleInputChange} id='email' />
						<RegistrationInput placeholder='Date of birth' type='date' onValueChange={handleInputChange} id='date' />
						<select
							className={s.select}
							value={selectedCountry}
							onChange={(e) => setSelectedCountry(e.target.value)}
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
						<i className={s.underline} />
						<RegistrationInput placeholder='city' type='text' onValueChange={handleInputChange} id='city' />
						<RegistrationInput placeholder='streetName' type='text' onValueChange={handleInputChange} id='streetName' />
						<RegistrationInput placeholder='streetNumber' type='text' onValueChange={handleInputChange} id='streetNumber' />
						<RegistrationInput placeholder='postalCode' type='text' onValueChange={handleInputChange} id='postalCode' />
						<RegistrationInput onValueChange={handleInputChange} placeholder='Password' type='password' id='password' />
						<RegistrationInput
							onValueChange={handleInputChange}
							placeholder='Copy your password'
							type='password'
							id='copy_password'
						/>
						<div className={s.remember}>
							<input type='checkbox' id='checkbox-2' className={s.formCheckBox} />
							<label htmlFor='checkbox-2' className={s.checkboxLabel}>
								Remember me
							</label>
						</div>
						<RegistrationButton onSubmit={registrationData} value='Register' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegistrationPage;
