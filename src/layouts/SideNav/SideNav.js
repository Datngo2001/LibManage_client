import React from 'react'
import GroupNavLink from '../../components/GroupNavLink/GroupNavLink'
import sideNavData from './SideNavData'
import NavLink from '../../components/NavLink/NavLink'

function SideNav() {
    const groups = sideNavData
    const groupElements = groups.map((group, index) => {
        if (group.groupName == undefined) {
            const navLink = group
            return <NavLink key={navLink.name} link={navLink.link} icon={navLink.icon} name={navLink.name}></NavLink>
        } else {
            return <GroupNavLink key={group.groupName} groupId={index} title={group.groupName} icon={group.icon} navLinks={group.navLinks}></GroupNavLink>
        }
    })
    return (
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="sideNav" aria-labelledby="offcanvasScrollingLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Menus</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {groupElements}
            </div>
        </div>
    )
}

export default SideNav
