import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modalReduser';
import dataReducer from './dataReduser';
import codeReducer from './codeReducer';
import burgerReducer from './burgerReducer';

const rootReducer = combineReducers({
	modal: modalReducer,
	data: dataReducer,
	code: codeReducer,
	burger: burgerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
