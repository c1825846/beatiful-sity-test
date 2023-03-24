<script setup lang="ts">
import { computed } from 'vue'

import type { IPost } from '@/types/Post'

const props = defineProps<{ post: IPost }>()

const words = computed(() => {
    return props.post.body.trim().split(/\s+/).length
})

const chars = computed(() => {
    return props.post.body.trim().replace(/\s+/, '').split('').length
})
</script>

<template>
    <div class="post-preview">
        <div class="post-preview__title">{{ props.post.id }} {{ props.post.title }}</div>
        <div class="post-preview__meta meta-info">words: {{ words }} / chars: {{ chars }}</div>
    </div>
</template>
