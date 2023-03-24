<script setup lang="ts">
import User from '@/components/User.vue'
import { useUsersStore } from '@/stores/users'

const store = useUsersStore()
store.fetchUsers()
</script>

<template>
    <main>
        <ul class="users">
            <li class="users__item" v-for="user in store.allUsers" :key="user.id">
                <User :user="user" />
            </li>
        </ul>
    </main>
</template>

<style lang="scss">
.users {
    &__item {
        & + & {
            border-top: 1px solid #000;
        }
    }
}
</style>
