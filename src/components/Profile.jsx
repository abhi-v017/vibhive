import React, { useEffect, useState } from 'react'
import profileService from '../services/profileService'
import { useNavigate } from 'react-router-dom';
import { Container, Post } from '../components'
import { useSelector } from 'react-redux';

function Profile() {
    const authStatus = useSelector((state) => state.auth.status)
    const [profile, setProfile] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();
    if (!authStatus) {
        alert("You must be logged in to see the profile.");
        return;
    }
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await profileService.getProfileService(); 
                if (response.success && response.data) {
                    setProfile(response.data);
                } else {
                    setError('No profile data available.');
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        profileService.getmyPosts().then((response) => {
            if (response && response.data.posts) {
                setPosts(response.data.posts);
            }
        })
    }, []);
    const followers = async () => {
        const username = await profile.account.username
        navigate(`/profile/${username}/followers`)
    }
    const followings = async () => {
        const username = await profile.account.username
        navigate(`/profile/${username}/followings`)
    }
    if (!profile) {
        return <div className="text-white">No profile data available.</div>;
    }

    const updateProfile = async () => {
        navigate('/update-profile')
    }
    if(loading){
        return(
            <span className='font-bold text-3xl text-white p-4 '>loading.....</span>
        )
    }
    console.log(profile)
    return (
        <div className="bg-zinc-950 profile flex flex-col gap-6 justify-center items-center h-[87.8vh]">
            <div className='flex justify-center flex-col text-white bg-zinc-950 border-2 border-zinc-900 rounded-xl py-3 px-2 my-1 shadow-md shadow-white/15'>
                <h1 className='text-center font-bold text-xl text-white'>Your Profile!!!</h1>
                <div className='flex justify-between gap-4 p-4'>
                    <img className='rounded-full inline-block w-28 h-28 object-cover' src={profile.avtar} alt='' />
                    <div className='flex flex-col justify-center'>
                        <div className='flex justify-between gap-4'>
                            <span className='inline-block text-xl font-bold underline m-2'>{profile.username}</span>
                            <button onClick={updateProfile} className='border-[#556e21a4] hover:bg-[#96C43B] hover:text-black text-white border-2 rounded-2xl px-2 py-1'>update</button>
                        </div>
                        <div>
                            <span onClick={followers} className='cursor-pointer inline-block text-xl font-bold underline m-2'>Followers: {profile.followersCount}</span>
                            <span onClick={followings} className='cursor-pointer inline-block text-xl font-bold underline m-2'>Following: {profile.followingCount}</span>
                        </div>
                        <span className='inline-block text-xl font-bold underline m-2'>{profile.email}</span>
                        <span className='inline-block text-xl font-bold underline m-2'>{profile.bio}</span>
                    </div>
                </div>
                <div className='flex flex-col items-start mx-4 w-1/2'>
                </div>
            </div>

            <div className='flex flex-wrap overflow-y-auto justify-center items-center py-2 w-full scroll-box'>
                <Container>
                    <div className='flex'>
                    {
                        posts.map((post) => (
                            <div className='p-2 w-full flex-[0 0 auto]' key={post._id}>
                                <Post content={post.content}
                                    images={post.images}
                                    tags={post.tags}
                                    likes={post.likes}
                                    isLiked={post.isLiked} />
                            </div>
                        ))}
                        </div>
                </Container>
            </div>
        </div>
    )
}

export default Profile
