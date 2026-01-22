import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../env';

export class ApiSettings {
    public apiUrl: string;
    private token: string | null = null;
    private axiosInstance;

    constructor() {
        this.apiUrl = BASE_URL;
        
        // Axios instance yaratish
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        // Request interceptor - har bir so'rovda token qo'shish
        this.axiosInstance.interceptors.request.use(
            (config) => {
                if (this.token) {
                    config.headers.Authorization = `Bearer ${this.token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor - xatolarni boshqarish
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                this.handleApiError(error);
                return Promise.reject(error);
            }
        );

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
        const response = await this.axiosInstance.get(endpoint, { params });
        return response.data;
    }

    async post(endpoint: string, data: any, isFormData: boolean = false) {
        const config: any = {};
        
        if (isFormData) {
            config.headers = {
                'Content-Type': 'multipart/form-data'
            };
        }

        const response = await this.axiosInstance.post(endpoint, data, config);
        return response.data;
    }

    async put(endpoint: string, data: any, isFormData: boolean = false) {
        const config: any = {};
        
        if (isFormData) {
            config.headers = {
                'Content-Type': 'multipart/form-data'
            };
        }

        const response = await this.axiosInstance.put(endpoint, data, config);
        return response.data;
    }

    async delete(endpoint: string) {
        const response = await this.axiosInstance.delete(endpoint);
        return response.data;
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