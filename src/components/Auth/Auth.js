import { React, useContext } from 'react'
import { useSelector } from 'react-redux';

function Auth(props) {
    const { user } = useSelector(state => state.user);
    if (!user.permissionCodes) {
        return <div></div>
    }

    if (!props.permissions) {
        return <div></div>
    };

    const authorizedPer = props.permissions.map(per => {
        if (user.permissionCodes.includes(per)) {
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