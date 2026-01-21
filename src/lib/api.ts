import axios from 'axios';
import {BASE_URL} from '../../env'

export class ApiSettings {
    public apiUrl: string;
    private headers: Record<string, string>;

    constructor() {
        this.apiUrl = BASE_URL;

        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const token = localStorage.getItem('token');
        if (token) {
            this.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    setToken(token: string) {
        this.headers['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    }

    clearToken() {
        delete this.headers['Authorization'];
        localStorage.removeItem('token');
    }

    async get(endpoint: string, params: Record<string, any> = {}) {
        try {
            const response = await axios.get(`${this.apiUrl}${endpoint}`, {
                headers: this.headers,
                params: params
            });
            return response.data;
        } catch (error) {
            console.error('API GET Error:', error);
            this.handleApiError(error);
            throw error;
        }
    }

    async post(endpoint: string, data: any, isFormData: boolean = false) {
        try {
            const headers = {...this.headers};

            if (isFormData) {
                delete headers['Content-Type'];
            }

            const response = await axios.post(`${this.apiUrl}${endpoint}`, data, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            console.error('API POST Error:', error);
            this.handleApiError(error);
            throw error;
        }
    }

    async put(endpoint: string, data: any, isFormData: boolean = false) {
        try {
            const headers = {...this.headers};

            if (isFormData) {
                delete headers['Content-Type'];
            }

            const response = await axios.put(`${this.apiUrl}${endpoint}`, data, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            console.error('API PUT Error:', error);
            this.handleApiError(error);
            throw error;
        }
    }

    async delete(endpoint: string) {
        try {
            const response = await axios.delete(`${this.apiUrl}${endpoint}`, {
                headers: this.headers
            });
            return response.data;
        } catch (error) {
            console.error('API DELETE Error:', error);
            this.handleApiError(error);
            throw error;
        }
    }

    private handleApiError(error) {
        if (error.response) {

            if (error.response.status === 401 &&
                error.response.data?.message === 'Your account is not active') {
                window.location.href = '/inactive';
                return;
            }

            if(error.response.status === 301 && error.response.data?.message === 'Your account is blocked') {
                window.location.href = '/blocked';
                return;
            }
        }
    }
}

const api = new ApiSettings();
export default api;