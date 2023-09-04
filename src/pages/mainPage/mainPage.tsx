import React, { useEffect, useState } from 'react';
import ProductCardsList from '../../components/productCardsList/productCardsList';
import { IProduct } from '../../utils/types';
// import MAIN_IMAGE from '../../../public/assets/images/main-girl-with-earings.jpg';

import styles from './mainPage.module.scss';
import { getFilter } from '../../services/apiServices';

function MainPage(): React.ReactElement {
	const [products, setProducts] = useState<IProduct[]>([]);
	useEffect(() => {
		getFilter(6, 0, '&sort=createdAt+asc')
			.then((data) => {
				console.log(data);
				if (data) setProducts(data);
			})
			.catch((error) => error);
	}, []);

	function handleProductClick(id: string): void {
		console.log('handleProductClick', id);
	}

	return (
		<>
			<div className={styles.main__img_container}>
				<div className={styles.main__product_card_info}>
					<h2 className={`${styles.title_h1} ${styles.main__title_light}`}>Gold big hoops</h2>
					<h3 className={`${styles.title_h2} ${styles.main__title_light}`}>$ 63.00</h3>
				</div>
			</div>
			<div className={styles.catalog}>
				<div className={styles.catalog__title}>
					<h2 className={`${styles.title_h2} ${styles.catalor__title}`}>Shop The Latest</h2>
					<Link to='/shop' className={`${styles.catalog__link} ${styles.title_h4}`}>View All</Link>
				</div>
				<ProductCardsList
					products={products}
					handleProductClick={handleProductClick}
				/>
			</div>
		</>
	);
}

export default MainPage;
