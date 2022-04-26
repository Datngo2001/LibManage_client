import { React, useContext } from 'react'
import UserContext from '../../context/UserContext';

function Auth(props) {
    const { user, setUser } = useContext(UserContext);

    console.log(user)
    console.log(props.permissions)

    if (!user.permissionCodes) {
        return <div></div>
    }

    if (!props.permissions) {
        return <div></div>
    };

    const authorizedPer = props.permissions.map(per => {
        if (user.permissionCodes.include(per)) {
            return per;
        }
    });

    if (authorizedPer.length > 0) {
        return (
            <div>
                {props.children}
            </div>
        )
    } else {
        return <div></div>
    }
}

export default Auth