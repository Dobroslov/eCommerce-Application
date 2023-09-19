/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	DeleteProductForCart,
	addPromoCode,
	changeQuantityProductForCart,
	clearCart,
	getCart,
} from '../../services/apiServices';
import { IProductCart } from '../../utils/types';
import SubmitButton from '../../components/buttons/submitButton';

import style from './cart.module.scss';
import CART from '../../../public/assets/svg/basket.svg';
import store from '../../store/store';
import { addValue } from '../../store/actions';
import { RootState } from '../../store/reducers';
import Spinner from '../../components/spinner/spinner';

function CartPage() {
	const [products, setProducts] = useState<IProductCart[]>([]);
	const [total, setTotal] = useState<string>('');
	const [discountPrice, setdiscountPrice] = useState<string>('');
	const [currency, setCurrency] = useState<string>('');
	const [percent, setPercent] = useState<number>();
	const [isLoadingProducts, setIsLoadingProducts] = useState(true);

	const couponInput = useRef<HTMLInputElement | null>(null);
	const value = useSelector((state: RootState) => state.value?.value);
	useEffect(() => {
		getCart().then((data) => {
			if (!data) {
				setProducts([]);
				setIsLoadingProducts(false);
				return;
			}
			store.dispatch(addValue(data.totalQuantity as unknown as number));
			setProducts(data.productArr);
			setTotal(data.totalPrice);
			setdiscountPrice(data.totalDiscount);
			setCurrency(data.currencyCode);
			setPercent(data.discountProcent);
			setIsLoadingProducts(false);
		});
	}, [value]);

	const handlePlus = (valuePlus: number, id: string) => {
		const newValue = valuePlus + 1;
		store.dispatch(addValue(valuePlus - 1));
		changeQuantityProductForCart(id, newValue);
	};

	const handleMinus = (valueMinus: number, id: string) => {
		const newValue = valueMinus - 1;
		store.dispatch(addValue(newValue));
		changeQuantityProductForCart(id, newValue);
	};

	const handleRemoveItem = (productId: string) => {
		store.dispatch(addValue(+productId));
		DeleteProductForCart(productId);
	};

	const handleClearCart = (clearProducts: IProductCart[]) => {
		store.dispatch(addValue(clearProducts.length + 10));
		clearCart(clearProducts);
	};

	const handlePromocode = () => {
		if (couponInput.current) {
			const promocode = couponInput.current?.value;
			addPromoCode(promocode).then((response) => {
				if (response) {
					store.dispatch(addValue(+response.totalDiscount));
					setPercent(response.discountProcent);
				}
			});
		}
	};

	return (
		<div className={style.cart}>
			{isLoadingProducts ? (
				<Spinner />
			) : products.length > 0 ? (
				<>
					<h4 className={style.cartTitle}>Shopping Cart</h4>
					<div className={style.body}>
						<div className={style.cartList}>
							{products.map((product) => (
								<div key={product.id} className={style.product}>
									<div>
										<img src={product.image} alt='' />
										<div className={style.productBody}>
											<div className={style.productInfo}>
												<div className={style.productName}>{product.name}</div>
												<div className={style.productDescription}>
													Metall: {product.metall} / Weight: {product.weight}g
												</div>
												<div className={style.price}>
													<div>
														{+product.totalPrice / product.quantity === +product.totalPrice
															? `${(+product.totalPrice / product.quantity).toFixed(2)} ${product.currencyCode
															}`
															: `${(+product.totalPrice / product.quantity).toFixed(2)}
														${product.currencyCode} / Total : ${product.totalPrice} ${product.currencyCode}`}
													</div>
													<div className={style.lineThrough}>
														{+product.totalPrice / product.quantity === Number(product.price)
															? ''
															: `${product.price} ${product.currencyCode}`}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className={style.buttons}>
										<div className={style.counter}>
											<button
												onClick={() => handleMinus(product.quantity, product.id)}
												type='button'
											>
												-
											</button>
											<input onChange={() => 0} type='number' value={product.quantity} />
											<button
												onClick={() => handlePlus(product.quantity, product.id)}
												type='button'
											>
												+
											</button>
										</div>
										<button
											onClick={() => handleRemoveItem(product.id)}
											type='button'
											className={style.deleteButton}
										>
											✖
										</button>
									</div>
								</div>
							))}
							<div className={style.clearСart}>
								<SubmitButton onClick={() => handleClearCart(products)} value='CLEAR CART' />

								<div className={style.coupon}>
									<div className={style.inputBody}>
										<div className={style.inputSearch}>
											<input
												ref={couponInput}
												className={style.input}
												type='text'
												placeholder='Coupon code'
											/>
										</div>
										<i className={style.underline} />
									</div>
									<SubmitButton onClick={() => handlePromocode()} value='APPLY COUPON' />
								</div>
							</div>
						</div>
						<div className={style.cartTotal}>
							<p className={style.totalTitle}>Cart totals</p>
							<div className={style.totalPrice}>
								<p>TOTAL</p>
								<div>
									{discountPrice === total ? (
										`${total} ${currency}`
									) : (
										<div className={style.discount}>
											<p>{`${discountPrice} ${currency}`}</p>
											<p className={style.lineThrough}>{`${total} ${currency}`}</p>
											<span className={style.discountPercent}>-{percent}%</span>
										</div>
									)}
								</div>
							</div>
							<SubmitButton value='PROCEED TO CHECKOUT' />
						</div>
					</div>
				</>
			) : (
				<div className={style.empty}>
					<img className={style.emptyImage} src={CART} alt='' />
					<p className={style.addSomeProducts}>Your cart is currently empty!</p>
					<Link to='/shop' className={style.button}>
						<SubmitButton value='Go to catalog' />
					</Link>
				</div>
			)}
		</div>
	);
}

export default CartPage;
