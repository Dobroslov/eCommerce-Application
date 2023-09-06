import { Ifilter } from '../../../utils/types';

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
	},

	removeMetallProperty(string) {
		const property = string.split(' ');
		const index = this.metallProperty.indexOf(property[0]);
		if (index > -1) {
			this.metallProperty.splice(index, 1);
		}
	},

	addMetallValue(string) {
		const value = string.split(' ');
		if (this.metallValue.indexOf(value[1]) === -1) {
			this.metallValue.push(value[1]);
		}
	},

	removeMetallValue(string) {
		const value = string.split(' ');
		const index = this.metallValue.indexOf(value[1]);
		if (index > -1) {
			this.metallValue.splice(index, 1);
		}
	},

	addStoneProperty(string) {
		const property = string.split(' ');
		if (this.stoneProperty.length < 1) {
			this.stoneProperty.push(property[0]);
		}
	},

	removeStoneProperty(string) {
		const property = string.split(' ');
		const index = this.stoneProperty.indexOf(property[0]);
		if (index > -1) {
			this.stoneProperty.splice(index, 1);
		}
	},
	addStoneValue(string) {
		const value = string.split(' ');
		if (this.stoneValue.indexOf(value[1]) === -1) {
			this.stoneValue.push(value[1]);
		}
	},

	removeStoneValue(string) {
		const value = string.split(' ');
		const index = this.stoneValue.indexOf(value[1]);
		if (index > -1) {
			this.stoneValue.splice(index, 1);
		}
	},
};

export default filterObject;
