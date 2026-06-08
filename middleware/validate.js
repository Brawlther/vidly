export function validate(validator) {
    return (req, res, next) => {
        const result = validator(req.body);
        if (!result.valid) {
            return res.status(400).send({
                error: 'Request data is invalid.',
                details: result.errors
            });
        }
        next();
    };
}