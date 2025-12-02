import React, { useEffect, useState } from 'react'
import profileService from '../services/profileService'
import { Container, Post } from '../components'
import Chatbot from '../components/Chatbot'

function Home() {
    const [posts, setPosts] = useState([])
    const [isChatbotOpen, setIsChatbotOpen] = useState(false)

    useEffect(() => {
        profileService.getAllPosts().then((response) => {
            if (response && response.data.posts) {
                setPosts(response.data.posts);
            }
        })
    }, [])
    console.log(posts)
    return (
        <div className='min-h-[87.8vh] bg-zinc-950 scroll-box relative pt-2'>
            <Container>
                <div className='flex flex-wrap flex-col items-center py-2 scroll-box'>
                    {
                        posts.map((post) => (
                            <div className='p-2 w-1/3 flex-[0 0 auto] max-md:w-[60%]' key={post._id}>
                                <Post content={post.content}
                                    images={post.images}
                                    tags={post.tags}
                                    postId={post._id}
                                    isLiked={post.isLiked}
                                    likes={post.likes}/>
                            </div>
                        ))}
                </div>
            </Container>
            
            {/* Floating Chatbot Button */}
            <button
                onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 max-md:bottom-16 max-md:right-2 ${
                    isChatbotOpen 
                        ? 'bg-[#FD772F] hover:bg-[#c95f1f]' 
                        : 'bg-[#FD772F] hover:bg-[#c95f1f]'
                } flex items-center justify-center text-white`}
                aria-label="Toggle Chatbot"
            >
                {isChatbotOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>

            {/* Chatbot Modal */}
            {isChatbotOpen && (
                <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] max-md:w-[calc(100%-3rem)] max-md:right-4 max-md:bottom-20 rounded-lg shadow-2xl overflow-hidden border border-zinc-700 bg-[#0D1117]">
                    <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
                </div>
            )}
        </div>
    )
}

export default Home
