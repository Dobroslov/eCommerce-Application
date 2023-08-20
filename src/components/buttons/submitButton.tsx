import React from 'react';
import style from './registrationSwitchButton.module.scss';
import { ISubmitButton } from '../../utils/types';

function SubmitButton(
	props: ISubmitButton,
): React.JSX.Element {
	const { value } = props;
	return (
		<button className={style.button} type='submit'>
			{value}
		</button>
	);
}

export default SubmitButton;
