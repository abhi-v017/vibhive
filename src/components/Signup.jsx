import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0])
        }
    }

    const signupHandler = async (data) => {
        setError('')
        setLoading(true);
        
        try {
            const formData = new FormData()
            formData.append('fullName', data.fullName)
            formData.append('username', data.username)
            formData.append('email', data.email)
            formData.append('password', data.password)
            formData.append('bio', data.bio)
            formData.append('dob', data.dob)
            formData.append('location', data.location)
            if (avatar) {
                formData.append('avtar', avatar)
            }

            const userData = await authService.signUpService(formData)
            console.log(userData)
            navigate('/')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false); // Reset loading state
        }
    }
    return (
        <div className='bg-zinc-950 text-white p-4 w-full h-[88.1vh] flex justify-center items-center'>
            <form onSubmit={handleSubmit(signupHandler)} className='border-2 border-zinc-700 rounded-lg py-3 px-2 shadow-lg shadow-white/20' action="">
                <h1 className='py-3 px-2 font-bold text-xl text-center'>create your account bro !!!</h1>
                {error && <p className='text-red-500 text-sm text-center py-2'>{error}</p>}
                <div className='flex flex-col items-center py-3 px-2 gap-3 max-h-[70vh] overflow-y-auto'>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="fullName">Full Name:</label>
                        <input
                        {...register("fullName", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="text" id="fullName" name="fullName" placeholder="John Doe" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="username">Username:</label>
                        <input
                        {...register("username", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="text" id="username" name="username" placeholder="username" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="email">E-mail:</label>
                        <input
                        {...register("email", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="email" id="email" name="email" placeholder="abc@gmail.com" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="password">Password:</label>
                        <input
                        {...register("password", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="password" id="password" name="password" placeholder="password" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="bio">Bio:</label>
                        <textarea
                        {...register("bio", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' id="bio" name="bio" placeholder="Tell us about yourself" rows="3" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="dob">Date of Birth:</label>
                        <input
                        {...register("dob", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="date" id="dob" name="dob" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="location">Location:</label>
                        <input
                        {...register("location", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="text" id="location" name="location" placeholder="City, Country" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="avatar">Avatar (Profile Picture):</label>
                        <input
                        onChange={handleAvatarChange}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="file" id="avatar" name="avatar" accept="image/*" />
                    </div>
                    
                    <button type='submit' disabled={loading} className='border-[#7d3c1994] hover:bg-[#FD772F] hover:text-black border-2 rounded-2xl px-2 py-1 font-semibold w-1/3 disabled:opacity-50 disabled:cursor-not-allowed'>
                        {loading ? 'Signing up...' : 'Signup'}
                    </button>
                </div>
                <p className="mt-2 text-center text-base text-[#FD772F]">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline hover:text-white"
                    >
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Signup
