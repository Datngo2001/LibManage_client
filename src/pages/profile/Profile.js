import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'

function Profile() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div></div>
    )
}

export default Profile