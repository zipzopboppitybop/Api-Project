import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as bookingActions from "../../store/bookings";
import * as spotActions from "../../store/spots"

function DeleteBooking({ booking }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const id = booking.id

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal()
    await dispatch(bookingActions.deleteABooking(id));
    await dispatch(bookingActions.getCurrentUserBookings())
    await dispatch(spotActions.getOneSpot(booking.spotId));
    return await dispatch(bookingActions.getBookingsSpot(booking.spotId));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="delete-header">Confirm Delete</h1>
        <h3 className="delete-header">Are you sure you want to delete this booking?</h3>
        <button className="delete-button" type="submit">Yes (Delete Booking) </button>
        <button className="dont-delete-button" onClick={closeModal}>No (Keep Booking)</button>
      </form>
    </>
  );
}

export default DeleteBooking;
