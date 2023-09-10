import { ICart } from '../utils/types';
import { DataAction, DataActionTypes } from './actions';

type DataState = {
  data: ICart | null | undefined;
};

const initialState: DataState = {
	data: null,
};

function dataReducer(state = initialState, action:DataAction): DataState {
	switch (action.type) {
		case DataActionTypes.AddCartData:
			return {
				...state,
				data: action.payload,
			};

		default:
			return state;
	}
}
export default dataReducer;
