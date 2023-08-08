import React from 'react';
import header from './header.module.scss';

function Header() {
	return (
		<header className={header.header}>
			<a href='#top' className={header.logo}>GLITTER</a>
			<div className={header.menu}>
				<div className={header.navigation}>
					<a href='#top' className={header.nav__link}>Shop</a>
					<a href='#top' className={header.nav__link}>Blog</a>
					<a href='#top' className={header.nav__link}>Out Story</a>
				</div>
				<div className={header.cards}>
					<button type='button' aria-label='Search' className={header.search} />
					<button type='button' aria-label='Basket' className={header.basket} />
					<button type='button' aria-label='Profile' className={header.profile} />
				</div>
			</div>
			<div className={header.nav__button}>
				<span className={header.nav__line} />
				<span className={header.nav__line} />
				<span className={header.nav__line} />
			</div>
		</header>
	);
}
export default Header;
