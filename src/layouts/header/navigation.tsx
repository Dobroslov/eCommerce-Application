import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './header.module.scss';

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
				<NavLink to='/shop' className={style.nav__link}>
					Shop
				</NavLink>
			</li>
		</ul>
	);
}

export default Navigation;
