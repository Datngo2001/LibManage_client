import React from 'react'
import GroupNavLink from '../../components/GroupNavLink/GroupNavLink'
import sideNavData from './SideNavData'
import NavLink from '../../components/NavLink/NavLink'
import styles from './sideNav.module.css'

function SideNav({ userPermissions }) {
    const groups = sideNavData
    const groupElements = groups.map((group, index) => {
        if (!isAllowed(group.pers)) {
            return <div key={index}></div>
        }
        if (group.groupName === undefined) {
            const navLink = group
            return <NavLink key={index} link={navLink.link} icon={navLink.icon} name={navLink.name}></NavLink>
        } else {
            return <GroupNavLink key={index} groupId={index} title={group.groupName} icon={group.icon} navLinks={group.navLinks}></GroupNavLink>
        }
    })

    function isAllowed(pers) {
        if (pers.length === 0) {
            return true
        }

        let isAllowed = false
        userPermissions?.forEach(uPers => {
            if (pers.includes(uPers)) isAllowed = true
        });
        return isAllowed
    }

    return (
        <div className={styles['container']}>
            {groupElements}
        </div>
    )
}

export default SideNav
