import Genre from '../../schema/genres.js';

async function updateGenre(id, updatedGenre) {
    const genre = await Genre.findByIdAndUpdate(id, {
        $set: {
            ...updatedGenre,
        }
    }, { returnDocument: 'after' })
    return genre
}

export default updateGenre;