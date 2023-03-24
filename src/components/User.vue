<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import { usePostsStore } from '@/stores/posts'

import ChevronUp from '@/components/icons/ChevronUp.vue'
import ChevronDown from '@/components/icons/ChevronDown.vue'
import Loader from '@/components/icons/Loader.vue'
import PostPreview from './PostPreview.vue'

import type { IUser } from '@/types/User'

const props = defineProps<{ user: IUser }>()
const isOpen = ref(false)
const loading = ref(false)

const { fetchPostsByUserId, getPostsByUserId } = usePostsStore()

const handleOpen = async () => {
    loading.value = true
    await fetchPostsByUserId(props.user.id)
    isOpen.value = true
    loading.value = false
}

const handleClose = () => {
    isOpen.value = false
}
</script>

<template>
    <div class="user">
        <div class="user__header">
            <div class="user__info">
                <div class="user__id"></div>
                <div class="user__name">
                    #{{ props.user.id }}
                    {{ props.user.name }}
                    <span class="user__username">
                        {{ props.user.username }}
                    </span>
                </div>
                <div class="user__footer meta-info">
                    {{ props.user.companyName }} -
                    {{ props.user.website }}
                </div>
            </div>
            <div v-if="loading" class="user__button">
                <Loader />
            </div>
            <div v-else-if="isOpen" class="user__button" @click="handleClose">
                <ChevronUp />
            </div>
            <div v-else class="user__button" @click="handleOpen">
                <ChevronDown />
            </div>
        </div>
        <div class="user__body" v-if="isOpen">
            <ul>
                <li
                    class="user__post"
                    v-for="post in getPostsByUserId(props.user.id)"
                    :key="post.id"
                >
                    <RouterLink :to="`/post/${post.id}`">
                        <PostPreview :post="post" />
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
.user {
    padding: 0.5em 1em;

    &__header {
        display: grid;
        grid-template-columns: 1fr 30px;
    }

    &__username {
        font-weight: 600;
    }

    &__button {
        display: grid;
        place-items: center;
        cursor: pointer;
    }

    &__body {
        padding: 1em 2em;
    }

    &__post {
        padding: 0.4em 0;
        & + & {
            border-top: 1px solid #cecece;
        }
    }
}
</style>
