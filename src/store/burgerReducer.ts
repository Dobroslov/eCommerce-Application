import { BurgerAction, BurgerActionTypes } from './actions';

type BurgerState = {
	burger: boolean | null | undefined;
  };

const initialState:BurgerState = {
	burger: null,
};

function burgerReducer(state = initialState, action: BurgerAction) {
	switch (action.type) {
		case BurgerActionTypes.ShowBurger:
			return {
				...state,
				burger: true,
			};
		case BurgerActionTypes.HideBurger:
			return {
				...state,
				burger: false,
			};
		default:
			return state;
	}
}

export default burgerReducer;
