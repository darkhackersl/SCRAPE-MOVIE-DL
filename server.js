const express = require('express');
const { SinhalaSub } = require('@sl-code-lords/movie-api');
const { PixaldrainDL } = require('pixaldrain-sinhalasub');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// API to search movies
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Query parameter is required' });

    try {
        const result = await SinhalaSub.get_list.by_search(query);
        if (!result.status || result.results.length === 0) {
            return res.status(404).json({ error: 'No results found' });
        }
        res.json(result.results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API to fetch movie details
app.get('/api/movie', async (req, res) => {
    const link = req.query.link;
    if (!link) return res.status(400).json({ error: 'Link parameter is required' });

    try {
        const movieDetails = await SinhalaSub.movie(link);
        if (!movieDetails || !movieDetails.status || !movieDetails.result) {
            return res.status(404).json({ error: 'Movie details not found' });
        }
        res.json(movieDetails.result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API to download movie
app.get('/api/download', async (req, res) => {
    const { link, quality } = req.query;
    if (!link || !quality) {
        return res.status(400).json({ error: 'Link and quality parameters are required' });
    }

    try {
        const directLink = await PixaldrainDL(link, quality, 'direct');
        if (!directLink) {
            return res.status(404).json({ error: 'Download link not found' });
        }
        res.json({ directLink });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
