import React, { useContext } from 'react'
import LoginRegister from '../../components/LoginRegister/LoginRegister';
import ProfileDropdown from '../../components/ProfileDropdown/ProfileDropdown'
import { Link } from 'react-router-dom';
import LoadingContext from '../../context/LoadingContext';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SIGNOUT } from '../../store/reducer/user/userActionTypes';

function TopNav(prop) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user);
    const setLoading = useContext(LoadingContext);
    const navigate = useNavigate();

    const handleOnClick = () => {
        setLoading(true)
        dispatch({ type: SIGNOUT })
    }

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
                    <ProfileDropdown handleOnClick={handleOnClick}></ProfileDropdown>
                ) : <LoginRegister></LoginRegister>}
            </div>
        </nav>
    )
}

export default TopNav