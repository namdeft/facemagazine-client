import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

import '../Login/login.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })

    const { currentUser } = useContext(AuthContext)

    const [err, setErr] = useState(null)

    const { login } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            setErr(true)
            navigate('/')
        } catch (err) {
            setErr(err.response.data)
        }
    }

    // console.log(err)

    const handleChangeInput = async (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    return (
        <div className='login'>
            <div className='card'>
                <div className='btn-register'>
                    <Link to='/register'>
                        <button>
                            <ArrowBackIcon />
                            Register
                        </button>
                    </Link>
                </div>
                <h1>Login</h1>
                <form action='' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Username'
                        onChange={handleChangeInput}
                        name='username'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={handleChangeInput}
                        name='password'
                    />
                    <span style={{ color: 'red' }}>{err && err}</span>
                    <div className='btn-login'>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
