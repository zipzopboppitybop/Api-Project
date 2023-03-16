// frontend/src/store/spots.js
import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const DETAILS_SPOT = 'spots/DETAILS_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const USERS_SPOTS = 'USERS_SPOTS';
const DELETE_SPOT = 'DELETE_SPOT';

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const userSpots = (spots) => {
    return {
        type: USERS_SPOTS,
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

export const DeleteASpot = spotId => ({
    type: DELETE_SPOT,
    spotId
})

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const spots = await response.json();
    dispatch(loadSpots(spots));
}

export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');

    if (response.ok) {
        const spots = await response.json();
        dispatch(userSpots(spots));
        return spots;
    }
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

export const deleteSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/spots/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    const spot = response.json();
    dispatch(DeleteASpot(spot));

}

const initialState = { allSpots: {}, singleSpot: {} };
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SPOT:
            return { ...state, singleSpot: [...state.singleSpot, action.newSpot] }
        case LOAD_SPOTS:
            return { ...state, allSpots: { ...action.spots } };
        case USERS_SPOTS:
            return { ...state, allSpots: { ...action.spots } };
        case DETAILS_SPOT:
            return {
                ...state, singleSpot: { ...action.spot }
            };
        case DELETE_SPOT:
            const newState = { ...state };
            delete newState[action.spotId]
            return newState;
        default:
            return state;
    }
}

export default spotReducer;
