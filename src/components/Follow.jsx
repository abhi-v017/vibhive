import React from 'react'

function Follow({avatar, username}) {

    return (
        <div className='flex items-center gap-4  border-b border-zinc-900 bg-zinc-950 text-white px-2'>
            <img className='w-12 h-12 rounded-full object-cover m-2' src={avatar} alt="" />
            <span>{username}</span>
        </div>
    )
}

export default Follow
