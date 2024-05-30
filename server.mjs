import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import axios from 'axios';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API; // Replace with your actual Google Places API key
app.get('/places', async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {}, {
            params: {
                query: query,
                key: key
            }
        });

        const places = response.data.results.map(place => ({
            id: place.place_id,
            label: place.name,
            geo: place.geometry.location
        }));

        res.send({ places });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.get('/getdistance', async (req, res) => {
    const { start, destinations } = req.query;
    // const apiKey = 'YOUR_API_KEY'; // Replace with your actual Google Places API key
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=place_id:${destinations}&origins=place_id:${start}&units=imperial&mode=driving&key=${key}`);
        console.log(response);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(200).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
