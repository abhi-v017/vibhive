import axios from "axios";
export class ProfileService {
    async CreatePostService(data) {
        const options = {
            method: 'POST',
            url: `${import.meta.env.API_URL}/api/v1/posts/create-post`,
            headers: { accept: 'application/json', 'content-type': 'multipart/form-data' },
            data: data
        }
        try {
            const { data } = await axios.request(options)
            return data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Post Creation Failed!!');
        }
    }
    async getProfileService() {
        const options = {
            method: 'GET',
            url: `${import.meta.env.API_URL}/api/v1/users/`,
            headers: { accept: 'application/json' }
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
    async updateService(formData) {
        const options = {
            method: 'PATCH',
            url: `${import.meta.env.API_URL}/api/v1/users/update-details`,
            headers: { 
                accept: 'application/json',
                'content-type': 'multipart/form-data'
            },
            data: formData
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }
    async getAllPosts() {
        const options = {
            method: 'GET',
            url: `${import.meta.env.API_URL}/api/v1/posts/all-posts`,
            params: { page: '1', limit: '10' },
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async getmyPosts() {
        const options = {
            method: 'GET',
            url: `${import.meta.env.API_URL}/api/v1/posts/get/my`,
            params: { page: '1', limit: '10' },
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async getProfileByUsername(username) {
        const options = {
            method: 'GET',
            url: `${import.meta.env.API_URL}/api/v1/users/c/${username}`,
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            console.log(data)
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async getPostByUsername(username) {
        const options = {
            method: 'GET',
            url: `${import.meta.env.API_URL}/api/v1/posts/get/u/${username}`,
            params: { page: '1', limit: '6' },
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }


    }
    async getPostById(postId) {
        const options = {
            method: 'GET',
            url: `${import.meta.env.API_URL}/api/v1/posts/get/${postId}`,
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
    async deletePost() {

    }
}

const profileService = new ProfileService();
export default profileService