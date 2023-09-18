import { SearchAction, SearchActionTypes } from './actions';

type SearchState = {
    search: boolean | null | undefined;
};

const initialState:SearchState = {
    search: null,
};

function searchReducer(state = initialState, action: SearchAction) {
    switch (action.type) {
        case SearchActionTypes.ShowSearch:
            return {
                ...state,
                search: true,
            };
        case SearchActionTypes.HideSearch:
            return {
                ...state,
                search: false,
            };
        default:
            return state;
    }
}
export default searchReducer
