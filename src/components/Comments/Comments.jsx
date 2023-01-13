import React, { useCallback, useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../context/authContext'
import { useQueryClient, useMutation, useQuery } from 'react-query'

import '../Comments/comments.scss'
import Comment from '../Comment/Comment'
import SendIcon from '@mui/icons-material/Send'
import { makeRequest } from '../../axios.js'

const Comments = ({ postId }) => {
    const { currentUser } = useContext(AuthContext)

    const [desc, setDesc] = useState('')
    const [comments, setComments] = useState([])

    const handleClick = async () => {
        if (desc) await mutation.mutate({ desc: desc, postId: postId })
        setDesc('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && desc) {
            mutation.mutate({ desc: desc, postId: postId })
            setDesc('')
        }
    }

    // const { data: comments } = useQuery(['comments'], () =>
    //     makeRequest.get('/comments?postId=' + postId).then((res) => {
    //         return res.data
    //     })
    // )

    const fetchComments = useCallback(async () => {
        let res = await makeRequest.get('/comments?postId=' + postId)
        setComments(res.data)
    }, [])

    useEffect(() => {
        fetchComments()
    }, [comments])

    // console.log(comments)

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post('/comments', newComment)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments'])
            },
        }
    )

    const handleChange = (e) => {
        setDesc(e.target.value)
    }

    return (
        <div className='comments'>
            <div className='type-comments'>
                <img src={'/upload/' + currentUser.profilePic} alt='' />
                <div className='input-container'>
                    <input
                        type='text'
                        value={desc}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <SendIcon style={{ cursor: 'pointer' }} onClick={handleClick} />
                </div>
            </div>
            {comments?.map((comment) => (
                <Comment postId={postId} comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export default Comments
