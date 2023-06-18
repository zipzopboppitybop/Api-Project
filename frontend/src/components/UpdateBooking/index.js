import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getBookingsSpot, editBooking, getCurrentUserBookings } from "../../store/bookings";
import { getOneSpot } from "../../store/spots";

function UpdateBooking({ disabled, currentBooking }) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let today = `${year}-0${month}-${day}`;
  let tommorrow = `${year}-0${month}-${day + 1}`

  const user = (useSelector(state => state.session.user))
  const bookings = useSelector(state => state.bookings.spot)
  const [startDate, setStartDate] = useState(currentBooking.startDate);
  const [endDate, setEndDate] = useState(currentBooking.endDate);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  let buttonClassName = "booking-submit";
  let buttonDisabled = false;

  const vals = {
    userId: user.id,
    spotId: currentBooking.spotId,
    startDate,
    endDate,
  }

  useEffect(() => {
    dispatch(getOneSpot(currentBooking.spotId));
    dispatch(getBookingsSpot(currentBooking.spotId));
  }, [dispatch]);

  if (startDate > endDate || !startDate || !endDate) buttonClassName = "booking-submit disabled"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validations = {}

    const successBooking = await dispatch(editBooking({ id: currentBooking.id, vals })).catch(
      async (res) => {
        const data = await res.json();

        if (data && data.errors) {
          if (data.errors.startDate) validations.startDate = data.errors.startDate;

          if (data.errors.endDate) validations.endDate = data.errors.endDate;

          return setErrors(validations);
        }
      }
    )
    dispatch(getOneSpot(currentBooking.spotId));
    dispatch(getBookingsSpot(currentBooking.spotId))
    dispatch(getCurrentUserBookings())

  };

  const cancel = (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <>
      <form className="booking-form" onSubmit={handleSubmit} >
        {errors.startDate || errors.endDate ? <p className='error booking-error'>Sorry these dates are booked, please look at the Unavailable Dates to make sure you can book.</p> : ""}

        <h1 >Your trip</h1>
        <div className="select-dates">
          <h2 className="dates-title">Select Dates</h2>
          <div className="dates">
            <div className="start poop">
              Check In
              <input type="date" className="start-input poop" name="trip-start"
                placeholder={currentBooking.startDate.slice(0, 10)}
                onChange={(e) => setStartDate(e.target.value)}
                defaultValue={currentBooking.startDate.slice(0, 10)}
                min={today} />
            </div>
            <div className="start">
              Check Out
              <input type="date" className="start-input " name="trip-end"
                placeholder={currentBooking.endDate.slice(0, 10)}
                onChange={(e) => setEndDate(e.target.value)}
                defaultValue={currentBooking.endDate.slice(0, 10)}
                min={currentBooking.startDate.slice(0, 10)} />
            </div>
          </div>


        </div>
        <p className="dates-stuff">Add your travel dates </p>
        <div className="current-bookings">
          Unavailable Dates:
          <ul className="bookings-list-modal">
            {Object.values(bookings).map(booking => (
              <li key={booking.id} >
                {monthNames[booking.startDate.slice(5, 7) - 1]} {booking.startDate.slice(8, 10)}-{monthNames[booking.endDate.slice(5, 7) - 1]} {booking.endDate.slice(8, 10)}
              </li>
            ))}
          </ul>
        </div>

        <button disabled={buttonDisabled} className={buttonClassName} type="submit">Submit</button>
        <button className="cancel" onClick={cancel}>Cancel</button>
      </form>
    </>
  );
}

export default UpdateBooking;
