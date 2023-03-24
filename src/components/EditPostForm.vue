<script setup lang="ts">
import { ref } from 'vue'

import { usePostsStore } from '@/stores/posts'

import type { IPost } from '@/types/Post'

const { updatePost } = usePostsStore()

const props = defineProps<{ post: IPost; isOpen: boolean }>()
const emit = defineEmits(['close'])

const title = ref<string>('')
const body = ref<string>('')
const isSaving = ref<boolean>(false)
const isError = ref<boolean>(false)

title.value = props.post.title
body.value = props.post.body

const handleSavePost = async () => {
    isSaving.value = true
    isError.value = false
    try {
        await updatePost({
            ...props.post,
            title: title.value,
            body: body.value,
        })
        emit('close')
    } catch (e) {
        isError.value = true
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <div class="form" v-if="isOpen">
        <div class="form__item">
            <div class="form__label">title</div>
            <input class="form__input" type="text" v-model="title" />
        </div>
        <div class="form__item">
            <div class="form__label">body</div>
            <textarea class="form__input" v-model="body"></textarea>
        </div>
        <div v-if="isError" class="form__item">
            <div class="form__error">Во время сохранения произошла ошибка. Попробуйте ещё раз</div>
        </div>
        <div class="form__item">
            <button class="form__button" @click="handleSavePost" :disabled="isSaving">
                save post
            </button>
        </div>
    </div>
</template>

<style lang="scss">
.form {
    &__item {
        padding: 0.2em;

        & textarea,
        input,
        button {
            border: 1px solid #2c2c2c;
        }

        & textarea {
            height: 100px;
        }

        & button {
            padding: 0.2em 0.4em;
            cursor: pointer;
        }
    }

    &__label {
        font-size: 0.8rem;
    }

    &__input {
        font-size: 0.9rem;
        padding: 0.2em;
        width: 100%;
    }

    &__error {
        color: #a33535;
        font-size: 0.8rem;
    }
}
</style>
