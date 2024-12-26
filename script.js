document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value.trim();
    if (!query) {
        alert('Please enter a movie name');
        return;
    }

    // Fetch search results
    const response = await fetch(`/api/search?q=${query}`);
    const results = await response.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.error) {
        resultsDiv.innerHTML = `<p>No results found</p>`;
        return;
    }

    results.forEach((movie, index) => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.textContent = `${index + 1}. ${movie.title}`;
        item.addEventListener('click', () => fetchMovieDetails(movie.link));
        resultsDiv.appendChild(item);
    });
});

async function fetchMovieDetails(link) {
    const response = await fetch(`/api/movie?link=${link}`);
    const movie = await response.json();

    const detailsDiv = document.getElementById('movie-details');
    detailsDiv.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Country:</strong> ${movie.country}</p>
        <p><strong>Duration:</strong> ${movie.duration}</p>
        <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
        <p><strong>IMDB Rating:</strong> ${movie.IMDb_Rating}</p>
        <button onclick="downloadMovie('${link}', 'SD 480p')">Download 480p</button>
        <button onclick="downloadMovie('${link}', 'HD 720p')">Download 720p</button>
        <button onclick="downloadMovie('${link}', 'FHD 1080p')">Download 1080p</button>
    `;
}

async function downloadMovie(link, quality) {
    const response = await fetch(`/api/download?link=${link}&quality=${quality}`);
    const { directLink } = await response.json();

    if (directLink) {
        window.open(directLink, '_blank');
    } else {
        alert('Download link not available');
    }
}
