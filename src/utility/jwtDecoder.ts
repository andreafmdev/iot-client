import { jwtDecode } from "jwt-decode";
export interface JsonWebToken {
    userId: number | null;
    email: string | null;
    iat: number ;
    exp: number;
}
export async function decodeJwt(jwt: string): Promise<JsonWebToken | null> {
    try {
        // Decodifica il JWT usando la libreria jwt-decode
        const decodedToken = jwtDecode<JsonWebToken>(jwt);

        // Facoltativo: Verifica se il token è scaduto
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            console.warn("JWT has expired");
            return null;
        }
        return decodedToken;

    } catch (error) {
        // Gestisci eventuali errori di decodifica
        console.error("Failed to decode JWT:", error);
        return null;
    }

}





