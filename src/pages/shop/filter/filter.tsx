/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import style from './filter.module.scss';
import DefaultInput from '../../../components/inputs/defaultInput';
import SubmitButton from '../../../components/buttons/submitButton';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

interface Ifilter {
	resultArray: string[];
	metallProperty: string[];
	metallValue: string[];
	stoneProperty: string[];
	stoneValue: string[];
	addMetallProperty(property: string): void;
	removeMetallProperty(property: string): void;
	addMetallValue(property: string): void;
	removeMetallValue(property: string): void;
	addStoneProperty(property: string): void;
	removeStoneProperty(property: string): void;
	addStoneValue(property: string): void;
	removeStoneValue(property: string): void;
}

const filterObject: Ifilter = {
	resultArray: [],
	metallProperty: [],
	metallValue: [],
	stoneProperty: [],
	stoneValue: [],

	addMetallProperty(string) {
		const property = string.split(' ');
		if (this.metallProperty.length < 1) {
			this.metallProperty.push(property[0]);
		}
		console.log(this.metallProperty);
	},

	removeMetallProperty(string) {
		const property = string.split(' ');
		const index = this.metallProperty.indexOf(property[0]);
		if (index > -1) {
			this.metallProperty.splice(index, 1);
		}
		console.log(this.metallProperty);
	},

	addMetallValue(string) {
		const value = string.split(' ');
		if (this.metallValue.indexOf(value[1]) === -1) {
			this.metallValue.push(value[1]);
		}
		console.log(this.metallValue);
	},

	removeMetallValue(string) {
		const value = string.split(' ');
		const index = this.metallValue.indexOf(value[1]);
		if (index > -1) {
			this.metallValue.splice(index, 1);
		}
		console.log(this.metallValue);
	},

	addStoneProperty(string) {
		const property = string.split(' ');
		if (this.stoneProperty.length < 1) {
			this.stoneProperty.push(property[0]);
		}
		console.log(this.stoneProperty);
	},

	removeStoneProperty(string) {
		const property = string.split(' ');
		const index = this.stoneProperty.indexOf(property[0]);
		if (index > -1) {
			this.stoneProperty.splice(index, 1);
		}
		console.log(this.stoneProperty);
	},
	addStoneValue(string) {
		const value = string.split(' ');
		if (this.stoneValue.indexOf(value[1]) === -1) {
			this.stoneValue.push(value[1]);
		}
		console.log(this.stoneValue);
	},

	removeStoneValue(string) {
		const value = string.split(' ');
		const index = this.stoneValue.indexOf(value[1]);
		if (index > -1) {
			this.stoneValue.splice(index, 1);
		}
		console.log(this.stoneValue);
	},
};

interface ISort {
	onValueChange: (value: string) => void;
}

export default function Filter(props: ISort): React.ReactElement {
	const { onValueChange } = props;
	const [value, setValue] = useState<number[]>([30, 1200]);
	const [sort, setSorting] = useState<string>('&createdAt+desc');

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
		const priceRange = `&filter=variants.price.centAmount:range (${value[0]} to ${value[1]})`;
		const metallValues = filterObject.metallValue.join(',');
		const stoneValues = filterObject.stoneValue.join(',');
		const result = filterObject.resultArray.concat(
			filterObject.metallProperty,
			metallValues,
			filterObject.stoneProperty,
			stoneValues,
			priceRange,
			sort,
		);
		onValueChange(result.join(''));
		console.log(result.join(''));
	};

	return (
		<div className={style.filter}>
			<div className={style.search}>
				<DefaultInput placeholder='Search...' type='text' id='1' />
			</div>
			<select onChange={handleSortChange} className={style.select} name='Sort' id=''>
				<option value='&createdAt+desc'>Sort by newest</option>
				<option value='&createdAt+asc'>Sort by latest</option>
				<option value='&name.en-Us+asc'>Sort from A to Z</option>
				<option value='&name.en-Us+desc'>Sort from Z to A</option>
				<option value='&price+desc'>Sort by price: high to low</option>
				<option value='&price+asc'>Sort by price: low to high</option>
			</select>
			<ReactSlider
				className={style.slider}
				defaultValue={[30, 1200]}
				max={1200}
				min={30}
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
			<p>Metall</p>
			<div className={style.inputTitle}>
				<label htmlFor='metall'>
					gold
					<input
						onChange={handleCheckbox}
						value='&filter=variants.attributes.metall: "gold"'
						type='checkbox'
						name='metall'
						id='gold'
					/>
				</label>
				<label htmlFor='metall'>
					silver
					<input
						onChange={handleCheckbox}
						value='&filter=variants.attributes.metall: "silver"'
						type='checkbox'
						name='metall'
						id='silver'
					/>
				</label>
			</div>
			<p>Stones</p>
			<div className={style.inputTitle}>
				<label htmlFor='stone'>
					with stones
					<input
						type='checkbox'
						onChange={handleCheckbox}
						value='&filter=variants.attributes.stone: true'
						name='stone'
						id='wstone'
					/>
				</label>
				<label htmlFor='stone'>
					no stones
					<input
						type='checkbox'
						onChange={handleCheckbox}
						value='&filter=variants.attributes.stone: false'
						name='stone'
						id='nstone'
					/>
				</label>
			</div>
			<SubmitButton onclick={handleApplyFilters} value='Apply filters' />
		</div>
	);
}
