import React, { useEffect, useState } from 'react'

import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useLocation } from 'react-router-dom'
import { makeRequest } from '../../axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

import Modal from '../../components/Modal/Modal'
import '../Profile/profile.scss'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

const Profile = () => {
    const [openModal, setOpenModal] = useState(false)

    const [userData, setUserData] = useState({})
    const [relationshipsData, setRelationshipsData] = useState([])

    const { currentUser } = useContext(AuthContext)

    const userId = parseInt(useLocation().pathname.split('/')[2])

    // Fetching data of user by using react-query
    // const { data: userData } = useQuery(['userr'], () =>
    //     makeRequest.get('/user/' + userId).then((res) => {
    //         return res.data
    //     })
    // )

    const fetchUserData = async () => {
        const res = await makeRequest.get('/user/' + userId)
        setUserData(res.data)
    }

    const fetchRelationshipData = async () => {
        const res = await makeRequest.get('/relationships/followerUserId?followedUserId=' + userId)
        setRelationshipsData(res.data)
    }

    // Fetching data of relationship between follower and user by using react-query
    // const {
    //     isLoading,
    //     error,
    //     data: relationshipsData,
    // } = useQuery(['relationships'], () =>
    //     makeRequest.get('/relationships?followedUserId=' + userId).then((res) => {
    //         return res.data
    //     })
    // )

    // console.log(relationshipsData)

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (followed) => {
            if (followed) return makeRequest.delete('/relationships/?followedUserId=' + userId)
            return makeRequest.post('/relationships/?followedUserId=' + userId)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['relationships'])
            },
        }
    )

    const handleFollowUser = () => {
        mutation.mutate(relationshipsData.includes(currentUser.id))
        window.location.reload()
    }

    useEffect(() => {
        fetchUserData()
        fetchRelationshipData()
    }, [userId])

    return (
        <>
            {userData && (
                <div className='Profile'>
                    <div className='images'>
                        <img
                            src={'/upload/' + userData.coverPic}
                            alt=''
                            className='profile-cover'
                        />
                        <img
                            src={'/upload/' + userData.profilePic}
                            alt=''
                            className='profile-avar'
                        />
                    </div>
                    <div className='profile-container'>
                        <div className='profile-info'>
                            <div className='left'>
                                <div className='item'>
                                    <FacebookIcon fontSize='medium' />
                                </div>
                                <div className='item'>
                                    <InstagramIcon fontSize='medium' />
                                </div>
                                <div className='item'>
                                    <TwitterIcon fontSize='medium' />
                                </div>
                                <div className='item'>
                                    <GitHubIcon fontSize='medium' />
                                </div>
                                <div className='item'>
                                    <LinkedInIcon fontSize='medium' />
                                </div>
                            </div>
                            <div className='center'>
                                <span>{userData.name}</span>
                                {currentUser.id === userId ? (
                                    <div className='btns'>
                                        <button onClick={() => setOpenModal(true)}>
                                            <ModeEditIcon />
                                            Edit Profile
                                        </button>
                                    </div>
                                ) : (
                                    <div className='btns'>
                                        <button onClick={handleFollowUser}>
                                            <BookmarkIcon />
                                            {relationshipsData?.includes(currentUser.id)
                                                ? 'Following'
                                                : 'Follow'}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className='right'>
                                <button>
                                    <ChatBubbleIcon />
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {openModal && <Modal setOpenModal={setOpenModal} userData={userData} />}
        </>
    )
}

export default Profile
