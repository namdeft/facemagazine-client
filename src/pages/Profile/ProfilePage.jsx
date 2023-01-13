import React from 'react'

import '../Profile/profilePage.scss'
import Posts from '../../components/Posts/Posts'
import Profile from '../../components/Profile/Profile'

const ProfilePage = () => {
    return (
        <div className='Profile-page'>
            <Profile />
            <Posts />
        </div>
    )
}

export default ProfilePage
