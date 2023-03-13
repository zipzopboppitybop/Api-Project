// frontend/src/store/spots.js
import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const spots = await response.json();
    dispatch(loadSpots(spots));
}

const initialState = { entries: [] };
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state };
            newState[action.spots.id] = action.spots;
            return newState.undefined
        default:
            return state;
    }
}

export default spotReducer;
