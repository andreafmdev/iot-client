import { externalApiClient } from './apiClient';


export const generateAvatar = async (name: string): Promise<string> => {
    try {
        const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

        const response = await externalApiClient.get(url);
        return response.config.url || ''; // Ritorna l'URL dell'immagine generata
    } catch (error) {
        console.error('Failed to generate avatar:', error);
        throw new Error('Avatar generation failed');
    }
};

