import { CodeAction, CodeActionTypes } from './actions';

type CodeState = {
  code: string | null | undefined;
};

const initialState: CodeState = {
	code: null,
};

function codeReducer(state = initialState, action:CodeAction): CodeState {
	switch (action.type) {
		case CodeActionTypes.AddCode:
			return {
				...state,
				code: action.payload,
			};

		default:
			return state;
	}
}
export default codeReducer;
