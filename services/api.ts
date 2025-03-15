const API_HOST = 'https://dattebayo-api.onrender.com';

export default async function fetchCharacters() {
    try{
        const response = await fetch(`${API_HOST}/characters`)
        if (!response.ok) {
            throw Error (`${response.status} - ${response.statusText}`);
        }
        return await response.json();

    } catch (error) {
        console.log("Erro ao buscar personagem: ", error)
        return[];
    }
}