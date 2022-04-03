import React from 'react'
import LoginRegister from '../../components/LoginRegister/LoginRegister';
import ProfileDropdown from '../../components/ProfileDropdown/ProfileDropdown'
import SideNav from '../SideNav/SideNav'

function TopNav() {
    var loggedin = false

    var profileElement;
    if (loggedin) {
        profileElement = (<ProfileDropdown></ProfileDropdown>)
    } else {
        profileElement = (<LoginRegister></LoginRegister>)
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <div className='d-flex justify-content-between' style={{ width: '15%' }}>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sideNav" aria-controls="sideNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand text-center">UTE Library</a>
                </div>
                {profileElement}
            </div>
            <SideNav></SideNav>
        </nav>
    )
}

export default TopNav