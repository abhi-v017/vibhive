import axios from 'axios';
export class AuthService {
    async loginService(username, password) {
        const options = {
            method: 'POST',
            url: '/api/v1/users/login',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
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
            url: '/api/v1/users/current-user',
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

    async signUpService(formData) {
        const options = {
            method: 'POST',
            url: '/api/v1/users/register',
            headers: { 
                accept: 'application/json',
                'content-type': 'multipart/form-data'
            },
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
            url: '/api/v1/users/logout',
            headers: { accept: 'application/json' },
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