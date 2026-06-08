import Genre from '../../schema/genres.js';

async function findGenres() {
    const genres = await Genre.find();
    return genres;
}

async function findGenreById(id){
    const genre = await Genre.findById(id);
    return genre;
}

export { findGenres, findGenreById };