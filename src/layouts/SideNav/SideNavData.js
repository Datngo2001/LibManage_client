const navData = [
    {
        name: 'Home',
        icon: ['fa-solid', 'fa-home'],
        link: '/'
    },
    {
        groupName: 'System management',
        icon: ['fa-solid', 'fa-computer'],
        navLinks: [
            {
                name: 'User Management',
                icon: ['fa-solid', 'fa-user'],
                link: '/usermanage'
            },
            {
                name: 'Group Management',
                icon: ['fa-solid', 'fa-user'],
                link: '/groupmanage'
            }
        ]
    },
    {
        groupName: 'Book Management',
        icon: ['fa-solid', 'fa-book'],
        navLinks: [
            {
                name: 'Book return',
                icon: ['fa-solid', 'fa-tent-arrow-turn-left'],
                link: ''
            }
        ]
    },
]

export default navData