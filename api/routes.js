module.exports = function(server, restify) {

    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
        res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
        next();
    });

    server.get('*', (req, res, next) => {
        return next(new errors.NotAcceptableError("Method or Path was not found or not acceptable by server"));
    });
    server.post('*', (req, res, next) => {
        return next(new errors.NotAcceptableError("Method or Path was not found or not acceptable by server"));
    });


}
