import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { useMutation, useQueryClient } from 'react-query'
import { makeRequest } from '../../axios.js'

import '../Status/status.scss'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import MapIcon from '@mui/icons-material/Map'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const Status = () => {
    const { currentUser } = useContext(AuthContext)

    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)

    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await makeRequest.post('/upload', formData)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post('/posts', newPost)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts'])
            },
        }
    )

    const handleAddPost = async (e) => {
        let imgUrl = ''
        if (file) {
            imgUrl = await upload()
        }

        if (desc || file) mutation.mutate({ desc, img: imgUrl })
        setDesc('')
        setFile(null)
    }

    const handleChangeInput = (e) => {
        setDesc(e.target.value)
    }

    return (
        <div className='Status'>
            <div className='status-container'>
                <div className='status-input'>
                    <div className='left'>
                        <img src={'/upload/' + currentUser.profilePic} alt='' />
                        <textarea
                            type='text'
                            placeholder='What is on your mind?'
                            value={desc}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='right'>
                        {file && (
                            <img className='file' alt='' src={URL.createObjectURL(file)}></img>
                        )}
                    </div>
                </div>
                <div className='interaction'>
                    <div className='left'>
                        <input
                            type='file'
                            id='file'
                            style={{ display: 'none' }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor='file'>
                            <div className='item'>
                                <InsertPhotoIcon />
                                <span>Add Images</span>
                            </div>
                        </label>

                        <div className='item'>
                            <MapIcon />
                            <span>Add Places</span>
                        </div>
                        <div className='item'>
                            <PersonAddIcon />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className='right'>
                        <button onClick={handleAddPost}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Status
