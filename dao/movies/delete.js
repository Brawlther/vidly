import Movie from "../../schema/movies.js";

async function deleteMovie(id) {
    const movie = await Movie.findByIdAndDelete(id);
    return movie;
}

export default deleteMovie;