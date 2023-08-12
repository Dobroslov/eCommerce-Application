import React, { useState } from 'react';
import header from './header.module.scss';
import HeaderButton from '../../components/buttons/headerButton';
import Popup from './popup';

function Burger(): React.JSX.Element {
	const [isActive, setToggle] = useState(false);
	const toggleBurger = ():void => {
		setToggle(!isActive);
	};
	const closeBurger = ():void => {
		if (isActive) {
			setToggle(!isActive);
		}
	};
	return (
		<div className={isActive ? `${header.burger} ${header.active}` : header.burger} onMouseLeave={closeBurger}>
			<HeaderButton className={header.basket} />
			<div className={isActive ? `${header.nav__button} ${header.active}` : header.nav__button} role='presentation' onClick={toggleBurger}>
				<span className={header.nav__line} />
				<span className={header.nav__line} />
				<span className={header.nav__line} />
			</div>
			<div className={`${header.popup} ${isActive ? header.open : ''}`}>
				<Popup />
			</div>
		</div>
	);
}
export default Burger;
