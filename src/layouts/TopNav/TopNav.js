import React, { useContext } from 'react'
import LoginRegister from '../../components/LoginRegister/LoginRegister';
import ProfileDropdown from '../../components/ProfileDropdown/ProfileDropdown'
import SideNav from '../SideNav/SideNav'
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { logout } from '../../api/auth'
import LoadingContext from '../../context/LoadingContext';
import { useNavigate } from 'react-router-dom'

function TopNav() {
    const { user, setUser } = useContext(UserContext);
    const setLoading = useContext(LoadingContext);
    const navigate = useNavigate();

    var loggedin
    if (user.username) {
        loggedin = true
    } else {
        loggedin = false
    }

    const handleOnClick = () => {
        setLoading(true)
        logout().then(res => {
            setLoading(false)
            if (res.message === 'logout') {
                navigate('/home');
                setUser({})
            }
        })
    }

    var profileElement;
    if (loggedin) {
        profileElement = (<ProfileDropdown handleOnClick={handleOnClick}></ProfileDropdown>)
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
                    <Link to={'/'} className="navbar-brand text-center">UTE Library</Link>
                </div>
                {profileElement}
            </div>
            <SideNav></SideNav>
        </nav>
    )
}

export default TopNav