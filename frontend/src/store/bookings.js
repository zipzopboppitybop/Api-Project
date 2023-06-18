// frontend/src/store/bookings.js
import { csrfFetch } from './csrf';

const DETAILS_SPOT_BOOKINGS = 'bookings/DETAILS_SPOT_BOOKINGS';
const CURRENT_USER_BOOKINGS = 'bookings/CURRENT_USER_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';

export const getSpotBookings = spot => ({
  type: DETAILS_SPOT_BOOKINGS,
  spot
});

export const userBookings = bookings => ({
  type: CURRENT_USER_BOOKINGS,
  bookings
})

export const createBooking = (payload) => ({
  type: CREATE_BOOKING,
  payload
});

export const editABooking = (id, updatedBooking) => ({
  type: UPDATE_BOOKING,
  payload: { id, updatedBooking }
});

export const deleteBooking = booking => ({
  type: DELETE_BOOKING,
  booking
});

export const getBookingsSpot = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}/bookings`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpotBookings(spot));
  }
}

export const getCurrentUserBookings = () => async dispatch => {
  const response = await csrfFetch('/api/bookings/current');

  if (response.ok) {
    const bookings = await response.json();
    dispatch(userBookings(bookings));
    return bookings;
  }
}

export const writeBooking = (payload) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${payload.spotId}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const booking = await response.json();
    dispatch(createBooking(booking));
  } else {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}

export const editBooking = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload.vals)
  })

  if (response.ok) {
    const updateBooking = await response.json();
    dispatch(editABooking(updateBooking));
  } else {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }

}

export const deleteABooking = (id) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    dispatch(deleteBooking(id));
  }
}

const initialState = { spot: {}, usersBookings: {} };

const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case DETAILS_SPOT_BOOKINGS:
      newState = { ...state, spot: {} };
      action.spot.Bookings.forEach((booking) =>
        newState.spot[booking.id] = booking)
        ;
      return newState;
    case CURRENT_USER_BOOKINGS:
      newState = { ...state, usersBookings: {} };
      action.bookings.Bookings.forEach((booking) =>
        newState.usersBookings[booking.id] = booking);
      return newState;
    case CREATE_BOOKING:
      newState = { ...state };
      newState.spot[action.payload.id] = action.payload;
      return newState;
    case UPDATE_BOOKING:
      newState = { ...state };
      newState.spot[action.payload.id] = action.payload;
      return newState
    case DELETE_BOOKING:
      newState = { ...state };
      delete newState.spot[action.booking];
      delete newState.usersBookings[action.booking];
      return newState;
    default:
      return state;
  }
}

export default bookingReducer;
