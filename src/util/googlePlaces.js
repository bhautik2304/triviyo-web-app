export async function searchPlaces(query) {
    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching places:', error);
        return [];
    }
}