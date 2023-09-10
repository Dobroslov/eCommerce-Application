import { ICart } from '../utils/types';
import { DataAction, DataActionTypes } from './actions';

type DataState = {
  cart: ICart | null | undefined;
};

const initialState: DataState = {
	cart: null,
};

function dataReducer(state = initialState, action:DataAction): DataState {
	switch (action.type) {
		case DataActionTypes.AddCartData:
			return {
				...state,
				cart: action.payload,
			};

		default:
			return state;
	}
}
export default dataReducer;
