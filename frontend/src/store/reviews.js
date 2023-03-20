// frontend/src/store/reviews.js
import { csrfFetch } from './csrf';

const DETAILS_SPOT_REVIEWS = 'spots/DETAILS_SPOT_REVIEWS';
const CREATE_REVIEW = 'spots/CREATE_REVIEW'
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

export const createReview = review => ({
    type: CREATE_REVIEW,
    review
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
    const response = await csrfFetch(`/api/spots/${payload}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const review = await response.json();
    dispatch(createReview(review));
}

export const deleteAReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(deleteReview(review));
        return review
    }
}

const initialState = { spot: {} };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAILS_SPOT_REVIEWS:
            return {
                ...state, spot: { ...action.spot }
            };
        case CURRENT_USER_REVIEWS:
            return { ...state, userReviews: { ...action.reviews } };
        case CREATE_REVIEW:
            return {
                ...state,
                spot: {
                    ...state.spot,
                    [action.spot.id]: action.review
                }
            };
        case DELETE_REVIEW:
            const newState = { ...state };
            delete newState.reviews[action.review.id];
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
