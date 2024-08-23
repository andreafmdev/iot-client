import { defineStore } from 'pinia';
import { login as loginService } from '@/services/authService';

import { decodeJwt } from '@/utility/jwtDecoder';
import { LoginRequest } from '@/types/AuthTypes';
import { generateAvatar } from '@services/avatarService';

// Define the interface for the state
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userId: number | null;
  userEmail: string | null;
  avatarUrl: string | null; // Aggiungi l'avatar URL allo stato

}

// Define the store
export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    token: null,
    isAuthenticated: false,
    userId: null,
    userEmail: null,
    avatarUrl: null,

  }),

  actions: {
    async login(loginReq: LoginRequest) {
      try {
        const response = await loginService(loginReq);
        if (response) {

          if (response.token) {
            this.token = response.token;

            localStorage.setItem('authToken', response.token);

            // Decode the JWT to get user info
            const decodedJwt = await decodeJwt(response.token);

            this.userId = decodedJwt?.userId!;
            this.userEmail = decodedJwt?.email!;
            this.isAuthenticated = true;

            if (this.userEmail) {
              this.avatarUrl = await generateAvatar(this.userEmail);
            }
          }


        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    },

    logout() {
      this.token = null;
      this.isAuthenticated = false;
      this.avatarUrl = null; // Resetta l'avatar

      localStorage.removeItem('authToken');

    },
    async checkAuthStatus() {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedJwt = await decodeJwt(token);
        const currentTime = Date.now() / 1000;

        if (decodedJwt && decodedJwt.exp > currentTime) {
          this.token = token;
          this.userId = decodedJwt.userId;
          this.userEmail = decodedJwt.email;
          this.isAuthenticated = true;  // Mark as authenticated if token is valid
        } else {
          this.logout();  // Logout if the token is expired
        }
      } else {
        this.logout();
      }
    }
  },
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  }
});
