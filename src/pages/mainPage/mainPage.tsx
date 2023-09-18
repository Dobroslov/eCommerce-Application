import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IProduct } from '../../utils/types';
import { addProductForCart, getAnonimousToken, getFilter } from '../../services/apiServices';
import styles from './mainPage.module.scss';
import ProductCardsList from './productCardsList/productCardsList';

function MainPage(): React.ReactElement {
	// localStorage.removeItem('path');
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoadingProducts, setIsLoadingProducts] = useState(true);

	useEffect(() => {
		const localAnonymousToken = localStorage.getItem('anonimous');
		if (!localAnonymousToken) {
			getAnonimousToken().then(() => {
				getFilter(6, 0, '&sort=createdAt+asc')
					.then((data) => {
						if (data) {
							setProducts(data.productsArr);
							setIsLoadingProducts(false);
						}
					})
					.catch((error) => error);
			});
		} else {
			getFilter(6, 0, '&sort=createdAt+asc')
				.then((data) => {
					if (data) {
						setProducts(data.productsArr);
						setIsLoadingProducts(false);
					}
				})
				.catch((error) => error);
		}
	}, []);

	function handleProductClick(id: string): void {
		addProductForCart(id, 1);
	}

	return (
		<>
			<div className={styles.main__img_container}>
				<div className={`${styles.main__promo} title_h3`}>Promo code: gift</div>
				<div className={`${styles.main__promo_secondary} title_h4`}>Order amount more than 1000$ <br /> enter promo code: SALE1000</div>
				<div className={styles.main__product_card_info}>
					<h2 className={`${styles.title_h1} ${styles.main__title_light}`}>Gold big hoops</h2>
					<h3 className={`${styles.title_h2} ${styles.main__title_light}`}>$ 63.00</h3>
				</div>
			</div>
			<div className={styles.catalog}>
				<div className={styles.catalog__title}>
					<h2 className={`${styles.title_h2} ${styles.catalor__title}`}>Shop The Latest</h2>
					<Link to='/shop' className={`${styles.catalog__link} ${styles.title_h2}`}>
						View All
					</Link>
				</div>
				<ProductCardsList products={products} handleProductClick={handleProductClick} isLoadingProducts={isLoadingProducts} />
			</div>
		</>
	);
}

export default MainPage;
