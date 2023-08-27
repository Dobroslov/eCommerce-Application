import { IProduct } from '../utils/types';
import { DataAction, DataActionTypes } from './actions';

type DataState = {
  data: IProduct[] | null | undefined;
};

const initialState: DataState = {
	data: [],
};

function dataReducer(state = initialState, action:DataAction): DataState {
	switch (action.type) {
		case DataActionTypes.AddProducts:
			return {
				...state,
				data: action.payload,
			};

		default:
			return state;
	}
}
export default dataReducer;
