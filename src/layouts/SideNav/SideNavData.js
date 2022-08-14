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
        pers: [5],
        name: 'Reader Card',
        icon: ['fa-solid', 'fa-id-card'],
        link: '/readercard'
    },
    {
        pers: [],
        name: 'Cart',
        icon: ['fa-solid', 'fa-shopping-cart'],
        link: '/cart'
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
                icon: ['fa-solid', 'fa-book'],
                link: '/booktitlemanage'
            },
            {
                pers: [5, 6, 7, 8, 9, 10, 11],
                name: 'Category Manage',
                icon: ['fa-solid', 'fa-book'],
                link: '/categorymanage'
            }
        ]
    },
    {
        pers: [5, 12, 13, 14, 15, 16],
        groupName: 'Borrower Management',
        icon: ['fa-solid', 'fa-book-open-reader'],
        navLinks: [
            {
                pers: [5, 12, 13, 14, 15, 16],
                name: 'Borrower Manage',
                icon: ['fa-solid', 'fa-book'],
                link: '/borrowermanage'
            },
        ]
    },

]

export default navData