import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'

import type { IPost } from '@/types/Post'

export const usePostsStore = defineStore('posts', () => {
    const allPosts: IPost[] = reactive([])
    const addPost = (newPost: IPost) => {
        const storedPost = allPosts.find((storedPost) => storedPost.id === newPost.id)
        if (storedPost) {
            storedPost.userId = newPost.userId
            storedPost.title = newPost.title
            storedPost.body = newPost.body
            return
        }
        allPosts.push(newPost)
    }
    const fetchPostsByUserId = async (userId: number) => {
        const result = await axios.get<IPost[]>(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        )
        result.data.map((fetchedPost) => {
            addPost(fetchedPost)
        })
    }
    const getPostsByUserId = (userId: number) => {
        return allPosts.filter((post) => post.userId === userId)
    }
    const fetchPostById = async (id: number) => {
        const result = await axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const fetchedPost = result.data
        addPost(fetchedPost)
    }
    const getPostById = (id: number) => {
        return allPosts.find((post) => post.id === id)
    }
    const updatePost = async (post: IPost) => {
        const result = await axios.patch<IPost>(
            `https://jsonplaceholder.typicode.com/posts/${post.id}`,
            post,
        )
        const fetchedPost = result.data
        addPost(fetchedPost)
    }

    return {
        allPosts,
        fetchPostsByUserId,
        getPostsByUserId,
        fetchPostById,
        getPostById,
        updatePost,
    }
})
