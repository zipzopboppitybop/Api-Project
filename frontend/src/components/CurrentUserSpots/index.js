import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import DeleteForm from '../DeleteModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SpotItem from '../SpotItem/SpotItem';

const CurrentSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.userSpots);
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    let spotsArr = [];
    if (spots) {
        let spotsObj = Object.values(spots);

        for (let i = 0; i < spotsObj.length; i++) {
            let spot = spotsObj[i];

            if (spot.ownerId === user.id) spotsArr.push(spot);
        }
    }

    //console.log(spotsArr);

    if (!user) history.push('/');

    const hiddenClassName = spotsArr?.length < 1 ? "white" : "hidden";
    const createhiddenClassName = spotsArr?.length < 1 ? "create user-title" : "hidden";

    useEffect(() => {
        dispatch(spotActions.getUserSpots());
    }, [dispatch]);

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
                {spotsArr.map(spot => (
                    <li className='spot-item' key={spot.id}>
                        <SpotItem spot={spot}></SpotItem>
                        <div className='flex spot-description'>
                            <span className='please'>
                                <NavLink id={spot.id} className={"menu-item end joke"} to={`/spots/${spot.id}/edit`}>
                                    Update
                                </NavLink></span>
                            <span>
                                <OpenModalMenuItem
                                    onClick={(e) => e.preventDefault()}
                                    itemText={"Delete"}
                                    modalComponent={<DeleteForm id={spot.id} />}
                                />
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default CurrentSpots;
