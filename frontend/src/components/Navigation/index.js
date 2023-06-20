// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import image from "../../components/Navigation/images/76932324.png"

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const createSpotClassName = "create-spot" + (sessionUser ? "" : " hidden");
    const dropdownListItem = 'profile-dropdown-list-item' + (createSpotClassName === "create-spot hidden" ? "" : " up")

    return (
        <ul className='profile-dropdown-list '>
            <>
                <NavLink exact to="/" className='logo'><img style={{ width: 50 }} /> <img className='logo-image' src={image} />  <span className='title'>briarbnb</span></NavLink>
            </>
            <>
                <h2 className='footer'>
                    Brian Washington :
                    <a
                        href='https://github.com/zipzopboppitybop'
                        target='_blank'>
                        <i className="fa fa-github about">
                        </i>
                    </a>
                    <a
                        href='https://www.linkedin.com/in/brian-washington-668129244/'
                        target='_blank'>
                        <i className="fa fa-linkedin about">
                        </i>
                    </a>
                </h2>


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
