import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'

import type { IUser, IFetchedUser } from '@/types/User'

export const useUsersStore = defineStore('users', () => {
    const allUsers: IUser[] = reactive([])
    const fetchUsers = async () => {
        const result = await axios.get<IFetchedUser[]>('https://jsonplaceholder.typicode.com/users')
        allUsers.length = 0
        result.data.map((user) =>
            allUsers.push({
                id: user.id,
                name: user.name,
                username: user.username,
                companyName: user.company.name,
                website: user.website,
            }),
        )
    }

    return { allUsers, fetchUsers }
})
