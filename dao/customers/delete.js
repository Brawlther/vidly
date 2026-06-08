import Customers from "../../schema/customers.js";

async function deleteCustomer(id) {
    const customer = await Customers.findByIdAndDelete(id);
    return customer;
}

export default deleteCustomer;