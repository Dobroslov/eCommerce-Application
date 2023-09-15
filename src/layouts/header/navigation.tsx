import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './header.module.scss';
import store from '../../store/store';
import { hideBurger } from '../../store/actions';

function Navigation(): React.JSX.Element {
	const closeBurger = (): void => {
		store.dispatch(hideBurger());
	};
	return (
		<ul className={style.navigation}>
			<li>
				<NavLink to='/' className={style.nav__link} onClick={closeBurger}>
					Main
				</NavLink>
			</li>
			<li>
				<NavLink to='/shop' className={style.nav__link} onClick={closeBurger}>
					Shop
				</NavLink>
			</li>
			<li>
				<NavLink to='/about-us' className={style.nav__link} onClick={closeBurger}>
					About
				</NavLink>
			</li>
		</ul>
	);
}

export default Navigation;
