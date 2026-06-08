import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String,
})

const Customer = mongoose.model('customers', customerSchema);

export { customerSchema };
export default Customer;