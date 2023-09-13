import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './header.module.scss';
import store from '../../store/store';
import { hideBurger } from '../../store/actions';

function Navigation(): React.JSX.Element {
	const closeBurger = ():void => {
		store.dispatch(hideBurger());
	};
	return (
		<ul className={style.navigation}>
			{/*
				<li>
					<a href='#top' className={style.nav__link}>
						Shop
					</a>
				</li>
				<li>
				<a href='#top' className={header.nav__link}>
					Contacts
				</a>
			</li>
			<li>
				<a href='#top' className={header.nav__link}>
					Out Story
				</a>
			</li> */}
			<li>
				<NavLink to='/' className={style.nav__link} onClick={closeBurger}>
					Main
				</NavLink>
			</li>
			{/* <li>
				<NavLink to='/registration' className={style.nav__link}>
					Registration
				</NavLink>
			</li>
			<li>
				<NavLink to='/login' className={style.nav__link}>
					Login
				</NavLink>
			</li> */}
			<li>
				<NavLink to='/shop' className={style.nav__link} onClick={closeBurger}>
					Shop
				</NavLink>
			</li>
			{/* <li>
				<NavLink to='/account_page' className={style.nav__link}>
					My account
				</NavLink>
			</li> */}
		</ul>
	);
}

export default Navigation;
