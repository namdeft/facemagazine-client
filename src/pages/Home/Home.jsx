import React from 'react'

import '../Home/home.scss'
import Stories from '../../components/Stories/Stories'
import Posts from '../../components/Posts/Posts'
import Status from '../../components/Status/Status'

const Home = () => {
    return (
        <div className='home'>
            <Stories />
            <Status />
            <Posts />
        </div>
    )
}

export default Home
