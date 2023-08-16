import React from 'react';
import s from './submitButton.module.scss';

interface ISubmitButton {
	value: string;
}

function SubmitButton(props: ISubmitButton): React.JSX.Element {
	const { value } = props;
	return (
		<button className={s.button} type='submit'>
			{value}
		</button>
	);
}
export default SubmitButton;
