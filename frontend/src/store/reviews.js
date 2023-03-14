// frontend/src/store/reviews.js
import { csrfFetch } from './csrf';

const DETAILS_SPOT_REVIEWS = 'spots/DETAILS_SPOT_REVIEWS';

export const getSpotReviews = spot => ({
    type: DETAILS_SPOT_REVIEWS,
    spot
});

export const getReviewsSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpotReviews(spot));
    }
}

const initialState = { spot: {} };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAILS_SPOT_REVIEWS:
            return {
                ...state, spot: { ...action.spot }
            };
        default:
            return state;
    }
}

export default reviewReducer;
