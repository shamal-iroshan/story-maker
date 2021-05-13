import * as types from '../constants/action-types';

export const addStoryDetails = (data) => {
    return {
        type: types.ADD_STORY_DATA,
        payload: data
    }
}