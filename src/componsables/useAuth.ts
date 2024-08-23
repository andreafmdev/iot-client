// src/composables/useAuth.ts
import { ref, computed } from 'vue';
import { isLoggedIn, logout, getToken } from '@/services/authService';
import { decodeJwt } from '@/utility/jwtDecoder';

export function useAuth() {
  // Creiamo una variabile reattiva che dice se l'utente è loggato
  const loggedIn = ref(isLoggedIn());

  // Creiamo una computed property che decodifica il JWT per ottenere informazioni sull'utente
  const userInfo = computed(() => {
    const token = getToken();
    return token ? decodeJwt(token) : null;
  });

  // Funzione per gestire il logout
  const handleLogout = () => {
    logout();
    loggedIn.value = false;
  };

  // Ritorniamo tutto quello che ci serve per usarlo nei componenti
  return {
    loggedIn,
    userInfo,
    handleLogout,
  };
}
