import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';


const SpotList = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const spotsObj = useSelector(state => state.spots.entries.Spots);
    console.log(spotsObj)

    useEffect(() => {
        dispatch(getAllSpots());
        setIsLoaded(true)
    }, [dispatch]);

    if (!isLoaded) return null
    return (
        <div className='bruh'>
            <ul className='spots'>
                {spotsObj.map(({ id, name, previewImg, price, avgRating }) => (
                    <li className='spot' key={id}><NavLink to={`/spots/${id}`}><img className='spot-image' src={`${previewImg}`} />{name}, {price}, {avgRating}</NavLink></li>
                ))}
            </ul>
        </div>
    )
}

export default SpotList;
