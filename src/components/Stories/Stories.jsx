import React, { useContext } from 'react'

import '../Stories/stories.scss'
import storyPic1 from '../../assets/images/Deft-worldChampion.jpeg'
import storyPic2 from '../../assets/images/ronaldo.jpeg'
import storyPic3 from '../../assets/images/ronaldo-hand.webp'
import storyPic4 from '../../assets/images/siu.jpeg'
import { AuthContext } from '../../context/authContext'

const Stories = () => {
    const { currentUser } = useContext(AuthContext)

    const stories = [
        {
            id: 1,
            name: 'NamDeft',
            profilePic: storyPic1,
        },
        {
            id: 2,
            name: 'NamDeft',
            profilePic: storyPic2,
        },
        {
            id: 3,
            name: 'NamDeft',
            profilePic: storyPic3,
        },
        {
            id: 4,
            name: 'NamDeft',
            profilePic: storyPic4,
        },
    ]

    return (
        <div className='stories'>
            <div className='story'>
                <img src={'/upload/' + currentUser.profilePic} alt='' />
                <div className='cover-img'></div>
                <div className='create-btn'>+</div>
            </div>
            {stories.map((story) => (
                <div className='story' key={story.id}>
                    <img src={story.profilePic} alt='' />
                    <div className='cover-img'></div>
                    <span>{currentUser.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Stories
