import React, { useContext, useState } from 'react'
import './navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { makeRequest } from '../../axios'

import { AuthContext } from '../../context/authContext'

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { useQuery } from 'react-query'

const NavBar = ({ switchTheme, theme }) => {
    const [openMenu, setOpenMenu] = useState(false)

    const { currentUser } = useContext(AuthContext)

    const { logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const { data: userData } = useQuery(['user'], () =>
        makeRequest.get('/user/' + currentUser.id).then((res) => {
            if (res.data.id === currentUser.id) {
                return res.data
            }
        })
    )

    const handleLogOut = async () => {
        await makeRequest.post('/auth/logout')
        logout()
        navigate('/login')
        window.location.reload()
    }

    return (
        <div className='navbar'>
            <div className='left'>
                <Link to='/' className='logo'>
                    <span>deftsocial.</span>
                </Link>
                <div className='search'>
                    <SearchOutlinedIcon />
                    <input type='text' placeholder='search' />
                </div>
                <div className='cover_icon' onClick={switchTheme}>
                    {theme === 'light' ? <DarkModeOutlinedIcon /> : <LightModeIcon />}
                </div>
            </div>
            <div className='right'>
                <div className='cover_icon'>
                    <TextsmsOutlinedIcon />
                </div>
                <div className='cover_icon'>
                    <NotificationsOutlinedIcon />
                </div>
                <div className='user'>
                    {/* <Link to={`/profile/${currentUser.id}`}>
                        <img src={currentUser.profilePic} alt='' />
                    </Link> */}
                    <img
                        src={'/upload/' + userData?.profilePic}
                        alt=''
                        className='user-img'
                        onClick={() => setOpenMenu(!openMenu)}
                    />
                    {openMenu && (
                        <div className='dropdown-menu'>
                            <div className='dropdown-item'>
                                <Link
                                    className='item'
                                    to={`/profile/${currentUser.id}`}
                                    onClick={() => setOpenMenu(!openMenu)}
                                >
                                    <div className='item_img'>
                                        <img src={'/upload/' + userData?.profilePic} alt='' />
                                    </div>
                                    <span>My profile</span>
                                </Link>
                            </div>
                            <div className='dropdown-item' onClick={handleLogOut}>
                                <Link className='item'>
                                    <div className='item_icon'>
                                        <LogoutIcon />
                                    </div>
                                    <span>Log out</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavBar
