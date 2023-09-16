import React from 'react';
import { IProduct } from '../../utils/types';
import ProductCard from '../productCard/productCard';
import styles from './productCardsList.module.scss';
import Spinner from '../spinner/spinner';

interface IProductListProps {
	products: IProduct[],
	handleProductClick: (id: string) => void
	isLoadingProducts: boolean
}

function ProductCardsList(props: IProductListProps): React.ReactElement {
	const { products, handleProductClick, isLoadingProducts } = props;

	if (isLoadingProducts) {
		return <Spinner />;
	}

	return (
		<ul className={styles.main_products__list} id='products'>
			{products.map((product) => (
				<ProductCard key={product.id} handleProductClick={handleProductClick} {...product} />
			))}
		</ul>

	);
}

export default ProductCardsList;
