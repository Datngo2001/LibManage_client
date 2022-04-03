import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NavLink(prop) {
    return (
        <Link to={prop.link} className="list-group-item list-group-item-action text-start mb-2 rounded">
            <FontAwesomeIcon icon={prop.icon} /> {prop.name}
        </Link>
    )
}

export default NavLink