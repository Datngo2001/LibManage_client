import { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/UserContext';
import LoadingContext from '../../context/LoadingContext';
import { useNavigate } from 'react-router-dom'
import { updateUserProfile } from '../../api/user'

export default function ReaderProfile() {
    const { user } = useContext(UserContext);
    const setLoading = useContext(LoadingContext);

    const [isEditing, setEditing] = useState(false);
    const [inputs, setInputs] = useState(
        {
            username: ((user.username) ? user.username : ""),
            fname: ((user.fname) ? user.fname : ""),
            lname: ((user.lname) ? user.lname : "")
        }
    );

    var button;
    if (isEditing) {
        button = (
            <div className='m-auto'>
                <button className='btn btn-primary m-3' type='submit'>Save</button>
                <button className='btn btn-danger m-3' onClick={handleCancel}>Cancel</button>
            </div>
        )
    } else {
        button = (
            <div className='m-auto'>
                <button className='btn btn-primary m-3' onClick={handleEdit}>Edit</button>
            </div>
        )
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        updateUserProfile({
            username: inputs.username,
            password: inputs.password,
            fname: inputs.fname,
            lname: inputs.lname
        }).then(res => {
            setLoading(false)
            if (res.message === 'update') {
                navigate('/profile');
            }
        }).catch(err => {
            setLoading(false)
        })
    }

    function handleEdit(e) {
        e.preventDefault();
        setEditing(value => true)
    }

    function handleCancel(e) {
        e.preventDefault();
        setEditing(value => false)
        setInputs(value => ({
            username: ((user.username) ? user.username : ""),
            fname: ((user.fname) ? user.fname : ""),
            lname: ((user.lname) ? user.lname : "")
        }))
    }

    const renderNotMatch = () => {
        if (inputs.password !== inputs.repeatPassword) {
            console.log('ok')
            return (<span style={{ 'color': 'red' }}>Password not match</span>)
        } else {
            return (<span></span>)
        }
    }

    return (
        <div className="container">
            <h1 className="mb-3">Profile</h1>
            <form className='w-50 m-auto' onSubmit={handleSubmit}>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">Username:</label>
                    <div className="col-sm-12">
                        <input type="text" readOnly={!isEditing} className="form-control" onChange={handleChange} name='username' value={inputs.username}></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">First name:</label>
                    <div className="col-sm-12">
                        <input type="text" readOnly={!isEditing} className="form-control" onChange={handleChange} name='fname' value={inputs.fname}></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">Last name:</label>
                    <div className="col-sm-12">
                        <input type="text" readOnly={!isEditing} className="form-control" onChange={handleChange} name='lname' value={inputs.lname}></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">New Password:</label>
                    <div className="col-sm-12">
                        <input type="password" readOnly={!isEditing} className="form-control" onChange={handleChange} name='password'></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">Confirm password:</label>
                    <div className="col-sm-12">
                        <input type="password" readOnly={!isEditing} className="form-control" onChange={handleChange} name='confirm'></input>
                    </div>
                    {renderNotMatch()}
                </div>
                {button}
            </form>
        </div>
    )
}

