import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useOnClickOutside from '../../hooks/hooks';
import header from './header.module.scss';
import Navigation from './navigation';
// import HeaderButton from '../../components/buttons/headerButton';
import SearchForm from './searchForm';
import { RootState } from '../../store/reducers';

function Menu(): React.JSX.Element {
	const [active, setToggle] = useState(false);
	// const toggleSearch = ():void => {
	// 	setToggle(!active);
	// };
	const closeSearch = (): void => {
		if (active) {
			setToggle(!active);
		}
	};
	const quantity = useSelector((state:RootState) => {
		console.log(state.data.cart?.total);
		return state.data.cart?.quantity;
	},
	);
	const node = useRef<HTMLDivElement>(null);
	useOnClickOutside(node, (): void => closeSearch());
	return (
		<div className={header.menu} ref={node}>
			<Navigation />
			<div className={header.cards}>
				{/* <HeaderButton area-label='Search' className={`${header.search} ${header.button__header}`} onClick={toggleSearch} /> */}
				<Link to='/cart' className={`${header.basket} ${header.button__header}`}><span className={header.quantity}>{quantity}</span></Link>
				{/* <HeaderButton area-label='Basket' className={`${header.basket} ${header.button__header}`}><span className={header.quantity}>{quantity}</span></HeaderButton> */}
				<Link to='/account_page' className={`${header.profile} ${header.button__header}`} />
				{/* <HeaderButton area-label='Profile' className={`${header.profile} ${header.button__header}`} /> */}
			</div>
			<SearchForm className={active ? `${header.search__form} ${header.open}` : header.search__form} />
		</div>
	);
}
export default Menu;
