import { ValueAction, ValueActionTypes } from './actions';

type ValueState = {
 value: number | null | undefined;
};

const initialState: ValueState = {
	value: null,
};

function valueReducer(state = initialState, action:ValueAction): ValueState {
	switch (action.type) {
		case ValueActionTypes.AddValue:
			return {
				...state,
				value: action.payload,
			};

		default:
			return state;
	}
}
export default valueReducer;
