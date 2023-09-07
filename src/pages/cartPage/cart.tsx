import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { getAnonimousToken, getFilter } from '../../services/apiServices';
import { IProduct } from '../../utils/types';

import style from './cart.module.scss';

function CartPage() {
	const localFilter = localStorage.getItem('filter');
	const localOffset = Number(localStorage.getItem('offset'));
	const [products, setProducts] = useState<IProduct[]>([]);
	const [filter] = useState(localFilter || '&sort=createdAt+asc');
	const [offset] = useState(localOffset || 0);
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
		const localAnonymousToken = localStorage.getItem('anonimous');
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
		}
	}, [filter]);

	return (
		<div className={style.cart}>
			<h4 className={style.cartTitle}>Shopping Cart</h4>
			<div className={style.body}>
				<div className={style.cartList}>
					{products.map((product, index) => (
						<div className={style.product}>
							<img src={product.image} alt='' />
							<div className={style.productBody}>
								<div className={style.productInfo}>
									<div className={style.productName}>{product.name}</div>
									<div className={style.productDescription}>{product.description}</div>
									<div className={style.price}>
										{' '}
										{product.discount !== 'NaN' ? (
											<>
												{product.discount} {product.currencyCode}{' '}
												<span className={style.lineThrough}>
													{product.price} {product.currencyCode}
												</span>
											</>
										) : (
											`${product.price} ${product.currencyCode}`
										)}
									</div>
								</div>
								<div className={style.counterMobile}>
									<button onClick={() => handleMinus(index)} type='button'>
										-
									</button>
									<input
										ref={usernameRefs.current[index]}
										onChange={(e) => e.target.value}
										type='number'
									/>
									<button onClick={() => handlePlus(index)} type='button'>
										+
									</button>
								</div>
							</div>
							<div className={style.counter}>
								<button onClick={() => handleMinus(index)} type='button'>
									-
								</button>
								<input
									ref={usernameRefs.current[index]}
									onChange={(e) => e.target.value}
									type='number'
								/>
								<button onClick={() => handlePlus(index)} type='button'>
									+
								</button>
							</div>
						</div>
					))}
				</div>
				<div className={style.cartTotal}>
					<p>Cart totals</p>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
