import Customers from "../../schema/customers.js";

async function readCustomer(id) {
    const customer = await Customers.findById(id);
    return customer;
}

async function readCustomers() {
    const customers = await Customers.find();
    return customers;
}

export { readCustomer, readCustomers };