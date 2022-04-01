import React from 'react'
import SideNav from '../SideNav/SideNav'

function TopNav() {
    return (
        <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sideNav" aria-controls="sideNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Offcanvas navbar</a>
            </div>
            <SideNav></SideNav>
        </nav>
    )
}

export default TopNav