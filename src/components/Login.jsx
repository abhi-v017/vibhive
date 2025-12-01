import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../services/authService'
import {login} from '../store/authSlice'
function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const loginHandler = async (data) => {
        setError('')
        setLoading(true);
        try {
            const userData = await authService.loginService(data.username, data.password)
            console.log(userData)
            if(userData){
                const currentUser = await authService.getUserService()
                dispatch(login(currentUser));
                navigate('/')
            }
            
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false); // Reset loading state
        }
    } 
    if(loading){
        return(
            <span className='font-bold text-3xl text-white p-4 '>loading.....</span>
        )
    }
    return (
        <div className='bg-zinc-950 text-white p-4 w-full h-[88.1vh] flex justify-center items-center'>
            <form onSubmit={handleSubmit(loginHandler)} className='border-2 border-zinc-700 rounded-lg py-3 px-2 shadow-lg shadow-white/20' action="">
                <h1 className='py-3 px-2 font-bold text-xl text-center'>Login first bro !!!</h1>
                <div className='flex flex-col items-center py-3 px-2 gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="username">Username:</label>
                        <input
                            {...register("username", {
                                required: true
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' id="username" name="username" placeholder="username" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="password">Password:</label>
                        <input
                            {...register("password", {
                                required: true,
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="password" id="password" name="password" placeholder="password" />
                    </div>
                    <button type='submit' className='border-[#7d3c1994] hover:bg-[#FD772F] hover:text-black border-2 rounded-2xl px-2 py-1 font-semibold w-1/3'>Login</button>
                </div>
                <p className="mt-2 text-center text-base text-[#FD772F]">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/register"
                        className="font-medium text-primary transition-all duration-200 hover:underline hover:text-white"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login
