import React from 'react'
import { Link } from 'react-router-dom'

function NavLink(prop) {
    return (
        <Link to={prop.link} className="list-group-item list-group-item-action text-start mb-2">
            <i className={prop.icon}></i> {prop.name}
        </Link>
    )
}

export default NavLink