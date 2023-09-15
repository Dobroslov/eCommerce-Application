import React from 'react';
import { Link } from 'react-router-dom';

import style from './notFoundPage.module.scss';

function NotFoundPage(): React.JSX.Element {
	localStorage.removeItem('path');
	return (
		// <div className={style.not__page}>
		// <div className={`container`}>
		<div className={style.content}>
			<h1 className={`${style.title} title_h1`}>404 ERROR</h1>
			<p className={`${style.text} title_h3`}>
				This page was not found. Go back to the main page and start again
			</p>
			<Link to='/' className={style.button}>Home page</Link>
		</div>
		// </div>
		// </div>
	);
}
export default NotFoundPage;
