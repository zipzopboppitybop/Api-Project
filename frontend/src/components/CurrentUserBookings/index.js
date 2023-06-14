import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import * as bookingActions from '../../store/bookings';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

const CurrentBookings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.usersBookings);
  const user = useSelector(state => state.session.user);
  let bookingsArr = [];

  if (bookings) {
    let bookingsObj = Object.values(bookings);

    for (let i = 0; i < bookingsObj.length; i++) {
      let booking = bookingsObj[i];

      if (booking.userId === user.id) bookingsArr.push(booking);
    }
  }

  if (!user) history.push('/');

  useEffect(() => {
    dispatch(bookingActions.getCurrentUserBookings());
  }, [dispatch]);

  console.log(bookings)

  return (
    <div className='current-bookings-list'>
      <h1>Manage Bookings</h1>
      <ul>
        {bookingsArr.map(booking => (
          <li key={booking.id} >
            {booking.startDate}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CurrentBookings;
