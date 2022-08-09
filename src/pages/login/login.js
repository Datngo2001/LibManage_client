import { useContext, useState } from 'react'
import LoadingContext from '../../context/LoadingContext';
import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { useDispatch } from 'react-redux';
import { SIGNIN_REQUEST } from '../../store/reducer/user/userActionTypes';

export default function Login() {
    const dispatch = useDispatch()
    const setLoading = useContext(LoadingContext);
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        dispatch({
            type: SIGNIN_REQUEST, payload: {
                username: inputs.username,
                password: inputs.password
            }
        })
        setLoading(false)
    }

    return (
        <div className={styles['container']}>
            <div className={`card col-3 shadow ${styles['login-card']}`}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="usernameInput" className="form-label">Username</label>
                            <input name='username' type="text" className="form-control" id="usernameInput" value={inputs.username || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input name='password' type="password" className="form-control" id="passwordInput" value={inputs.password || ""} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

