import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import header from './header.module.scss';
// import HeaderButton from '../../components/buttons/headerButton';
import Popup from './popup';
import useOnClickOutside from '../../hooks/hooks';
import { RootState } from '../../store/reducers';

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
	const node = useRef<HTMLDivElement>(null);
	useOnClickOutside(node, ():void => closeBurger());
	const quantity = useSelector((state:RootState) => state.data.cart?.quantity);
	return (
		<div className={isActive ? `${header.burger} ${header.activate}` : header.burger} ref={node}>
			<Link to='/cart' className={`${header.basket} ${header.button__header}`}><span className={header.quantity}>{quantity}</span></Link>
			{/* <HeaderButton className={header.basket}><span className={header.quantity}>{quantity}</span></HeaderButton> */}
			<div className={isActive ? `${header.nav__button} ${header.activate}` : header.nav__button} role='presentation' onClick={toggleBurger}>
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
