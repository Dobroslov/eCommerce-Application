import React from 'react';
import { IProductCard } from '../../utils/types';
import ProductCard from '../productCard/productCard';
import styles from './productCardsList.module.scss';

interface IProductListProps {
	products: IProductCard[],
	handleProductClick: (id: number) => void
}

function ProductCardsList(props: IProductListProps): React.ReactElement {
	const { products, handleProductClick } = props;

	return (
		<ul className={styles.main_products__list} id='products'>
			{products.map((product) => (
				<ProductCard key={product.id} handleProductClick={handleProductClick} {...product} />
			))}
		</ul>
	);
}

export default ProductCardsList;
