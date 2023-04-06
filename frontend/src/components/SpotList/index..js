import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch,]);

    return (
        <div className='bruh'>
            <ul className='spots'>
                {Object.values(spots).map(({ id, previewImage, price, avgRating, city, state, name }) => (

                    <tooltip title={name} key={id}>
                        <li className='spot' key={id}>
                            <NavLink to={`/spots/${id}`}>
                                <img className='spot-image' src={`${previewImage}`} />
                                <div className='spot-description'>
                                    <div>{city}, {state}</div>
                                    <div>
                                        <i className='fas fa-star' />
                                        {avgRating > 0 ? (Number.parseFloat(avgRating).toFixed(2)) : ("New")}
                                    </div>
                                </div>
                                <div className='spot-description little'>
                                    ${price} night
                                </div>
                            </NavLink>
                        </li>
                    </tooltip>
                ))}
            </ul>
        </div>
    )
}

export default SpotList;
