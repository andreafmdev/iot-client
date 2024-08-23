// src/services/apiClient.ts
import axios from 'axios';
import { getToken } from './authService';
import { useLoaderStore } from '@store/loaderStore';

// Funzione per configurare gli interceptor per la gestione del loader
const configureLoaderInterceptors = (client) => {
  client.interceptors.request.use((config) => {
    const loaderStore = useLoaderStore();
    loaderStore.startLoading(); // Avvia il loader prima di ogni richiesta
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      const loaderStore = useLoaderStore();
      loaderStore.stopLoading(); // Ferma il loader dopo aver ricevuto una risposta
      return response;
    },
    (error) => {
      const loaderStore = useLoaderStore();
      loaderStore.stopLoading(); // Ferma il loader anche in caso di errore
      return Promise.reject(error);
    }
  );
};

// Funzione per configurare l'interceptor per l'autenticazione
const configureAuthInterceptor = (client) => {
  client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// Creazione del client privato con autenticazione e loader
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
configureAuthInterceptor(apiClient); // Aggiunge solo l'autenticazione al client privato
configureLoaderInterceptors(apiClient); // Aggiunge la gestione del loader

// Creazione del client pubblico solo con gestione del loader
const publicApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
configureLoaderInterceptors(publicApiClient); // Aggiunge solo la gestione del loader


const externalApiClient = axios.create();
configureLoaderInterceptors(externalApiClient); // Aggiunge solo la gestione del loader


export { apiClient, publicApiClient,externalApiClient };
