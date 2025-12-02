import axios from "axios";

export class LikeService {
    async likePostService(postId) {
        const options = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/api/v1/likes/like/${postId}`,
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
}

const likeService = new LikeService();
export default likeService