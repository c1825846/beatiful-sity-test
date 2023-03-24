import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'

import type { IComment } from '@/types/Comment'

export const useCommentsStore = defineStore('comments', () => {
    const allComments: IComment[] = reactive([])
    const fetchCommentsByPostId = async (postId: number) => {
        const result = await axios.get<IComment[]>(
            `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
        )
        allComments.length = 0
        result.data.map((comment) => allComments.push(comment))
    }

    return { allComments, fetchCommentsByPostId }
})
