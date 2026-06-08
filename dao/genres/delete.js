import Genre from '../../schema/genres.js';

async function removeGenre(id) {
    const genre = await Genre.findByIdAndDelete({_id: id})
    return genre
}

export default removeGenre;