import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

import '../LeftBar/leftbar.scss'

import friendLogo from '../../assets/images/friend.png'
import groupLogo from '../../assets/images/group.png'
import marketplaceLogo from '../../assets/images/marketplace.png'
import memoriesLogo from '../../assets/images/memories.png'
import watchLogo from '../../assets/images/watch.png'
import gamingLogo from '../../assets/images/gaming.png'
import galleryLogo from '../../assets/images/gallery.png'
import videosLogo from '../../assets/images/videos.png'
import eventLogo from '../../assets/images/events.png'
import tutorialsLogo from '../../assets/images/tutorials.png'
import { Link } from 'react-router-dom'

const LeftBar = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <div className='LeftBar'>
            <div className='container'>
                <div className='menu'>
                    <Link to={`/profile/${currentUser.id}`}>
                        <div className='user'>
                            <img src={'/upload/' + currentUser.profilePic} alt='' />
                            <span>{currentUser.name}</span>
                        </div>
                    </Link>
                    <div className='item'>
                        <img src={friendLogo} alt='' />
                        <span>Friends</span>
                    </div>
                    <div className='item'>
                        <img src={groupLogo} alt='' />
                        <span>Groups</span>
                    </div>
                    <div className='item'>
                        <img src={marketplaceLogo} alt='' />
                        <span>Marketplace</span>
                    </div>
                    <div className='item'>
                        <img src={memoriesLogo} alt='' />
                        <span>Memories</span>
                    </div>
                </div>
                <div className='menu'>
                    <span className='sidebar-header'>Shortcuts</span>
                    <div className='item'>
                        <img src={watchLogo} alt='' />
                        <span>Watch</span>
                    </div>
                    <div className='item'>
                        <img src={gamingLogo} alt='' />
                        <span>Gaming</span>
                    </div>
                    <div className='item'>
                        <img src={galleryLogo} alt='' />
                        <span>Gallery</span>
                    </div>
                    <div className='item'>
                        <img src={videosLogo} alt='' />
                        <span>Videos</span>
                    </div>
                </div>
                <div className='menu'>
                    <span className='sidebar-header'>Others</span>
                    <div className='item'>
                        <img src={tutorialsLogo} alt='' />
                        <span>Tutorials</span>
                    </div>
                    <div className='item'>
                        <img src={eventLogo} alt='' />
                        <span>Events</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar
