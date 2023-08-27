import { ISorting } from '../utils/types';
import { DataAction, DataActionTypes } from './actions';

type DataState = {
  data: ISorting | null | undefined;
};

const initialState: DataState = {
	data: null,
};

function dataReducer(state = initialState, action:DataAction): DataState {
	switch (action.type) {
		case DataActionTypes.AddSort:
			return {
				...state,
				data: action.payload,
			};

		default:
			return state;
	}
}
export default dataReducer;
