import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

import './rightbar.scss'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SearchIcon from '@mui/icons-material/Search'
import { makeRequest } from '../../axios'

const RightBar = () => {
    const { currentUser } = useContext(AuthContext)
    // const [usersData, setUsersData] = useState({})
    const [relationshipData, setRelationshipsData] = useState([])

    // const fetchUsers = async () => {
    //     const res = await makeRequest.get('/users/')
    //     setUsersData(res.data)
    // }

    // useEffect(() => {
    //     fetchUsers()
    // }, [])

    const { data: usersData } = useQuery(['users'], () =>
        makeRequest.get('/users/').then((res) => {
            return res.data
        })
    )

    const fetchRelationshipData = async () => {
        const res = await makeRequest.get(
            '/relationships/followedUserId?followerUserId=' + currentUser.id
        )
        setRelationshipsData(res.data)
    }

    const userDataContacts = usersData?.filter((user) => {
        for (let i = 0; i < relationshipData?.length; i++) {
            if (user.id === relationshipData[i]) {
                return user
            }
        }
    })

    console.log(userDataContacts)

    useEffect(() => {
        fetchRelationshipData()
    }, [])

    console.log(relationshipData)
    // console.log(usersData)

    // const queryClient = useQueryClient()

    // const mutation = useMutation(
    //     (followed) => {
    //         if (followed) return makeRequest.delete('/relationships?followedUserId=' + adminData.id)
    //         return makeRequest.post('/relationships?followedUserId=' + adminData.id)
    //     },
    //     {
    //         onSuccess: () => {
    //             queryClient.invalidateQueries(['relationships'])
    //         },
    //     }
    // )

    // const handleFollowAdmin = () => {
    //     mutation.mutate(relationshipsData.includes(currentUser.id))
    // }

    // console.log(usersData)

    return (
        <div className='RightBar'>
            <div className='container'>
                <div className='item'>
                    <span className='sidebar-header'>Suggestions for you</span>
                    {usersData?.map((user, key) => (
                        <div className='user' key={key}>
                            <div className='user-info'>
                                <img src={'/upload/' + user?.profilePic} alt='' />
                                <Link to={'/profile/' + user.id}>
                                    <span>{user?.name}</span>
                                </Link>
                            </div>
                            <div className='buttons'>
                                <Link to={'/profile/' + user?.id}>
                                    <button>Go to profile</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className='item'>
                    <span className='sidebar-header'>Latest activities</span>
                    <div className='user'>
                        <div className='user-info'>
                            <img src={'/upload/' + currentUser.profilePic} alt='' />
                            <p>
                                <span>{currentUser.name}</span> change their cover photo
                            </p>
                        </div>
                        <span className='time-activity'>1 minute ago</span>
                    </div>
                    <div className='user'>
                        <div className='user-info'>
                            <img src={'/upload/' + currentUser.profilePic} alt='' />
                            <p>
                                <span>{currentUser.name}</span> change their cover photo
                            </p>
                        </div>
                        <span className='time-activity'>1 minute ago</span>
                    </div>
                </div> */}
                <div className='item-contact'>
                    <div className='header-contact_container'>
                        <span className='sidebar-header'>Contacts</span>
                        <div className='searching-contact'>
                            <SearchIcon className='searching-contact_icon' />
                            <MoreHorizIcon className='searching-contact_icon' />
                        </div>
                    </div>
                    <div className='contact-users'>
                        {userDataContacts?.map((user, key) => (
                            <div className='user-info' key={key}>
                                <img src={'/upload/' + user.profilePic} alt='' />
                                <div className='status' />
                                <span>{user.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightBar
