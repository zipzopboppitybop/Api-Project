import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserSpots } from '../../store/spots';


const CurrentSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots.Spots);

    const updateSpot = (e) => {
        e.stopPropagation();
        e.preventDefault()
        alert("Function Coming Soon")
    }

    const deleteSpot = (e) => {
        e.stopPropagation();
        e.preventDefault()
        alert("Function Coming Soon")
    }

    useEffect(() => {
        dispatch(getUserSpots());
    }, [dispatch,]);

    return (
        <div className='bruh'>
            <ul className='spots'>
                {spots?.map(({ id, previewImage, city, state, price, avgRating }) => (
                    <li className='spot' key={id}>
                        <NavLink to={`/spots/${id}`}>
                            <img className='spot-image' src={`${previewImage}`} />
                            <div className='spot-description'>
                                <div>{city}, {state}</div>
                                <div>{avgRating}</div>
                            </div>
                            <div className='spot-description little'>
                                ${price} night
                                <span className='end' onClick={updateSpot}>Update</span>
                                <span onClick={deleteSpot} className='end'>Delete</span>
                            </div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CurrentSpots;
