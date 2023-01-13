import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import '../Posts/posts.scss'
import Post from '../Post/Post'
import { makeRequest } from '../../axios'
import { useLocation } from 'react-router-dom'

const Posts = () => {
    const userId = parseInt(useLocation().pathname.split('/')[2])

    // const { isLoading, error, data } = useQuery('posts', () =>
    //     makeRequest.get('/posts?userId=' + userId).then((res) => {
    //         return res.data
    //     })
    // )

    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const res = await makeRequest.get('/posts?userId=' + userId)
        setPosts(res.data)
    }

    useEffect(() => {
        fetchPosts()
    }, [userId])

    return (
        <div className='Posts'>
            {posts?.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}

export default Posts
