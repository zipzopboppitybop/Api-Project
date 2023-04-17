import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotItem from '../SpotItem/SpotItem';

const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    console.log(spots)

    return (
        <div className='bruh'>
            <ul className='spots'>
                {Object.values(spots).map(spot => (
                    <li key={spot.id} className='spot-item'>
                        <SpotItem spot={spot} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SpotList;
