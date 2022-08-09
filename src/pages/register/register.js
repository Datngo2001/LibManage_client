import { useContext, useState } from 'react'
import { register } from '../../api/auth'
import LoadingContext from '../../context/LoadingContext';
import { useNavigate } from 'react-router-dom'
import styles from './register.module.css'
import { useDispatch } from 'react-redux';
import { REGISTER_REQUEST } from '../../store/reducer/user/userActionTypes';

export default function Register() {
  const dispatch = useDispatch()
  // const { user } = useSelector(state => state.user)
  const setLoading = useContext(LoadingContext);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const renderNotMatch = () => {
    if (inputs.password !== inputs.repeatPassword) {
      console.log('ok')
      return (<span style={{ 'color': 'red' }}>Password not match</span>)
    } else {
      return (<span></span>)
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)

    dispatch({
      type: REGISTER_REQUEST,
      payload: {
        username: inputs.username,
        password: inputs.password
      }
    })

    navigate('/login');
    setLoading(false);
  }

  return (
    <div className={styles["container"]}>
      <div className={`card col-3 shadow ${styles["register-card"]}`}>
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
            <div className="mb-3">
              <label htmlFor="repeatPasswordInput" className="form-label">Repeat Password</label>
              <input name='repeatPassword' type="password" className="form-control" id="repeatPasswordInput" value={inputs.repeatPassword || ""} onChange={handleChange} />
              {renderNotMatch()}
            </div>
            <button type="submit" className="btn btn-primary">SignIn</button>
          </form>
        </div>
      </div>
    </div>
  )
}