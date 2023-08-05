const validate = (num: number) => {
	if (num < 0 || num > 100) {
		return false;
	}
	return true;
};

export default validate;
