import Movie from "../../schema/movies.js";

async function updateMovie(id, updatedMovie) {
    const movie = await Movie.findByIdAndUpdate(
        id,
        { $set: updatedMovie },
        { returnDocument: 'after', runValidators: true }
    );
    return movie;
}

export default updateMovie;