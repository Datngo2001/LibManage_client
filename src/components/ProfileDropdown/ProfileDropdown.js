import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SIGNOUT_REQUEST } from '../../store/reducer/user/userActionTypes';

function ProfileDropdown() {
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.user);

    const navigate = useNavigate()
    if (user == null) {
        navigate('/home')
    }

    const handleOnClick = () => {
        dispatch({ type: SIGNOUT_REQUEST, payload: {} })
    }

    return (
        <div className="dropdown" >
            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {user.username}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                <li><Link to={'profile'} className="dropdown-item">Profile</Link></li>
                <li>
                    {loading ? (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <span className="dropdown-item" onClick={handleOnClick}>Logout</span>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default ProfileDropdown