function admin(req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(403).send('Access denied. Not an admin.');
    }
    next();
}

export { admin };