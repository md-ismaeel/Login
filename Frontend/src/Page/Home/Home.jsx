import React from 'react'
import { Loader } from '../../Components/Loader'
import logo from "../../assets/kodekapl-logo.png"
import { useSelector, useDispatch } from "react-redux"
import Logout from '../../Components/Logout'

export const Home = () => {
    const { user, isLogin } = useSelector((state) => state.userSlice)
    return (
        <div className='relative w-full min-h-screen flex justify-center items-center bg-slate-400'>
            <div className='kal w-[100%] min-h-[200px] flex flex-col justify-end items-center'>
                <h1 className='text-3xl font-medium text-white mb-4 capitalize'>Welcome to kodeKalp global technology</h1>
                <img src={logo} alt='logo' className='w-[200px] h-[100px]' />
            </div>
            <Logout />
        </div>
    )
}

