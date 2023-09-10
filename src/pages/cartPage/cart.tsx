import React, { useEffect, useState } from 'react';
import { changeQuantityProductForCart, getCart } from '../../services/apiServices';
import { IProductCart } from '../../utils/types';
import SubmitButton from '../../components/buttons/submitButton';

import style from './cart.module.scss';

function CartPage() {
	const [products, setProducts] = useState<IProductCart[]>([]);
	const [total, setTotal] = useState<string>('');
	const [currency, setCurrency] = useState<string>('');
	const [value, setValue] = useState<number>(products.length);

	useEffect(() => {
		getCart().then((data) => {
			if (data) {
				setProducts(data.productArr);
				setTotal(data.totalPrice);
				setCurrency(data.currencyCode);
				setValue(data.productArr.length);
			}
		});
	}, [value]);

	const handlePlus = (valuePlus: number, id: string) => {
		const newValue = valuePlus + 1;
		setValue(value + 1);
		changeQuantityProductForCart(id, newValue);
	};
	const handleMinus = (valueMinus: number, id: string) => {
		const newValue = valueMinus - 1;
		setValue(value - 1);
		changeQuantityProductForCart(id, newValue);
	};

	return (
		<div className={style.cart}>
			<h4 className={style.cartTitle}>Shopping Cart</h4>
			<div className={style.body}>
				<div className={style.cartList}>
					{products.map((product) => (
						<div className={style.product}>
							<div>
								<img src={product.image} alt='' />
								<div className={style.productBody}>
									<div className={style.productInfo}>
										<div className={style.productName}>{product.name}</div>
										<div className={style.productDescription}>
											Metall: {product.metall} / Weight: {product.weight}g
										</div>
										<div className={style.price}>
											{product.price} {product.currencyCode}
										</div>
									</div>
								</div>
							</div>
							<div className={style.buttons}>
								<div className={style.counter}>
									<button onClick={() => handleMinus(product.quantity, product.id)} type='button'>
										-
									</button>
									<input type='number' value={product.quantity} />
									<button onClick={() => handlePlus(product.quantity, product.id)} type='button'>
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
						<p>
							{total} {currency}
						</p>
					</div>
					<SubmitButton value='PROCEED TO CHECKOUT' />
				</div>
			</div>
		</div>
	);
}

export default CartPage;
