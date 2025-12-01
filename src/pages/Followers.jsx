import React, { useEffect, useState } from 'react'
import { Follow } from '../components'
import { useParams } from 'react-router-dom'
import followService from '../services/followService'

function Followers() {
    const [followers, setFollowers] = useState([])
    const { username } = useParams();
    useEffect(() => {
        const followers = async () => {
            try {
                const response = await followService.followerListService(username)
                console.log(response)
                setFollowers(response.data.followers)
            } catch (error) {
                console.error('Error getting followers:', error.message);
            }
        }
        followers()
    }, [username])
    console.log(followers)
    if (followers.length == 0) {

        return (<div className='bg-zinc-900 h-[88.1vh]'>
            <span className='text-white font-bold text2xl m-2'>no followers yet!!!</span>
        </div>)
    }

    return (
        <div className='bg-zinc-950 flex flex-col items-center  h-[87.8vh] gap-4 overflow-y-auto py-4 '>
            <div className='border border-zinc-900 p-2 w-1/4 min-h-full rounded shadow-sm shadow-white/15' >
                {followers.map((follower) => (
                    <div className='w-full flex justify-center' key={follower._id}>
                        <Follow
                            avatar={follower.avtar || follower.avatar?.url || ''}
                            username={follower.username}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Followers
