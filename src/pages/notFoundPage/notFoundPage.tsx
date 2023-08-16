import React from 'react';
import style from './notFoundPage.module.scss';

function NotFoundPage(): React.JSX.Element {
	return (
		<div className={style.not__page}>
			<div className={style.container}>
				<div className={style.content}>
					<h1 className={style.title}>404 ERROR</h1>
					<p className={style.text}>This page not found; back to home and start again</p>
					<button type='button' className={style.button}>HOMEPAGE</button>
				</div>
			</div>
		</div>
	);
}
export default NotFoundPage;
