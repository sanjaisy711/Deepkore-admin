import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { AuthService } from './admin/admin-shared/guard/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(private authService: AuthService) {
    this.axiosInstance = axios.create({
      // baseURL: 'https://admin.api.worksbyte.com/',
      baseURL: 'http://localhost:3001/',
      // Set your base URL here
      timeout: 5000,
    });

    // Optional: Add interceptors for request/response
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Modify the request config before sending it
        const token = this.authService.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle response error
        return Promise.reject(error);
      }
    );
  }

  // Define HTTP methods (get, post, put, delete, etc.)
  public get<T>(url: string, params?: any) {
    return this.axiosInstance.get<T>(url, { params });
  }

  public post<T>(url: string, data: any) {
    return this.axiosInstance.post<T>(url, data);
  }

  public put<T>(url: string, data: any) {
    return this.axiosInstance.put<T>(url, data);
  }

  public delete<T>(url: string) {
    return this.axiosInstance.delete<T>(url);
  }
}
