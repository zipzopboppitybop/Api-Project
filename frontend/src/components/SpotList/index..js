import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SingleSpot from '../SingleSpot';

const SpotList = () => {
    const dispatch = useDispatch();

    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    return (
        <div className='bruh'>
            <ul className='spots'>
                {spots[0].map(({ id, name, previewImg, price, avgRating }) => (
                    <li className='spot' key={id}><NavLink to={`/spots/${id}`}><img className='spot-image' src={`${previewImg}`} />{name}, {price}, {avgRating}</NavLink></li>
                ))}
            </ul>
        </div>
    )
}

export default SpotList;
