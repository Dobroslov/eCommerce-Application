import React from 'react';
import s from './registrationButton.module.scss';
import { IRegistration } from '../../utils/types';
import { createCustomer } from '../../services/apiServices';

interface IRegistrationButton {
	value: string;
	onSubmit: IRegistration;
}

function RegistrationButton(props: IRegistrationButton): React.JSX.Element {
	const { value, onSubmit } = props;
	return (
		<button onClick={() => createCustomer(onSubmit)} className={s.button} type='submit'>
			{value}
		</button>
	);
}
export default RegistrationButton;
