// frontend/src/store/bookings.js
import { csrfFetch } from './csrf';

const CURRENT_USER_BOOKINGS = 'bookings/CURRENT_USER_BOOKINGS';

export const userBookings = bookings => ({
  type: CURRENT_USER_BOOKINGS,
  bookings
})

export const getCurrentUserBookings = () => async dispatch => {
  const response = await csrfFetch('/api/bookings/current');

  if (response.ok) {
    const bookings = await response.json();
    dispatch(userBookings(bookings));
    return bookings;
  }
}

const initialState = { spot: {}, usersBookings: {} };

const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CURRENT_USER_BOOKINGS:
      newState = { ...state, usersBookings: {} };
      action.bookings.Bookings.forEach((booking) =>
        newState.usersBookings[booking.id] = booking);
      return newState;
    default:
      return state;
  }
}

export default bookingReducer;
