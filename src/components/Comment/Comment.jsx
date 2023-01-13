import React, { useContext } from 'react'
import '../Comment/comment.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useQueryClient, useMutation, useQuery } from 'react-query'

import DeleteIcon from '@mui/icons-material/Delete'
import { makeRequest } from '../../axios'

const Comment = ({ comment }) => {
    const queryClient = useQueryClient()

    const deletePostMutation = useMutation(
        (commentId) => {
            return makeRequest.delete('/comments/' + commentId)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments'])
            },
        }
    )

    const handleDelete = () => {
        deletePostMutation.mutate(comment.id)
    }

    return (
        <div className='comment'>
            <div className='info'>
                <div className='info-wrapper'>
                    <img src={'/upload/' + comment.profilePic} alt='' />
                    <div className='info-user'>
                        <Link>{comment.name}</Link>
                        <p>{comment.desc}</p>
                    </div>
                </div>
                <div className='interaction'>
                    <span>Like</span>
                    <span>Reply</span>
                    <span style={{ fontSize: '14px' }}>
                        {moment(comment.createAt).fromNow('hh')}
                    </span>
                </div>
            </div>
            <div className='delete-btn' onClick={handleDelete}>
                <DeleteIcon style={{ fontSize: '20px' }} />
            </div>
        </div>
    )
}

export default Comment
