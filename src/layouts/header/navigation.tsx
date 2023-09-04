import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './header.module.scss';

// const setActive = ({ isActive }) => (isActive ? `${header.nav__link}` : '');
// const setActive = ({ isActive: }) => (isActive ? `${header.nav__link}` : '');

function Navigation(): React.JSX.Element {
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
				<NavLink to='/' className={style.nav__link}>
					Main
				</NavLink>
			</li>
			<li>
				<NavLink to='/registration' className={style.nav__link}>
					Registration
				</NavLink>
			</li>
			<li>
				<NavLink to='/login' className={style.nav__link}>
					Login
				</NavLink>
			</li>
			<li>
				<NavLink to='/shop' className={style.nav__link}>
					Shop
				</NavLink>
			</li>
			<li>
				<NavLink to='/shop' className={style.nav__link}>Shop</NavLink>
			</li>
			<li>
				<NavLink to='/account_page' className={style.nav__link}>
					My account
				</NavLink>
			</li>
			{/* <li>
				<NavLink to='*' className={style.nav__link}>Not found</NavLink>
			</li> */}
		</ul>
	);
}

export default Navigation;
