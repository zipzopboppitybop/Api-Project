import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

const SpotList = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spots.allSpots.Spots);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch,]);

    return (
        <div className='bruh'>
            <ul className='spots'>
                {spots?.map(({ id, name, previewImage, price, avgRating, city, state }) => (
                    <li className='spot' key={id}>
                        <NavLink to={`/spots/${id}`}>
                            <img className='spot-image' src={`${previewImage}`} />
                            <div className='spot-description'>
                                <div>{city}, {state}</div>
                                <div>{Number.parseFloat(avgRating).toFixed(2)}</div>
                            </div>
                            <div className='spot-description little'>
                                ${price} night
                            </div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SpotList;
