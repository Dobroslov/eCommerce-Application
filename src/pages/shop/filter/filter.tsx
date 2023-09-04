/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import style from './filter.module.scss';
import SubmitButton from '../../../components/buttons/submitButton';
import filterObject from './filterObject';
import IMAGE from '../../../../public/assets/svg/search.svg';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

interface ISort {
	onValueChange: (value: string) => void;
}

export default function Filter(props: ISort): React.ReactElement {
	const { onValueChange } = props;
	const [value, setValue] = useState<number[]>([10, 1200]);
	const [sort, setSorting] = useState<string>('&sort=createdAt+desc');
	const [search, setSearch] = useState<string>('');

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newValue = e.target.value;
		setSorting(newValue);
	};

	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			switch (e.target.name) {
				case 'metall':
					filterObject.addMetallProperty(e.target.value);
					filterObject.addMetallValue(e.target.value);
					break;
				case 'stone':
					filterObject.addStoneProperty(e.target.value);
					filterObject.addStoneValue(e.target.value);
					break;
				default:
					console.log(filterObject);
			}
		} else {
			switch (e.target.name) {
				case 'metall':
					filterObject.removeMetallValue(e.target.value);
					if (filterObject.metallValue.length <= 0) {
						filterObject.removeMetallProperty(e.target.value);
					}
					break;
				case 'stone':
					filterObject.removeStoneValue(e.target.value);
					if (filterObject.stoneValue.length <= 0) {
						filterObject.removeStoneProperty(e.target.value);
					}
					break;
				default:
					console.log(filterObject);
			}
		}
	};

	const handleApplyFilters = () => {
		const priceRange = `&filter=variants.price.centAmount:range (${value[0] * 100} to ${
			value[1] * 100
		})`;
		const searchInput = `&text.en-US=${search}`;
		const metallValues = filterObject.metallValue.join(',');
		const stoneValues = filterObject.stoneValue.join(',');
		const result = filterObject.resultArray.concat(
			filterObject.metallProperty,
			metallValues,
			filterObject.stoneProperty,
			stoneValues,
			priceRange,
			sort,
			searchInput,
		);
		if (search.length > 0) {
			onValueChange(result.join(''));
			console.log(result.join(''));
		} else {
			result.pop();
			onValueChange(result.join(''));
		}
	};

	return (
		<div className={style.filter}>
			<div className={style.search}>
				<div className={style.inputBody}>
					<div className={style.inputSearch}>
						<input
							onChange={(e) => setSearch(e.target.value)}
							className={style.input}
							type='text'
							placeholder='Search...'
						/>
						<button onClick={handleApplyFilters} type='button'>
							<img src={IMAGE} alt='search-logo' />
						</button>
					</div>
					<i className={style.underline} />
				</div>
			</div>
			<select onChange={handleSortChange} className={style.select} name='Sort' id=''>
				<option value='&sort=createdAt+desc'>Sort by newest</option>
				<option value='&sort=createdAt+asc'>Sort by latest</option>
				<option value='&sort=name.en-Us+asc'>Sort from A to Z</option>
				<option value='&sort=name.en-Us+desc'>Sort from Z to A</option>
				<option value='&sort=price+desc'>Sort by price: high to low</option>
				<option value='&sort=price+asc'>Sort by price: low to high</option>
			</select>
			<ReactSlider
				className={style.slider}
				defaultValue={[10, 1200]}
				max={1200}
				min={10}
				onChange={(newValue) => setValue(newValue)}
			/>
			<div className={style.price}>
				Price: ${value[0]} - ${value[1]}
			</div>
			<div className={style.onSaleBody}>
				<p>On sale</p>
				<label className={style.switch} htmlFor='sale'>
					<input type='checkbox' name='sale' id='sale' className={style.onSale} />
					<span className={style.slider} />
				</label>
			</div>
			<p className={style.inputTitle}>Metall</p>
			<div className={style.filterProperty}>
				<label className={style.filterAttribute} htmlFor='metall'>
					<input
						onChange={handleCheckbox}
						value='&filter=variants.attributes.metall: "gold"'
						type='checkbox'
						name='metall'
						id='gold'
					/>
					Gold
				</label>
				<label className={style.filterAttribute} htmlFor='metall'>
					<input
						onChange={handleCheckbox}
						value='&filter=variants.attributes.metall: "silver"'
						type='checkbox'
						name='metall'
						id='silver'
					/>
					Silver
				</label>
			</div>
			<p className={style.inputTitle}>Stones</p>
			<div className={style.filterProperty}>
				<label className={style.filterAttribute} htmlFor='stone'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						value='&filter=variants.attributes.stone: true'
						name='stone'
						id='wstone'
					/>
					With stones
				</label>
				<label className={style.filterAttribute} htmlFor='stone'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						value='&filter=variants.attributes.stone: false'
						name='stone'
						id='nstone'
					/>
					No stones
				</label>
			</div>
			<SubmitButton onclick={handleApplyFilters} value='Apply filters' />
		</div>
	);
}
