import Movie from "../../schema/movies.js";

async function readMovie(id) {
    const movie = await Movie.findById(id);
    return movie;
}

async function readMovies() {
    const movies = await Movie.find();
    return movies;
}

export { readMovie, readMovies };