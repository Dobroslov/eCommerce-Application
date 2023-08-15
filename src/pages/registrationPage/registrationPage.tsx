import React from 'react';
import s from './registrationPage.module.scss';
import RegistrationSwitchButton from '../../components/buttons/registrationSwitchButton';
import RegistrationInput from '../../components/inputs/registrationInput';
import SubmitButton from '../../components/buttons/submitButton';

function RegistrationPage(): React.ReactElement {
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
						<RegistrationInput placeholder='Fist name' type='text' />
						<RegistrationInput placeholder='Last Name' type='text' />
						<RegistrationInput placeholder='Email' type='email' />
						<RegistrationInput placeholder='Date of birth' type='date' />
						<RegistrationInput placeholder='Address' type='text' />
						<RegistrationInput placeholder='Password' type='password' />
						<RegistrationInput
							placeholder='Copy your password'
							type='password'
						/>
						<div className={s.remember}>
							<input
								type='checkbox'
								id='checkbox-2'
								className={s.formCheckBox}
							/>
							<label htmlFor='checkbox-2' className={s.checkboxLabel}>
								Remember me
							</label>
						</div>
						<SubmitButton value='Register' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegistrationPage;
