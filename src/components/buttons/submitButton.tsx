import React from 'react';
import style from './submitButton.module.scss';
import { ISubmitButton } from '../../utils/types';

function SubmitButton(props: ISubmitButton): React.JSX.Element {
	const { value, onClick } = props;
	return (
		<button onClick={onClick} className={style.button} type='submit'>
			{value}
		</button>
	);
}

export default SubmitButton;
