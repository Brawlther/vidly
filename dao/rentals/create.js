import mongoose from "mongoose";
import Rental from "../../schema/rentals.js";
import Movie from "../../schema/movies.js";
import Customer from "../../schema/customers.js";

function createHttpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
}

async function createRental(newRental) {
    const session = await mongoose.startSession();
    let createdRental;

    try {
        await session.withTransaction(async () => {
            const customer = await Customer.findById(newRental.customerId).session(session);
            if (!customer) {
                throw createHttpError(404, "The customer with given id was not found.");
            }

            const movie = await Movie.findById(newRental.movieId).session(session);
            if (!movie) {
                throw createHttpError(404, "The movie with given id was not found.");
            }

            if (movie.numberInStock <= 0) {
                throw createHttpError(400, "Movie is out of stock.");
            }

            const [rental] = await Rental.create([{
                customer: {
                    _id: customer._id,
                    isGold: customer.isGold,
                    name: customer.name,
                    phone: customer.phone,
                },
                movie: {
                    _id: movie._id,
                    title: movie.title,
                    genre: movie.genre,
                    numberInStock: movie.numberInStock,
                    dailyRentalRate: movie.dailyRentalRate,
                },
            }], { session });

            movie.numberInStock -= 1;
            await movie.save({ session });

            createdRental = rental;
        });

        return createdRental;
    } finally {
        await session.endSession();
    }
}

export default createRental;