<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { usePostsStore } from '@/stores/posts'
import Comments from '@/components/Comments.vue'
import Pencil from '@/components/icons/Pencil.vue'
import EditPostForm from '@/components/EditPostForm.vue'

import type { IPost } from '@/types/Post'

const { fetchPostById, getPostById } = usePostsStore()
const isEditFormOpen = ref<boolean>(false)

const route = useRoute()
const postId = computed<number>(() =>
    parseInt(typeof route.params.id === 'string' ? route.params.id : route.params.id[0]),
)

fetchPostById(postId.value)

const post = computed<IPost>(() => getPostById(postId.value) as IPost) // TODO: fix as

const handleOpenEditForm = () => {
    isEditFormOpen.value = true
}

const handleCloseEditFrom = () => {
    isEditFormOpen.value = false
}
</script>

<template>
    <div v-if="post" class="post">
        <div class="post__header">
            {{ post.id }} {{ post.title }}
            <div class="post__edit-button" @click="handleOpenEditForm">
                <Pencil />
            </div>
        </div>
        <div class="post__body">
            <div class="post__content">
                {{ post.body }}
            </div>
            <Comments :post-id="postId" />
            <EditPostForm :post="post" :is-open="isEditFormOpen" @close="handleCloseEditFrom" />
        </div>
    </div>
</template>

<style lang="scss">
.post {
    &__header {
        font-weight: 600;
        display: grid;
        grid-template-columns: 1fr 40px;
    }

    &__edit-button {
        display: grid;
        place-items: center;
        cursor: pointer;

        svg {
            width: 20px;
        }
    }

    &__content {
        padding: 1em 0 2em;
    }
}
</style>
