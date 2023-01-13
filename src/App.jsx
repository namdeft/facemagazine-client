import './app.scss'

import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import NavBar from './components/NavBar/NavBar'
import LeftBar from './components/LeftBar/LeftBar'
import RightBar from './components/RightBar/RightBar'
import Home from './pages/Home/Home'
import ProfilePage from './pages/Profile/ProfilePage'

function App() {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')

    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    const { currentUser } = useContext(AuthContext)

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to='/login'></Navigate>
        }

        return children
    }

    const Layout = () => {
        const queryClient = new QueryClient()
        return (
            <QueryClientProvider client={queryClient}>
                <div className='container'>
                    <NavBar switchTheme={switchTheme} theme={theme} />
                    <div className='content' style={{ display: 'flex' }}>
                        <LeftBar />
                        <div style={{ flex: '6' }}>
                            <Outlet />
                        </div>
                        <RightBar />
                    </div>
                </div>
            </QueryClientProvider>
        )
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/profile/:id',
                    element: <ProfilePage />,
                },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/register',
            element: <RegisterPage />,
        },
        {
            path: '/',
            element: <Home />,
        },
        {},
    ])

    return (
        <div className='App' data-theme={theme}>
            <RouterProvider router={router} />
        </div>
    )
}

export default App
