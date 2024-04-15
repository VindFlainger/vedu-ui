export interface State {
    user: any,
    maintenance: boolean,
    notifications: any[]
}

import api from '~/api/index'


export const useAccountStore = defineStore('Account', {
    state: (): State => ({
        user: null,
        maintenance: false,
        notifications: []
    }),
    getters: {
        role: (state): string | undefined => {
            return state.user?.role
        },
        isInstructor: (state): boolean => {
            return state.user.role === 'instructor'
        },
        isStudent: (state): boolean => {
            return state.user.role === 'student'
        },
        isNewUser: (state): boolean => {
            return !!state.user.role
        }
    },
    actions: {
        async setAuth(refreshToken: string, remember: boolean) {
            if (remember) localStorage.setItem('refresh_token', refreshToken)
            else sessionStorage.setItem('refresh_token', refreshToken)
        },
        async clearAuth() {
            localStorage.removeItem('refresh_token')
            sessionStorage.removeItem('refresh_token')
            await this.logoutHubspotChat()
            await window.open('http://localhost:8080/auth', '_self')
        },
        async logoutHubspotChat() {
            if (window.HubSpotConversations) {
                window.HubSpotConversations.clear()
                window.HubSpotConversations.widget.remove()
                const cookies = document.cookie.split(";");

                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i];
                    const eqPos = cookie.indexOf("=");
                    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
            }
        },
        async getUserData() {
            const res = await api.account.GET_USER()
            this.user = res
         /*   this.user = {
                "personal_data": {
                    "first_name": "Alex",
                    "last_name": "Hirzhon",
                    "gender": "male",
                    "age": 20,
                    "country": {
                        code: 'by',
                        name: 'Belarus'
                    },
                    "email": "girzhon1972@gmail.com"
                },
                "statistic": {
                    courses_count: 10,
                    questions_count: 112,
                    materials_count: 2,
                    responses_count: 1223,
                    notifications_count: 12
                },
                "billing": {
                    "plan": "professional",
                    "balance": 1231,
                    "frozen": 12,
                    "month_income": 122,
                    "transactions": [
                        {
                            amount: -121,
                            stamp: '2024-03-13T02:15:15.086Z',
                            about: 'Payment for course',
                            target: {}
                        },
                        {
                            amount: 121,
                            stamp: '2024-03-13T02:15:15.086Z',
                            about: 'Student joined the course',
                            target: {}
                        },
                        {
                            amount: 0,
                            stamp: '2024-03-13T02:15:15.086Z',
                            about: 'Balance adjustment',
                            target: {}
                        },
                        {
                            amount: 1211,
                            stamp: '2024-03-13T02:15:15.086Z',
                            about: 'Student joined the course',
                            target: {}
                        },
                    ],
                    credit_card: {
                        number: '#### #### #### 4444',
                        expires: '12/22',
                        cvv: '232',
                        fund_limit: 912
                    }
                },
                "_id": "65ed16442490e6fec45c24c6",
                "role": "instructor",
                "avatar": {
                    "original": "https://res.cloudinary.com/dl8gweeqh/image/upload/v1710103942/j3c7qzctvh9caaiyjlyl.jpg",
                    "frames": [
                        {
                            "width": 64,
                            "height": 40,
                            "url": "https://res.cloudinary.com/dl8gweeqh/image/upload/c_limit,w_64/v1710103942/j3c7qzctvh9caaiyjlyl.jpg"
                        },
                        {
                            "width": 256,
                            "height": 160,
                            "url": "https://res.cloudinary.com/dl8gweeqh/image/upload/c_limit,w_256/v1710103942/j3c7qzctvh9caaiyjlyl.jpg"
                        }
                    ]
                },
                "id": "65ed16442490e6fec45c24c6"
            }*/
            this.notifications = [
                {
                    receiver: {
                        first_name: 'Alex',
                        last_name: 'Hirzhon',
                        "avatar": {
                            "original": "https://res.cloudinary.com/dl8gweeqh/image/upload/v1710103942/j3c7qzctvh9caaiyjlyl.jpg",
                            "frames": [
                                {
                                    "width": 64,
                                    "height": 40,
                                    "url": "https://res.cloudinary.com/dl8gweeqh/image/upload/c_limit,w_64/v1710103942/j3c7qzctvh9caaiyjlyl.jpg"
                                },
                                {
                                    "width": 256,
                                    "height": 160,
                                    "url": "https://res.cloudinary.com/dl8gweeqh/image/upload/c_limit,w_256/v1710103942/j3c7qzctvh9caaiyjlyl.jpg"
                                }
                            ]
                        },
                    },
                    viewed: false,
                    type: 'message',
                    data: {
                        text: 'This error most likely means you are trying to do something from the client-side that needs to be done on the server-side. If MongoDB module can\'t find the DNS component, it\'s running on the client-side.'
                    }
                },
                {
                    group: 'global',
                    viewed: true,
                    type: 'message',
                    data: {
                        text: 'Hello here!'
                    }
                },
                {
                    group: 'global',
                    viewed: true,
                    type: 'message',
                    data: {
                        text: 'This error most likely means you are trying to do something from the client-side that needs to be done on the server-side. If MongoDB module can\'t find the DNS component, it\'s running on the client-side.'
                    }
                },
                {
                    group: 'global',
                    viewed: true,
                    type: 'message',
                    data: {
                        text: 'Hello here!'
                    }
                },

                {
                    target: 'global',
                    viewed: true,
                    type: 'message',
                    data: {
                        text: 'Hello here!'
                    }
                },
            ]
        }
    },
})
