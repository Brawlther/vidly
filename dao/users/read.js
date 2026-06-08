import User from "../../schema/users.js";

async function readUser(id) {
    const user = await User.findById(id);
    return user;
}

async function readUsers() {
    const users = await User.find();
    return users;
}

export { readUser, readUsers };