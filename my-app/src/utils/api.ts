const getLLMPrice = async (
    imageUrls: any,
    description: any,
    latitude: any,
    longitude: any,
    username: any,
    model: any,
    { radiusInKm = 1000, searchDatabase = true } = {}
) => {
    const response = await fetch(
        "https://estimatelistingprice-cwjz6kyz6q-uc.a.run.app",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                imageUrls,
                description,
                latitude,
                longitude,
                radiusInKm,
                username, // required for Firestore username gate
                searchDatabase, // optional, default true
                model, // required Anthropic model (e.g., 'claude-3-haiku-20240307')
            }),
        }
    );
    if (!response.ok) {
        const err = await response.text();
        throw new Error(`${response.status} ${response.statusText}: ${err}`);
    }
    return response.json();
};

export { getLLMPrice };