const navData = [
    {
        name: 'Home',
        icon: ['fa-solid', 'fa-home'],
        link: '/'
    },
    {
        name: 'Books Browsing',
        icon: ['fa-solid', 'fa-book'],
        link: '/books'
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
                name: 'Books Manage',
                icon: ['fa-solid', 'fa-tent-arrow-turn-left'],
                link: '/booksmanage'
            },
            {
                name: 'Category Manage',
                icon: ['fa-solid', 'fa-tent-arrow-turn-left'],
                link: '/categorymanage'
            }
        ]
    },
]

export default navData