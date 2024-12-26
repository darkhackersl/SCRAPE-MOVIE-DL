async function searchMovies() {
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
    }
}
