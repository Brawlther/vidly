import mongoose from "mongoose";
import User from "../../schema/users.js";

async function createUser(newUser) {
    const user = new User(newUser);
    const result = await user.save();
    return result;
}

export default createUser;