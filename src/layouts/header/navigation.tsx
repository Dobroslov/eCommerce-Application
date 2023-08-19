import React from 'react';
import { NavLink } from 'react-router-dom';
import header from './header.module.scss';

// const setActive = ({ isActive }) => (isActive ? `${header.nav__link}` : '');
// const setActive = ({ isActive: }) => (isActive ? `${header.nav__link}` : '');

function Navigation(): React.JSX.Element {
	return (
		<ul className={header.navigation}>
			{/* <li>
				<a href='#top' className={header.nav__link}>
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
				<NavLink to='/'>Main page</NavLink>
			</li>
			<li>
				<NavLink to='/registration'>Registration page</NavLink>
			</li>
			<li>
				<NavLink to='/login'>Login page</NavLink>
			</li>
			<li>
				<NavLink to='/shop'>Shop</NavLink>
			</li>
			<li>
				<NavLink to='/account_page'>Account page</NavLink>
			</li>
			<li>
				<NavLink to='*'>Not found</NavLink>
				{/* // className={header.nav__link}
				// activeClassName='nav__link_active' */}
			</li>

		</ul>
	);
}
export default Navigation;
