import validate from './validateValue';

test('Валидация', () => {
	expect(validate(50)).toBe(true);
});
