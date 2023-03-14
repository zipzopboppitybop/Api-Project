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
                {spots?.map(({ id, name, previewImage, price, avgRating }) => (
                    <li className='spot' key={id}><NavLink to={`/spots/${id}`}><img className='spot-image' src={`${previewImage}`} />{name}, {price}, {avgRating}</NavLink></li>
                ))}
            </ul>
        </div>
    )
}

export default SpotList;
