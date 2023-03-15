// frontend/src/store/spots.js
import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const DETAILS_SPOT = 'spots/DETAILS_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const getDetailsOfSpot = spot => ({
    type: DETAILS_SPOT,
    spot
});

export const CreateASpot = newSpot => ({
    type: CREATE_SPOT,
    newSpot
})

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const spots = await response.json();
    dispatch(loadSpots(spots));
}

export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(getDetailsOfSpot(spot));
    }
};

export const createSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(CreateASpot(newSpot));
        return newSpot
    }
}

const initialState = { allSpots: {}, singleSpot: {} };
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SPOT:
            return { ...state, singleSpot: [...state.singleSpot, action.newSpot] }
        case LOAD_SPOTS:
            return { ...state, allSpots: { ...action.spots } };
        case DETAILS_SPOT:
            return {
                ...state, singleSpot: { ...action.spot }
            };
        default:
            return state;
    }
}

export default spotReducer;
