import React, { useContext, useState } from 'react'
import { makeRequest } from '../../axios.js'

import '../Modal/modal.scss'
import ClearIcon from '@mui/icons-material/Clear'

import { AuthContext } from '../../context/authContext'
import { useMutation, useQueryClient } from 'react-query'

const Modal = ({ setOpenModal, userData }) => {
    const [profilePic, setProfilePic] = useState(null)
    const [coverPic, setCoverPic] = useState(null)
    const [infoUser, setInfoUser] = useState({
        name: '',
    })

    const { currentUser } = useContext(AuthContext)

    const update = async (file) => {
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
        (user) => {
            return makeRequest.put('/users', user)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['users'])
            },
        }
    )

    const handleUpdateUser = async (e) => {
        let profilePicUrl
        let coverPicUrl

        profilePicUrl = profilePic ? await update(profilePic) : userData.profilePic
        coverPicUrl = coverPic ? await update(coverPic) : userData.coverPic
        if (!infoUser.name) infoUser.name = userData.name

        mutation.mutate({ ...infoUser, profilePic: profilePicUrl, coverPic: coverPicUrl })
        setOpenModal(false)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const handleOnChange = (e) => {
        setInfoUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className='modal-container' onClick={handleCloseModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <div className='header'>Edit profile</div>
                    <div className='btn-close' onClick={handleCloseModal}>
                        <ClearIcon />
                    </div>
                </div>
                <div className='content'>
                    <div className='info'>
                        <div className='header-wrapper'>
                            <div className='header'>Profile picture</div>
                            <input
                                type='file'
                                id='profile'
                                style={{ display: 'none' }}
                                onChange={(e) => setProfilePic(e.target.files[0])}
                            />
                            <label htmlFor='profile'>
                                <div className='edit'>Edit</div>
                            </label>
                        </div>
                        <div className='profile-pic'>
                            {profilePic ? (
                                <img src={URL.createObjectURL(profilePic)} alt='' />
                            ) : (
                                <img src={'/upload/' + userData.profilePic} alt='' />
                            )}
                        </div>
                    </div>
                    <div className='info'>
                        <div className='header-wrapper'>
                            <div className='header'>Cover photo</div>
                            <input
                                type='file'
                                id='cover'
                                style={{ display: 'none' }}
                                onChange={(e) => setCoverPic(e.target.files[0])}
                            />
                            <label htmlFor='cover'>
                                <div className='edit'>Edit</div>
                            </label>
                        </div>
                        <div className='cover-pic'>
                            {coverPic ? (
                                <img src={URL.createObjectURL(coverPic)} alt='' />
                            ) : (
                                <img src={'/upload/' + userData.coverPic} alt='' />
                            )}
                        </div>
                    </div>
                    <div className='info'>
                        <div className='header-wrapper'>
                            <div className='header'>Nick name</div>
                        </div>
                        <div className='input-wrapper'>
                            <input
                                type='text'
                                placeholder='Decribe who you are'
                                name='name'
                                value={infoUser.name}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <button onClick={handleUpdateUser}>Update Your Profile Info</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
