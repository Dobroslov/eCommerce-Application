import React from 'react';
import header from './header.module.scss';

function Navigation(): React.JSX.Element {
	return (
		<ul className={header.navigation}>
			<li><a href='#top' className={header.nav__link}>Shop</a></li>
			<li><a href='#top' className={header.nav__link}>Contacts</a></li>
			<li><a href='#top' className={header.nav__link}>Out Story</a></li>
		</ul>
	);
}
export default Navigation;
