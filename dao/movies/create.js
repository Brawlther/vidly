import Movie from "../../schema/movies.js";

async function createMovie(newMovie) {
    const movie = new Movie(newMovie);
    const result = await movie.save()
    return result;
}

export default createMovie;