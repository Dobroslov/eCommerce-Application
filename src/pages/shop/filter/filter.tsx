/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import style from './filter.module.scss';
import DefaultInput from '../../../components/inputs/defaultInput';
import SubmitButton from '../../../components/buttons/submitButton';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

interface Ifilter {
	filterString: string[];
	addNewProperty(property: string): void;
	removeProperty(property: string): void;
}

const filterObject: Ifilter = {
	filterString: [],

	addNewProperty(property) {
		this.filterString.push(property);
		console.log(this.filterString);
	},

	removeProperty(property) {
		const index = this.filterString.indexOf(property);
		if (index > -1) {
			this.filterString.splice(index, 1);
		}
		console.log(this.filterString);
	},
};

interface ISort {
	onValueChange: (value: string) => void;
}

export default function Filter(props: ISort): React.ReactElement {
	const { onValueChange } = props;
	const [value, setValue] = useState<number[]>([30, 1200]);
	const [sort, setSorting] = useState<string>('createdAt+desc');

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newValue = e.target.value;
		onValueChange(newValue);
		setSorting(newValue);
	};

	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked && !filterObject.filterString.includes(e.target.value)) {
			filterObject.addNewProperty(e.target.value);
		} else {
			filterObject.removeProperty(e.target.value);
		}
	};

	const handleApplyFilters = () => {
		filterObject.addNewProperty(sort);
		filterObject.addNewProperty(
			`&filter=variants.price.centAmount:range (${value[0]} to ${value[1]})`,
		);
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
				<label htmlFor='gold'>
					gold
					<input
						onChange={handleCheckbox}
						value='&filter=variants.attributes.metall: "gold"'
						type='checkbox'
						name='gold'
						id='gold'
					/>
				</label>
				<label htmlFor='silver'>
					silver
					<input
						onChange={handleCheckbox}
						value='&filter=variants.attributes.metall: "silver"'
						type='checkbox'
						name='silver'
						id='silver'
					/>
				</label>
			</div>
			<p>Stones</p>
			<div className={style.inputTitle}>
				<label htmlFor='wstone'>
					with stones
					<input
						type='checkbox'
						onChange={handleCheckbox}
						value='&filter=variants.attributes.stone: true'
						name='wstone'
						id='wstone'
					/>
				</label>
				<label htmlFor='nstone'>
					no stones
					<input
						type='checkbox'
						onChange={handleCheckbox}
						value='&filter=variants.attributes.stone: false'
						name='nstone'
						id='nstone'
					/>
				</label>
			</div>
			<SubmitButton onclick={handleApplyFilters} value='Apply filters' />
		</div>
	);
}
