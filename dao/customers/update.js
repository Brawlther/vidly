import Customers from "../../schema/customers.js";

async function updateCustomer(id, updatedCustomer) {
    const customer = await Customers.findByIdAndUpdate(id, updatedCustomer, { returnDocument: 'after' });
    return customer;
}

export default updateCustomer;