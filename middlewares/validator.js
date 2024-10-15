function validateBody(schema) {
    return (req, res, next) => {
        const isGetRequest = req.method === 'GET';
        const { error } = isGetRequest ? schema.validate(req.params) : schema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: "Bad Request", error: error.details });
        }
        next();
    };
}
module.exports = validateBody;
