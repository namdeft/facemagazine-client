import React, { useContext, useState } from 'react'
import '../Post/post.scss'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/authContext.js'
import Comments from '../Comments/Comments'
import moment from 'moment'

import {
    MoreHorizIcon,
    ClearIcon,
    FavoriteBorderOutlinedIcon,
    FavoriteOutlinedIcon,
    SmsOutlinedIcon,
    ShareOutlinedIcon,
} from '../../mui.js'
import { makeRequest } from '../../axios'

const Post = ({ post }) => {
    const { currentUser } = useContext(AuthContext)

    const [commentOut, setCommentOut] = useState(false)

    const { data } = useQuery(['likes', post.id], () =>
        makeRequest.get('/likes?postId=' + post.id).then((res) => {
            return res.data
        })
    )

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete('/likes?postId=' + post.id)
            return makeRequest.post('/likes?postId=' + post.id)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['likes'])
            },
        }
    )

    const deletePostMutation = useMutation(
        (postId) => {
            return makeRequest.delete('/posts/' + postId)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts'])
            },
        }
    )

    const handleLikePost = () => {
        mutation.mutate(data.includes(currentUser.id))
    }

    const handleDeletePost = () => {
        deletePostMutation.mutate(post.id)
    }

    const handleCommentOut = () => {
        setCommentOut(!commentOut)
    }

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div className='post'>
            <div className='user'>
                <div className='user-info'>
                    <Link to={`/profile/${post.userId}`} onClick={handleScrollTop}>
                        <img src={'/upload/' + post.profilePic} alt='' />
                    </Link>
                    <div className='detail'>
                        <Link to={`/profile/${post.userId}`} onClick={handleScrollTop}>
                            {post.name}
                        </Link>
                        <span>{moment(post.createAt).fromNow('hh')}</span>
                    </div>
                </div>
                <div className='icons'>
                    <div className='icon'>
                        <MoreHorizIcon />
                    </div>
                    <div className='icon' onClick={handleDeletePost}>
                        <ClearIcon />
                    </div>
                </div>
            </div>
            <div className='content'>
                <p>{post.desc}</p>
                {post.img && <img src={'../upload/' + post.img} alt='' />}
                <div className='interaction'>
                    <div className='item' onClick={handleLikePost}>
                        {data?.includes(currentUser.id) ? (
                            <FavoriteOutlinedIcon style={{ color: 'red' }} />
                        ) : (
                            <FavoriteBorderOutlinedIcon />
                        )}
                        <span>Like</span>
                    </div>
                    <div className='item' onClick={handleCommentOut}>
                        <SmsOutlinedIcon />
                        <span>Comment</span>
                    </div>
                    <div className='item'>
                        <ShareOutlinedIcon />
                        <span>Share</span>
                    </div>
                </div>
            </div>
            {commentOut ? <Comments postId={post.id} /> : null}
        </div>
    )
}

export default Post
