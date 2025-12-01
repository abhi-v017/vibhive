import React from 'react'

function Container({ children }) {
    return (
        <div className='scroll-box h-full w-full'>
            {children}
        </div>
    )
}

export default Container
