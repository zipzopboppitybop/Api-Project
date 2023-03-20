import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import DeleteForm from '../DeleteModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateSpot from '../UpdateSpot';

const CurrentSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.userSpots?.Spots);
    const allSpots = useSelector(state => state.spots.allSpots?.Spots)
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    let spotsArr;
    let allSpotsArr;

    if (!user) history.push('/');

    if (spots) {
        spotsArr = Object.values(spots);
    }

    if (allSpots) {
        allSpotsArr = Object.values(allSpots);
    }

    const hiddenClassName = spotsArr?.length < 1 ? "white" : "hidden";
    const createhiddenClassName = spotsArr?.length < 1 ? "create user-title" : "hidden";

    const updateSpot = (e) => {
        e.preventDefault();
        alert("Function Coming Soon");
    }

    useEffect(() => {
        dispatch(spotActions.getUserSpots());
    }, [dispatch, spotsArr]);

    if (!spots) return null
    return (

        <div className='bruh'>
            <h1 className='user-title'>Manage Your Spots</h1>
            <h3 className={createhiddenClassName}>
                <NavLink className={hiddenClassName} to={"/spots/new"}>
                    Create a New Spot
                </NavLink>
            </h3>
            <ul className='spots'>
                {spotsArr?.map(({ id, previewImage, city, state, price, avgRating }) => (
                    <li className='spot' key={id}>
                        <NavLink to={`/spots/${id}`}>
                            <img className='spot-image' src={`${previewImage}`} />
                            <div className='spot-description'>
                                <div>{city}, {state}</div>
                                <div><i className='fas fa-star' />{Number.parseFloat(avgRating).toFixed(2)}</div>
                            </div>
                            <div className='spot-description little'>
                                ${price} night
                            </div>
                        </NavLink>
                        <div className='flex spot-description'>
                            <span className='please'>                                            <NavLink id={id} className={"menu-item end joke"} to={`/spots/${id}/edit`}>
                                Update
                            </NavLink></span>
                            <span>
                                <OpenModalMenuItem
                                    onClick={(e) => e.preventDefault()}
                                    itemText={"Delete"}
                                    modalComponent={<DeleteForm id={id} />}
                                />
                            </span>

                        </div>
                    </li>
                ))}
            </ul>

        </div>

    )
}

export default CurrentSpots;
