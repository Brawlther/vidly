import Genre from '../../schema/genres.js';

async function createGenre(newGenre) {
    const genre = new Genre(newGenre);
    const result = await genre.save()
    return result;
}

export default createGenre;