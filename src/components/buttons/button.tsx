import React from 'react';
import { ISubmitButton } from '../../utils/types';

import style from './button.module.scss';

function SubmitButton(
	props: ISubmitButton,
): React.JSX.Element {
	const { value } = props;
	return (
		<button className={style.button} type='button'>
			{value}
		</button>
	);
}

export default SubmitButton;
