import { Navigate } from 'react-router-dom'
import styles from './login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { SIGNIN_REQUEST } from '../../store/reducer/user/userActionTypes';
import LoginForm from './form/LoginForm';

export default function Login() {
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.user)

    if (user) {
        return (<Navigate to={"/home"}></Navigate>)
    }

    const handleSubmit = (data) => {
        dispatch({
            type: SIGNIN_REQUEST, payload: data
        })
    }

    return (
        <div className={styles['container']}>
            <div className={`card col-3 shadow ${styles['login-card']}`}>
                <div className="card-body">
                    <LoginForm handleSubmit={handleSubmit} isLoading={loading}></LoginForm>
                </div>
            </div >
        </div >
    )
}

