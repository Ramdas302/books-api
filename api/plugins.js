
module.exports = function (server, restify) {
    server.pre(restify.plugins.pre.context());
    server.pre(restify.plugins.pre.dedupeSlashes());
    server.pre(restify.plugins.pre.sanitizePath());

    server.use(restify.plugins.bodyParser({
        mapParams: false,
        allowDots: true,
        maxBodySize: 0,
        overrideParams: false,
        maxFieldsSize: 2 * 1024 * 1024
    }));
    server.use(restify.plugins.urlEncodedBodyParser());
    server.use(restify.plugins.queryParser({ mapParams: false }));//req.query
    server.use(restify.plugins.acceptParser(server.acceptable));

    server.use(restify.plugins.dateParser());
    server.use(restify.plugins.fullResponse());
    server.use(restify.plugins.gzipResponse());
    server.use(restify.plugins.throttle({
        burst: 10,
        rate: 0.5,
        ip: true,
        overrides: {
            'localhost': {
                burst: 0,
                rate: 0    // unlimited
            }
        }
    }));

}
