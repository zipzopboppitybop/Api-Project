import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import * as bookingActions from '../../store/bookings';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import BookingItem from '../BookingItem';

const CurrentBookings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.usersBookings);
  const user = useSelector(state => state.session.user);

  if (!user) history.push('/');

  useEffect(() => {
    dispatch(bookingActions.getCurrentUserBookings());
  }, [dispatch]);

  return (
    <div className='current-bookings-list'>
      <h1>Manage Bookings</h1>
      {Object.values(bookings).length > 0 ? (
        <ul className='this-list'>
          {Object.values(bookings).map(booking => (
            <li key={booking.id} >
              <BookingItem booking={booking} />
            </li>
          ))}
        </ul>
      ) : (
        <h1>Start Booking Some Spots!</h1>
      )}

    </div>
  )
}

export default CurrentBookings;
