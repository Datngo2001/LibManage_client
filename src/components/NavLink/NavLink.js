import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'

function NavLink(prop) {
    const location = useLocation();
    let isActive = location.pathname.includes(prop.link)


    let style = {}
    if (isActive) {
        style = { "backgroundColor": "#178eeb", "color": "white" }
    }

    return (
        <Link to={prop.link} style={style} className="list-group-item list-group-item-action text-start mb-2 rounded">
            <div>
                <div className='d-inline-block' style={{ "width": "15%" }}><FontAwesomeIcon icon={prop.icon} /></div>
                <div className='d-inline-block'>{prop.name}</div>
            </div>
        </Link>
    )
}

export default NavLink