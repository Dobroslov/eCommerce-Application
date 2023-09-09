/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { getCart } from '../../services/apiServices';
import { IProductCart } from '../../utils/types';
import SubmitButton from '../../components/buttons/submitButton';

import style from './cart.module.scss';

function CartPage() {
	const localFilter = localStorage.getItem('filter');
	// const localOffset = Number(localStorage.getItem('offset'));
	const [products, setProducts] = useState<IProductCart[]>([]);
	const [total, setTotal] = useState<string>('');
	const [currency, setCurrency] = useState<string>('');
	const [filter] = useState(localFilter || '&sort=createdAt+asc');
	// const [offset] = useState(localOffset || 0);
	const usernameRefs = useRef<MutableRefObject<HTMLInputElement | null>[] | null[]>([]);
	usernameRefs.current = products.map(() => React.createRef());

	const handlePlus = (index: number) => {
		let value = Number(usernameRefs.current[index]?.current?.value);
		usernameRefs.current[index]!.current!.value = `${(value += 1)}`;
	};
	const handleMinus = (index: number) => {
		let value = Number(usernameRefs.current[index]?.current?.value);
		if (value > 1) {
			usernameRefs.current[index]!.current!.value = `${(value -= 1)}`;
		}
	};

	// const handleResult = () => {
	// 	const result: string[] = [];
	// 	products.map((product, index) =>
	// 		result.push(product.id, usernameRefs.current[index]!.current!.value),
	// 	);
	// 	console.log(result);
	// };

	useEffect(() => {
		getCart().then((data) => {
			if (data) {
				setProducts(data.productArr);
				setTotal(data.totalPrice);
				setCurrency(data.currencyCode);
			}
		});
		/*	const localAnonymousToken = localStorage.getItem('anonimous');
			if (!localAnonymousToken) {
				getAnonimousToken().then(() => {
					getFilter(9, offset || localOffset, filter)
						.then((data) => {
							if (data) setProducts(data);
						})
						.catch((error) => error);
				});
			} else {
				getFilter(9, offset || localOffset, filter)
					.then((data) => {
						if (data) setProducts(data);
					})
					.catch((error) => error);
			} */
	}, [filter]);

	return (
		<div className={style.cart}>
			<h4 className={style.cartTitle}>Shopping Cart</h4>
			<div className={style.body}>
				<div className={style.cartList}>
					{products.map((product, index) => (
						<div className={style.product}>
							<div>
								<img src={product.image} alt='' />
								<div className={style.productBody}>
									<div className={style.productInfo}>
										<div className={style.productName}>{product.name}</div>
										<div className={style.productDescription}>Material:{product.metall}/Weight:{product.weight}g</div>
										<div className={style.price}>
											`${product.price} ${product.currencyCode}`
										</div>
									</div>
								</div>
							</div>
							<div className={style.buttons}>
								<div className={style.counter}>
									<button onClick={() => handleMinus(index)} type='button'>
										-
									</button>
									<input
										ref={usernameRefs.current[index]}
										onChange={(e) => e.target.value}
										type='number'
										value={product.quantity}
									/>
									<button onClick={() => handlePlus(index)} type='button'>
										+
									</button>
								</div>
								<button type='button' className={style.deleteButton}>
									✖
								</button>
							</div>
						</div>
					))}
					<div className={style.clearCoupon}>
						<SubmitButton value='CLEAR CART' />
						<div className={style.coupon}>
							<div className={style.inputBody}>
								<div className={style.inputSearch}>
									<input className={style.input} type='text' placeholder='Coupon code' />
								</div>
								<i className={style.underline} />
							</div>
							<SubmitButton value='APPLY COUPON' />
						</div>
					</div>
				</div>
				<div className={style.cartTotal}>
					<p className={style.totalTitle}>Cart totals</p>
					<div className={style.totalPrice}>
						<p>TOTAL</p>
						<p>{total} {currency}</p>
					</div>
					<SubmitButton value='PROCEED TO CHECKOUT' />
				</div>
			</div>
		</div>
	);
}

export default CartPage;
