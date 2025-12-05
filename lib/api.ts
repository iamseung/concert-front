const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  userEmail: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequest {
  userName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  userId: number;
}

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Sign up failed');
    }

    return response.json();
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  }

  async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });

    if (response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { accessToken } = await this.refreshToken(refreshToken);
          localStorage.setItem('accessToken', accessToken);

          return fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers: {
              ...this.getAuthHeaders(),
              ...options.headers,
            },
          });
        } catch (error) {
          localStorage.clear();
          window.location.href = '/login';
          throw error;
        }
      }
    }

    return response;
  }
}

export const api = new ApiClient();
