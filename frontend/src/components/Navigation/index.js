// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './images/ABNB-4aaade0f.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const createSpotClassName = "create-spot" + (sessionUser ? "" : " hidden");

    return (
        <ul className='profile-dropdown-list '>
            <>
                <NavLink exact to="/" className='logo'><img style={{ width: 50 }} src={logo} />  <span className='title'>briarbnb</span></NavLink>
            </>
            {isLoaded && (
                <>
                    <li className={createSpotClassName}><NavLink to={"/spots/new"}>Create a New Spot</NavLink></li>
                    <li className='profile-dropdown-list-item'>

                        <ProfileButton user={sessionUser} />
                    </li>
                </>
            )}
        </ul>
    );
}

export default Navigation;
