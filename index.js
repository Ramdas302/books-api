
const config = require('./api/config');
const env = {};

const restify = require('restify');
const errors = require('restify-errors');
const mongoose = require('mongoose');

global.glob = require('glob');
global.fs = require('fs');
global.path = require('path');

global.moment = require('moment');
global._ = require('lodash');
global.errors = errors;

config.START_TIME = moment().format();
config.ROOT_PATH  = __dirname;//path.dirname();


global.CONFIG = config;
global._ENV = {};
global.CLSINDEX = {"CONTROLLERS":[]};

console.log("\x1b[31m%s\x1b[0m","\nAPI Engine Initialization Started");

global._LOGGER = require('./api/logger');
_LOGGER.initLoggers();

const server = restify.createServer({});
server.config = config;
server.env = env;

require('./api/plugins')(server, restify);
require('./api/middleware')(server, restify);

require('./api/security')(server, restify);
require('./api/routes')(server, restify); 

fs.readdirSync('./api/controllers/').forEach(function(file) {
    if ((file.indexOf(".js") > 0 && (file.indexOf(".js") + 3 == file.length))) {
        filePath = path.resolve('./api/controllers/' + file);

        clsName = file.replace('.js','').toUpperCase();
        global[clsName] = require(filePath);
        CLSINDEX.CONTROLLERS.push(clsName);
    }
});

fs.readdirSync('./api/helpers/').forEach(function(file) {
    if ((file.indexOf(".js") > 0 && (file.indexOf(".js") + 3 == file.length))) {
        filePath = path.resolve('./api/helpers/' + file);
        require(filePath)(server, restify);
    }
});

fs.readdirSync('./api/routes/').forEach(function(file) {
    if ((file.indexOf(".js") > 0 && (file.indexOf(".js") + 3 == file.length))) {
        filePath = path.resolve('./api/routes/' + file);
        require(filePath)(server, restify);
    }
});

function exitHandler(options, exitCode) {
    if(options=="exit") return;
    if(options=="uncaughtException") {
        console.warn(exitCode);
    }

    if(server.mysql!=null) server.mysql.end();
    console.warn("\n\nServer Shutting Down @ "+moment().format());
    setTimeout(function() {
        process.exit();
    }, 1000);
}


//Process Cleanup
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, exitHandler.bind(null, eventType));
})

process.on('uncaughtException', function(err) {
    console.error(err.name,err.message,err.stack);
});

server.loadMongoModels();
server.listen(config.port, () => {
    if(config.dbmongo.enable) {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.dbmongo.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            autoIndex: false
        });

        server.mongodb = mongoose.connection;

        server.mongodb.on('error', (err) => {
            console.error(err);
            process.exit(1);
        });

        server.mongodb.once('open', () => {
            console.log("MONGODB Initialized");

            console.log("\x1b[31m%s\x1b[0m","API Engine Initialization Completed");
            console.log(`\nServer Started @ `+moment().format()+` and can be accessed on:${config.port}/`);
        });
    } else {
        console.log("\x1b[31m%s\x1b[0m","API Engine Initialization Completed");
        console.log(`\nServer Started @ `+moment().format()+` and can be accessed on ${config.host}:${config.port}/`);
    }
    
});