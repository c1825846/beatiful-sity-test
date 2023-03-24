<script setup lang="ts">
import type { IComment } from '@/types/Comment'

const props = defineProps<{ comment: IComment }>()
</script>

<template>
    <div class="comment">
        <div class="comment__header meta-info">
            {{ props.comment.name }} | {{ props.comment.email }}
        </div>
        <div class="comment__body">
            {{ props.comment.body }}
        </div>
    </div>
</template>

<style lang="scss">
.comment {
    padding: 0.4em 0.2em;
}
</style>
