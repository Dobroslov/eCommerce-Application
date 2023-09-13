import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modalReduser';
import dataReducer from './dataReduser';
import codeReducer from './codeReducer';
import burgerReducer from './burgerReducer';
import valueReducer from './valueReducer';

const rootReducer = combineReducers({
	modal: modalReducer,
	data: dataReducer,
	code: codeReducer,
	burger: burgerReducer,
	value: valueReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
