import React from 'react'
import GroupNavLink from '../../components/GroupNavLink/GroupNavLink'
import sideNavData from './SideNavData'
import NavLink from '../../components/NavLink/NavLink'
import ScrollView from 'devextreme-react/scroll-view'

function SideNav() {
    const groups = sideNavData
    const groupElements = groups.map((group, index) => {
        if (group.groupName === undefined) {
            const navLink = group
            return <NavLink key={navLink.name} link={navLink.link} icon={navLink.icon} name={navLink.name}></NavLink>
        } else {
            return <GroupNavLink key={group.groupName} groupId={index} title={group.groupName} icon={group.icon} navLinks={group.navLinks}></GroupNavLink>
        }
    })
    return (
        <div className='bg-light p-2' style={{ "height": "100%" }}>
            <ScrollView >
                {groupElements}
            </ScrollView>
        </div>
    )
}

export default SideNav
