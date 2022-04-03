import React from 'react'
import { Link } from 'react-router-dom'

const LoginRegister = () => {
    return (
        <div className=''>
            <Link to={'/login'} className="btn btn-primary me-1">Login</Link>
            <Link to={'register'} className="btn btn-secondary">Register</Link>
        </div>
    )
}

export default LoginRegister