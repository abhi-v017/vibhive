import React, { useEffect, useState } from 'react'
import { Follow } from '../components'
import { useParams } from 'react-router-dom'
import followService from '../services/followService'

function Following() {
    const [followings, setFollowings] = useState([])
    const { username } = useParams();
    
    useEffect(() => {
        const followings = async () => {
            try {
                const response = await followService.followingListService(username)
                setFollowings(response.data.following)

            } catch (error) {
                console.error('Error getting followings:', error.message);
            }
        }
        followings()
    }, [username])
    console.log(followings)
    if (followings.length == 0) {
        return (
            <div className='bg-zinc-900 h-[88.1vh]'>
                <span className='text-white font-bold text2xl m-2'>no followings yet!!!</span>
            </div>
        )
    }
    return (
        <div className='bg-zinc-900 flex flex-col items-center justify-center h-[88.1vh] gap-4 overflow-y-auto py-4'>
            {followings.map((following) => (
                <div className='w-full flex justify-center' key={following._id}>
                    <Follow
                        avatar={following.avtar || following.avatar?.url || ''}
                        username={following.username}
                    />
                </div>
            ))}

        </div>
    )
}

export default Following
