/*
 * All Security Logic is written here
 * 
 * */
module.exports = function(server) {

    server.use(function(req, res, next) {
        var authkey = req.header("authkey");

        req.set("USERID", "TEST");
        var authHeader = req.header("authorization");
        return next();
    });
}
