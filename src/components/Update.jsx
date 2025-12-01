import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import profileService from '../services/profileService'
import { useSelector } from 'react-redux'


function Update() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)

    useEffect(() => {
        if (userData?.data) {
            setValue('username', userData.data.username || '')
            setValue('bio', userData.data.bio || '')
            if (userData.data.avtar) {
                setAvatarPreview(userData.data.avtar)
            }
        }
    }, [userData, setValue])

    if (!authStatus) {
        alert("You must be logged in to update the profile.");
        return;
    }

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setAvatar(file)
            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpdate = async (data) => {
        setError('');
        setLoading(true);
        try {
            const formData = new FormData()
            formData.append('username', data.username)
            formData.append('bio', data.bio)
            if (avatar) {
                formData.append('avtar', avatar)
            }

            const userProfile = await profileService.updateService(formData);
            console.log(userProfile);
            if (userProfile) {
                navigate('/profile');
            }
        } catch (error) {
            console.error("Update error:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    if(loading){
        return(
            <span className='font-bold text-3xl text-white p-4 '>loading.....</span>
        )
    }
    return (
        <div className='bg-zinc-950 text-white p-4 w-full h-[87.8vh] flex justify-center items-center'>
            <form onSubmit={handleSubmit(handleUpdate)} className='border-2 border-zinc-700 rounded-lg py-3 px-2 shadow-sm shadow-white/20 max-w-md w-full' action="">
                <h1 className='py-3 px-2 font-bold text-xl text-center'>Update Your Profile</h1>
                {error && <p className='text-red-500 text-sm text-center py-2'>{error}</p>}
                <div className='flex flex-col items-center py-3 px-2 gap-4'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label className='px-1' htmlFor="username">Username:</label>
                        <input
                            {...register("username", {
                                required: true
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' 
                            id="username" 
                            name="username" 
                            placeholder="username" 
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label className='px-1' htmlFor="bio">Bio:</label>
                        <textarea
                            {...register("bio", {
                                required: true
                            })}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' 
                            id="bio" 
                            name="bio" 
                            placeholder="Tell us about yourself" 
                            rows="4"
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label className='px-1' htmlFor="avatar">Avatar (Profile Picture):</label>
                        {avatarPreview && (
                            <img 
                                src={avatarPreview} 
                                alt="Avatar preview" 
                                className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border-2 border-zinc-700"
                            />
                        )}
                        <input
                            onChange={handleAvatarChange}
                            className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' 
                            type="file" 
                            id="avatar" 
                            name="avatar" 
                            accept="image/*" 
                        />
                    </div>
                </div>
                <div className='flex justify-center gap-3 mt-4'>
                    <button 
                        type='submit' 
                        disabled={loading}
                        className='border-[#7d3c1994] hover:bg-[#FD772F] hover:text-black border-2 rounded-2xl px-4 py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                    <button 
                        type='button'
                        onClick={() => navigate('/profile')}
                        className='border-zinc-600 hover:bg-zinc-600 border-2 rounded-2xl px-4 py-2 font-semibold'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Update
