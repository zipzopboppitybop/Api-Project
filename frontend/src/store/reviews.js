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

export const createReview = (spotId, review) => ({
    type: CREATE_REVIEW,
    payload: { spotId, review }
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
    const response = await csrfFetch(`/api/spots/${payload.spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.vals)
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
    let newState;
    switch (action.type) {
        case DETAILS_SPOT_REVIEWS:
            newState = { ...state, spot: { ...state.spot } };
            console.log(action.spot)
            action.spot.Reviews.forEach((review) => newState.spot[review.id] = review);
            return newState;
        case CURRENT_USER_REVIEWS:
            return { ...state, userReviews: { ...action.reviews } };
        case CREATE_REVIEW:
            return {
                ...state,
                spot: {
                    [action.review]: action.review
                }
            };
        case DELETE_REVIEW:
            newState = { ...state };
            delete newState.review[action.review];
            return newState;
        default:
            return state;
    }
}

function normalizeData(dataArr) {
    let newObj = {};
    dataArr.forEach(element => {
        newObj[element.id] = element;
    });

    return newObj;
}

export default reviewReducer;
