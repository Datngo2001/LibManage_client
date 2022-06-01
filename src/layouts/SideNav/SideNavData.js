const navData = [
    {
        pers: [],
        name: 'Home',
        icon: ['fa-solid', 'fa-home'],
        link: '/home'
    },
    {
        pers: [],
        name: 'Books Browsing',
        icon: ['fa-solid', 'fa-book'],
        link: '/books'
    },
    {
        pers: [1, 2, 3, 4],
        groupName: 'System management',
        icon: ['fa-solid', 'fa-computer'],
        navLinks: [
            {
                pers: [1, 2, 3, 4],
                name: 'User Management',
                icon: ['fa-solid', 'fa-user'],
                link: '/usermanage'
            },
            {
                pers: [1, 2, 3, 4],
                name: 'Group Management',
                icon: ['fa-solid', 'fa-user'],
                link: '/groupmanage'
            }
        ]
    },
    {
        pers: [5, 6, 7, 8, 9, 10, 11],
        groupName: 'Book Management',
        icon: ['fa-solid', 'fa-book'],
        navLinks: [
            {
                pers: [5, 6, 7, 8, 9, 10, 11],
                name: 'Books Manage',
                icon: ['fa-solid', 'fa-tent-arrow-turn-left'],
                link: '/booksmanage'
            },
            {
                pers: [5, 6, 7, 8, 9, 10, 11],
                name: 'Category Manage',
                icon: ['fa-solid', 'fa-tent-arrow-turn-left'],
                link: '/categorymanage'
            }
        ]
    },
]

export default navData