import React from 'react';
import './navbar.css';
import avatar from '../../assets/avatar.svg'
import { faBars, faClock, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Navbar = ({ sideBarOpen, openSiderbar }) => {
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSiderbar}>
                <i><FontAwesomeIcon icon={faBars}  /></i>
            </div>
            <div className="navbar__left" >
                <a href="#">Subscribers</a>
                <a href="#">Video Management</a>
                <a href="#" className="active_link" >Admin</a>
            </div>
            <div className="navbar__right">
                <a href="#">
                    <i><FontAwesomeIcon icon={faSearch} /></i>
                </a>
                <a href="#">
                    <i><FontAwesomeIcon icon={faClock} /></i>
                </a>
                <a href="#">
                    <img width="30" src={avatar} alt="avatar" />
                </a>
            </div>
        </nav>
    )
}

export default Navbar;