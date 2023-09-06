import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './breadCrumbs.module.scss';

export default function Breadcrumbs() {
	const routes = useLocation().pathname.split('/').filter(Boolean);

	return (
		<nav className={`${style.nav} container`}>
			<ul className={style.list}>
				<li className={style.item}>
					<Link to='/' className={style.link}>
						Home
					</Link>
				</li>
				{routes.map((route, index) => (
					<li key={route} className={style.item}>
						{/* Проверяем, является ли текущий элемент последним */}
						{index === routes.length - 1 ? (
							<span className={style.lastItem}>/{route}</span>
						) : (
							<Link className={style.link} to={`/${routes.slice(0, index + 1).join('/')}`}>
								/{route}
							</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
