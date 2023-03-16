import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import DeleteForm from '../DeleteModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';


const CurrentSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots.Spots);
    const { id } = useParams();

    const updateSpot = (e) => {
        e.preventDefault()
        alert("Function Coming Soon")
    }

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
                            </div>
                        </NavLink>
                        <div className='flex spot-description'>
                            <span className='end' onClick={updateSpot}>Update</span>
                            <OpenModalMenuItem
                                onClick={(e) => e.preventDefault()}
                                itemText={"Delete"}
                                modalComponent={<DeleteForm id={id} />}
                            />
                        </div>
                    </li>
                ))}
            </ul>

        </div>

    )
}

export default CurrentSpots;
