import axios from "axios";


export class FollowService {
    async followUserService(userId) {
        const options = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/api/v1/follows/follow/${userId}`,
            headers: { accept: 'application/json' },
            withCredentials: true,
        };
        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(error.response?.data?.message || 'Failed to follow/unfollow user');
        }
    }
    async followerListService(username) {
        const options = {
            method: 'GET',
            url: `${import.meta.env.VITE_API_URL}/api/v1/follows/followers-list/${username}`,
            params: { page: '1', limit: '5' },
            headers: { accept: 'application/json' },
            withCredentials: true,
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(error.response?.data?.message || 'Failed to fetch followers');
        }
    }
    async followingListService(username) {
        const options = {
            method: 'GET',
            url: `${import.meta.env.VITE_API_URL}/api/v1/follows/following-list/${username}`,
            params: { page: '1', limit: '5' },
            headers: { accept: 'application/json' },
            withCredentials: true,
        };
        try {
            const { data } = await axios.request(options);
            return data
        } catch (error) {
            console.error(error);
            throw new Error(error.response?.data?.message || 'Failed to fetch following list');
        }
    }
}

const followService = new FollowService();
export default followService