export default function isValidUserAge(birthdate: string): boolean {
	const currentDate = new Date();
	const birthdateDate = new Date(birthdate);
	const thirteenYearsAgo = new Date();
	thirteenYearsAgo.setFullYear(currentDate.getFullYear() - 13);

	return birthdateDate <= thirteenYearsAgo;
}
