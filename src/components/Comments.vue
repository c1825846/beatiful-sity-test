<script setup lang="ts">
import { ref } from 'vue'

import Comment from '@/components/Comment.vue'
import Loader from '@/components/icons/Loader.vue'
import { useCommentsStore } from '@/stores/comments'

const props = defineProps<{ postId: number }>()
const { fetchCommentsByPostId, allComments } = useCommentsStore()

const isLoading = ref(false)
const isError = ref(false)

const loadComments = async () => {
    isLoading.value = true
    isError.value = false
    try {
        await fetchCommentsByPostId(props.postId)
    } catch (e) {
        isError.value = true
    } finally {
        isLoading.value = false
    }
}

loadComments()
</script>

<template>
    <div class="comments">
        <div v-if="isLoading" class="comments__loader">
            <Loader />
        </div>
        <div v-if="isError" class="comments__error">
            Во время загрузки комментариев произошла ошибка.
            <div class="comments__reload-button" @click="loadComments">
                Попробовать загрузить заново
            </div>
        </div>
        <ul v-else class="comments__list">
            <li class="comments__item" v-for="comment in allComments" :key="comment.id">
                <Comment :comment="comment" />
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
.comments {
    &__loader {
        display: grid;
        place-items: center;

        svg {
            width: 30px;
        }
    }

    &__reload-button {
        text-decoration: underline;
        cursor: pointer;
    }

    &__item {
        & + & {
            border-top: 1px solid #cecece;
        }
    }
}
</style>
