import Rental from "../../schema/rentals.js";

async function readRental(id) {
    const rental = await Rental.findById(id);
    return rental;
}

async function readRentals() {
    const rentals = await Rental.find();
    return rentals;
}

export { readRental, readRentals };