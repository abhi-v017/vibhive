import React, { useState } from 'react'
import profileService from '../services/profileService'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Createpost() {
    const authStatus = useSelector((state) => state.auth.status)
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState(null);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    if (!authStatus) {
        alert("You must be logged in to create a post.");
        return;
    }
    const handleImageChange = (event) => {
        setImages(event.target.files);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('content', content);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        tagsArray.forEach((tag, ind) => {
            formData.append(`tags[${ind}]`, tag);
        });
        setError('')
        setLoading(true);
        try {
            console.log(formData)
            const userData = await profileService.CreatePostService(formData)
            console.log(userData)
            navigate('/')
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
            <div className='bg-zinc-950 h-[87.8vh] flex items-center justify-center text-white'>
            <div className='w-1/2 max-md:w-[80%] border-2 border-zinc-900 rounded-xl bg-zinc-950 p-4 shadow-md shadow-white/15'>
                <h1 className='text-center font-bold text-2xl p-2 max-md:text-xl'>Create post!........ </h1>
                <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-start'>
                    <div className='flex justify-center items-start flex-col gap-4 text-lg m-2 max-md:text-base max-md:w-full'>
                        <label htmlFor="images">Upload Image/Video:</label>
                        <input
                            className='rounded-xl m-1 border-2 border-zinc-900 w-[70%] bg-transparent'
                            type="file"
                            id="images"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                            required
                        />
                    </div>
                    <div className='flex justify-center items-start flex-col gap-4 text-lg m-2 max-md:w-[100%] max-md:text-base'>
                        <label htmlFor="content">content:</label>
                        <input
                            className='bg-transparent border-2 border-zinc-900 rounded-lg px-2 py-1'
                            type="text"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter post Content"
                            required
                        />
                    </div>
                    <div className='flex justify-center items-start flex-col gap-4 text-lg m-2 max-md:w-[100%] max-md:text-base'>
                        <label htmlFor="tags">Tags (comma separated):</label>
                        <input
                            className='bg-transparent border-2 border-zinc-900 rounded-lg px-2 py-1'
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter tags"
                        />
                    </div>
                        <button className='border-[#7d3c1994] hover:bg-[#FD772F] hover:text-black border-2 my-2 rounded-2xl px-2 py-1 font-semibold w-1/3 max-md:w-[100%]  max-md:font-light' type="submit">Add Post</button>
                </form>
            </div>

        </div>
    )
}

export default Createpost
