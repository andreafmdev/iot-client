// src/services/authService.ts
import {publicApiClient} from './apiClient';

import { LoginRequest,LoginResponse } from '@/types/AuthTypes'
import {decodeJwt,JsonWebToken} from "@/utility/jwtDecoder"
export async function login(loginRequest: LoginRequest): Promise<LoginResponse | null> {
    try {
        // Effettua la richiesta di login
        const response = await publicApiClient.post<LoginResponse>('/auth/login', loginRequest);
        
        // Salva il token se la richiesta è andata a buon fine
        saveToken(response.data.token);
        
        // Ritorna i dati della risposta
        return response.data;
    } catch (error) {
        // Gestisci l'errore e stampa l'errore nella console
        console.error("Login failed:", error);

        // Puoi anche aggiungere logica per mostrare messaggi di errore all'utente

        // Ritorna null in caso di errore
        return null;
    }
}


export function saveToken(token: string) {
    localStorage.setItem('authToken', token);
}

export function getToken(): string | null {
    return localStorage.getItem('authToken');
}

export function isLoggedIn(): boolean {
    return !!getToken();
}

export function logout() {
    localStorage.removeItem('authToken');
}


