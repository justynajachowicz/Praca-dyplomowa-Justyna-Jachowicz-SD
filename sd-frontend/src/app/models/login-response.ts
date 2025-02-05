export interface LoginResponse {
    token: string;
    user?: {
        email: string;
        role: string;
    };
}
