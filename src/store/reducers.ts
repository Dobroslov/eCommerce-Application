import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modalReduser';
import dataReducer from './dataReduser';

const rootReducer = combineReducers({
	modal: modalReducer,
	data: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
