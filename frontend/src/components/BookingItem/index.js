import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteBooking from "../DeleteBookingModal";
import UpdateBooking from "../UpdateBooking";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const BookingItem = ({ booking }) => {
  const newDate = new Date(`${booking.createdAt}`);
  const startDate = new Date(`${booking.startDate}`);
  const endDate = new Date(`${booking.endDate}`);
  console.log()
  return (
    <>
      <div className="booking-item">
        <NavLink className="black" title={booking.Spot.name} href="#" to={`/spots/${booking.Spot.id}`}>
          <h2> {booking.Spot.name}</h2>

        </NavLink>
        <p className="review-createdAt">
          {monthNames[newDate.getMonth()]} {newDate.getFullYear()}
        </p>
        {monthNames[startDate.getMonth()] !== monthNames[endDate.getMonth()] ? (
          <p className="booking-times">
            {monthNames[booking.startDate.slice(5, 7) - 1]} {booking.startDate.slice(8, 10)}-{monthNames[booking.endDate.slice(5, 7) - 1]} {booking.endDate.slice(8, 10)}
          </p>
        ) : (
          <p className="booking-times">
            {monthNames[booking.startDate.slice(5, 7) - 1]} {booking.startDate.slice(8, 10)}- {booking.endDate.slice(8, 10)}
          </p>
        )}
        <div className='update-delete-review'>
          <span>
            <OpenModalMenuItem
              onClick={(e) => e.preventDefault()}
              itemText={"Update"}
              modalComponent={<UpdateBooking currentBooking={booking} />}
            />
          </span>
          <span>
            <OpenModalMenuItem
              onClick={(e) => e.preventDefault()}
              itemText={"Delete"}
              modalComponent={<DeleteBooking booking={booking} />}
            />
          </span>
        </div>
      </div>
    </>

  )
}

export default BookingItem;
