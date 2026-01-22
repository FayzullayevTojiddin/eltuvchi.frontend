import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../env';

export class ApiSettings {
    public apiUrl: string;
    private token: string | null = null;

    constructor() {
        this.apiUrl = BASE_URL;
        
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            this.token = savedToken;
        }
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    async get(endpoint: string, params: Record<string, any> = {}) {
        try {
            const config: any = {
                params: params
            };

            // Token borsa headers qo'shamiz
            if (this.token) {
                config.headers = {
                    'Authorization': `Bearer ${this.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                };
            }

            const response = await axios.get(`${this.apiUrl}${endpoint}`, config);
            return response.data;
        } catch (error) {
            this.handleApiError(error as AxiosError);
            throw error;
        }
    }

    async post(endpoint: string, data: any, isFormData: boolean = false) {
        try {
            const config: any = {};

            if (this.token) {
                config.headers = {
                    'Authorization': `Bearer ${this.token}`,
                    'Accept': 'application/json'
                };

                if (!isFormData) {
                    config.headers['Content-Type'] = 'application/json';
                }
            } else if (!isFormData) {
                config.headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };
            }

            const response = await axios.post(`${this.apiUrl}${endpoint}`, data, config);
            return response.data;
        } catch (error) {
            this.handleApiError(error as AxiosError);
            throw error;
        }
    }

    async put(endpoint: string, data: any, isFormData: boolean = false) {
        try {
            const config: any = {};

            if (this.token) {
                config.headers = {
                    'Authorization': `Bearer ${this.token}`,
                    'Accept': 'application/json'
                };

                if (!isFormData) {
                    config.headers['Content-Type'] = 'application/json';
                }
            } else if (!isFormData) {
                config.headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };
            }

            const response = await axios.put(`${this.apiUrl}${endpoint}`, data, config);
            return response.data;
        } catch (error) {
            this.handleApiError(error as AxiosError);
            throw error;
        }
    }

    async delete(endpoint: string) {
        try {
            const config: any = {};

            if (this.token) {
                config.headers = {
                    'Authorization': `Bearer ${this.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                };
            }

            const response = await axios.delete(`${this.apiUrl}${endpoint}`, config);
            return response.data;
        } catch (error) {
            this.handleApiError(error as AxiosError);
            throw error;
        }
    }

    private handleApiError(error: AxiosError<any>) {
        if (!error.response) {
            return;
        }

        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 401 && message === 'Your account is not active') {
            this.clearToken();
            window.location.href = '/inactive';
            return;
        }

        if (status === 403 && message === 'Your account is blocked') {
            this.clearToken();
            window.location.href = '/blocked';
            return;
        }

        if (status === 401) {
            this.clearToken();
            return;
        }
    }
}

const api = new ApiSettings();
export default api;