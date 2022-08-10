import React from 'react'
import LoginRegister from '../../components/LoginRegister/LoginRegister';
import ProfileDropdown from '../../components/ProfileDropdown/ProfileDropdown'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function TopNav(prop) {
    const { user } = useSelector(state => state.user);

    return (
        <nav className="navbar navbar-dark" style={{ "backgroundColor": "#178eeb", height: "100%" }}>
            <div className="container-fluid">
                <div className='d-flex justify-content-between' style={{ width: '15%' }}>
                    <button className="navbar-toggler " type="button" onClick={prop.tongleSideBar}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to={'/'} className="navbar-brand text-center" style={{ "color": "white", "fontWeight": "bold" }}>UTE Library</Link>
                </div>
                {user ? (
                    <ProfileDropdown></ProfileDropdown>
                ) : <LoginRegister></LoginRegister>}
            </div>
        </nav>
    )
}

export default TopNav