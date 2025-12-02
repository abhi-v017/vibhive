import axios from 'axios';
export class AuthService {
    async loginService(username, password) {
        const options = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            withCredentials: true,
            data: { password, username }
        };
        try {
            const { data } = await axios.request(options);
            return data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }
    async getUserService() {
        const options = {
            method: 'GET',
            url: `${import.meta.env.VITE_API_URL}/api/v1/users/current-user`,
            headers: { accept: 'application/json' },
            withCredentials: true,
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }

    async signUpService(formData) {
        const options = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/api/v1/users/register`,
            headers: { 
                accept: 'application/json',
                'content-type': 'multipart/form-data',
            },
            withCredentials: true,
            data: formData
        };
        try {
            const response = await axios.request(options);
            return response?.data || null
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Signup failed');
        }
    }

    async logoutService() {
        const options = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
            headers: { accept: 'application/json' },
            withCredentials: true,
        };
        try {
            const { data } = await axios.request(options)
            return data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Logout failed');
        }
    }
}


const authService = new AuthService();


export default authService