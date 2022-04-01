import React from 'react'

function GroupNavLink(prop) {
    console.log(prop)
    const navLinkElements = prop.navLinks.map((navLink) => {
        return <a key={navLink.name} href={navLink.link} className="list-group-item list-group-item-action text-start"><i className={navLink.icon}></i> {navLink.name}</a>
    })
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={`heading${prop.groupId}`}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${prop.groupId}`} aria-expanded="true" aria-controls={`collapse${prop.groupId}`}>
                    {prop.title}
                </button>
            </h2>
            <div id={`collapse${prop.groupId}`} className="accordion-collapse collapse show" aria-labelledby={`heading${prop.groupId}`} data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {navLinkElements}
                </div>
            </div>
        </div>
    )
}

export default GroupNavLink