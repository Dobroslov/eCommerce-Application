import React from 'react';
import { Link } from 'react-router-dom';
import style from './notFoundPage.module.scss';

function NotFoundPage(): React.JSX.Element {
	return (
		<div className={style.not__page}>
			<div className={style.container}>
				<div className={style.content}>
					<h1 className={style.title}>404 ERROR</h1>
					<p className={style.text}>
						This page was not found. Go back to the main page and start again
					</p>
					<Link to='/' className={style.button}>HOMEPAGE</Link>
				</div>
			</div>
		</div>
	);
}
export default NotFoundPage;
