import React, { useEffect, useState } from 'react'
import '../Register/register.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const Register = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmedPassword: '',
            name: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required').min(5, 'Must be at least 5 chars or more'),
            email: Yup.string()
                .required('Required')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter valid email'),
            password: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    'Must have a minimum of 8 chars and contains at least 1 letter, 1 number'
                ),
            confirmedPassword: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Password must match'),
            name: Yup.string().required('Required').min(1, 'Must be at least 1 char or more'),
        }),
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:8080/api/auth/register', values)
                setMessage('User created successfully!')
            } catch (err) {
                setMessage('User has been created!')
            }
        },
    })

    const [message, setMessage] = useState('')

    return (
        <div className='register'>
            <div className='card'>
                <div className='btn-login'>
                    <Link to='/login'>
                        <button>
                            Login
                            <ArrowForwardIcon />
                        </button>
                    </Link>
                </div>
                <h1>Register</h1>
                <form action='' onSubmit={formik.handleSubmit}>
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.username && (
                        <p className='form-err'>*{formik.errors.username}</p>
                    )}
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && <p className='form-err'>*{formik.errors.email}</p>}
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                        <p className='form-err'>*{formik.errors.password}</p>
                    )}
                    <input
                        type='password'
                        placeholder='Confirm your password'
                        name='confirmedPassword'
                        value={formik.values.confirmedPassword}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.confirmedPassword && (
                        <p className='form-err'>*{formik.errors.confirmedPassword}</p>
                    )}
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && <p className='form-err'>*{formik.errors.name}</p>}
                    <div className='btn-register'>
                        <button type='submit'>Register</button>
                    </div>
                </form>
                {message && (
                    <p style={{ color: 'black', fontSize: '14px', fontWeight: 'bold' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Register
