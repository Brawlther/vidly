import Customers from "../../schema/customers.js";

async function createCustomer(newCustomer) {
    const customer = new Customers(newCustomer);
    const result = await customer.save()
    return result;
}

export default createCustomer;