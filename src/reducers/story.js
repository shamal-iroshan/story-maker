import {ADD_STORY_DATA} from "../constants/action-types";

const initialState = {
    name: ''
}

function storyReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_STORY_DATA:
            return {
                ...state,
                name: action.payload.name
            };
        default:
            return state;
    }
}

export default storyReducer;