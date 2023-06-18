// frontend/src/store/reviews.js
import { csrfFetch } from './csrf';

const DETAILS_SPOT_REVIEWS = 'reviews/DETAILS_SPOT_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const CURRENT_USER_REVIEWS = 'reviews/CURRENT_USER_REVIEWS';

export const getSpotReviews = spot => ({
    type: DETAILS_SPOT_REVIEWS,
    spot
});

export const userReviews = reviews => ({
    type: CURRENT_USER_REVIEWS,
    reviews
})

export const createReview = (payload) => ({
    type: CREATE_REVIEW,
    payload
});

export const editAReview = (id, updateReview) => ({
    type: UPDATE_REVIEW,
    payload: { id, updateReview }
});

export const deleteReview = review => ({
    type: DELETE_REVIEW,
    review
});

export const getReviewsSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpotReviews(spot));
    }
}

export const getCurrentUserReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current');

    if (response.ok) {
        const reviews = await response.json();
        dispatch(userReviews(reviews));
        return reviews;
    }
}

export const writeReview = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${payload.vals.spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.vals)
    })

    const review = await response.json();
    dispatch(createReview(review));
}

export const editReview = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.vals)
    })

    const updatedReview = await response.json();
    dispatch(editAReview(updatedReview));
    return updatedReview;
}

export const deleteAReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        dispatch(deleteReview(id));
    }
}

const initialState = { spot: {}, usersReviews: {} };

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case DETAILS_SPOT_REVIEWS:
            newState = { ...state, spot: {} };
            action.spot.Reviews.forEach((review) => newState.spot[review.id] = review);
            return newState;
        case CURRENT_USER_REVIEWS:
            newState = { ...state, usersReviews: {} };
            action.reviews.Reviews.forEach((review) =>
                newState.usersReviews[review.id] = review);
            return newState;
        case CREATE_REVIEW:
            newState = { ...state };
            newState.spot[action.payload.id] = action.payload;
            return newState;
        case UPDATE_REVIEW:
            newState = { ...state };
            newState.spot[action.payload.id.id] = action.payload.id;
            return newState
        case DELETE_REVIEW:
            newState = { ...state };
            delete newState.spot[action.review];
            delete newState.usersReviews[action.review];
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
