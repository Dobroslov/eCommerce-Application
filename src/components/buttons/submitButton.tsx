import React from 'react';
import style from './submitButton.module.scss';
import { ISubmitButton } from '../../utils/types';

function SubmitButton(
	props: ISubmitButton,
): React.JSX.Element {
	const { value, isDisabled = false } = props;
	return (
		<button className={style.button} type='submit' disabled={isDisabled}>
			{value}
		</button>
	);
}

export default SubmitButton;
