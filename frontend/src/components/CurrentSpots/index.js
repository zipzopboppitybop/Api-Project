import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots';


const CurrentSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots.Spots);
    const spot = useSelector(state => state.spots.singleSpot);
    const { id } = useParams();

    const updateSpot = (e) => {
        e.stopPropagation();
        e.preventDefault()
        alert("Function Coming Soon")
    }

    const deleteSpot = (e) => {
        e.stopPropagation();
        e.preventDefault()
        return dispatch(spotActions.deleteSpot(id));
    }

    useEffect(() => {
        dispatch(spotActions.getOneSpot(id));
    }, [dispatch])

    useEffect(() => {
        dispatch(spotActions.getUserSpots());
    }, [dispatch,]);



    return (

        <div className='bruh'>
            <h1 className='user-title'>Manage Your Spots</h1>
            <h3 className='user-title create'>
                <NavLink className={"white"} to={"/spots/new"}>
                    Create a New Spot
                </NavLink>
            </h3>
            <ul className='spots'>
                {spots?.map(({ id, previewImage, city, state, price, avgRating }) => (
                    <li className='spot' key={id}>
                        <NavLink to={`/spots/${id}`}>
                            <img className='spot-image' src={`${previewImage}`} />
                            <div className='spot-description'>
                                <div>{city}, {state}</div>
                                <div>{Number.parseFloat(avgRating).toFixed(2)}</div>
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
