// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const createSpotClassName = "create-spot" + (sessionUser ? "" : " hidden");
    const dropdownListItem = 'profile-dropdown-list-item' + (createSpotClassName === "create-spot hidden" ? "" : " up")

    return (
        <ul className='profile-dropdown-list '>
            <>
                <NavLink exact to="/" className='logo'><img style={{ width: 50 }} /> <img className='logo-image' src='https://avatars.githubusercontent.com/u/76932324?s=400&u=8db90b6fa94525934157aaeec9bf095bff217e7c&v=4' />  <span className='title'>briarbnb</span></NavLink>
            </>
            {isLoaded && (
                <>
                    <li className={createSpotClassName}><NavLink className="link" to={"/spots/new"}>Create a New Spot</NavLink></li>
                    <li className={dropdownListItem}>

                        <ProfileButton user={sessionUser} />
                    </li>
                </>
            )}
        </ul>
    );
}

export default Navigation;
