document.addEventListener('DOMContentLoaded', () => {
    displayDefaultMovies();
});

async function displayDefaultMovies() {
    const response = await fetch(`https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=popular`);
    const data = await response.json();
    
    const defaultMoviesContainer = document.getElementById('defaultMovies');
    defaultMoviesContainer.innerHTML = '';
    
    if (data.status && data.result) {
        const movies = data.result.data;
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            
            movieElement.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>${movie.imdb}</p>
                <p>${movie.year}</p>
                <a href="${movie.link}" target="_blank">Watch Now</a>
            `;
            
            defaultMoviesContainer.appendChild(movieElement);
        });
    } else {
        defaultMoviesContainer.innerHTML = '<p>No movies found</p>';
    }
}

/*async function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;
    const response = await fetch(`https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=${encodeURIComponent(searchInput)}`);
    const data = await response.json();
    
    const movieContainer = document.getElementById('movieContainer');
    movieContainer.innerHTML = '';
    
    if (data.status && data.result) {
        const movies = data.result.data;
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            
            movieElement.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>${movie.imdb}</p>
                <p>${movie.year}</p>
                <a href="${movie.link}" target="_blank">Watch Now</a>
            `;
            
            movieContainer.appendChild(movieElement);
        });
    } else {
        movieContainer.innerHTML = '<p>No movies found</p>';
    }*/

    // Add active class to body and header for animation and color change
    document.body.classList.add('active');
    document.querySelector('header').classList.add('active');
}

async function loadTvShowDetails() {
    const response = await fetch(`https://www.dark-yasiya-api.site/movie/sinhalasub/tvshow?url=https://sinhalasub.lk/tvshows/game-of-thrones-2011-sinhala-subtitles/`);
    const data = await response.json();
    
    const tvShowContainer = document.getElementById('tvShowContainer');
    tvShowContainer.innerHTML = '';

    if (data.status && data.result) {
        const tvShow = data.result.data;
        const tvShowElement = document.createElement('div');
        tvShowElement.classList.add('tvShow');
        
        tvShowElement.innerHTML = `
            <img src="${tvShow.image}" alt="${tvShow.title}">
            <h2>${tvShow.title}</h2>
            <p><strong>IMDB:</strong> ${tvShow.imdb}</p>
            <p><strong>Release Date:</strong> ${tvShow.date}</p>
            <p><strong>Categories:</strong> ${tvShow.category.join(', ')}</p>
            <p><strong>Description:</strong> ${tvShow.desc}</p>
            <p><strong>Director:</strong> ${tvShow.director}</p>
            <p><strong>Cast:</strong> ${tvShow.cast.map(c => `<a href="${c.cast_link}" target="_blank">${c.reall_name} (${c.cast_name})</a>`).join(', ')}</p>
            <h3>Episodes</h3>
            <div id="episodes">
                ${tvShow.episodes.map(e => `<div class="episode"><a href="${e.episode_link}" target="_blank">${e.title} - ${e.date}</a></div>`).join('')}
            </div>
        `;
        
        tvShowContainer.appendChild(tvShowElement);
    } else {
        tvShowContainer.innerHTML = '<p>No TV show details found</p>';
    }
}

// Load TV show details when page loads
loadTvShowDetails();
