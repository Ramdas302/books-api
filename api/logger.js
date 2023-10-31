
const bunyan = require('bunyan');

module.exports = {

 	LOGGERS: {
	},

	logKeys: function() {
		return Object.keys(this.LOGGERS);
	},

	initLoggers: function() {
		that = this;

		_.each(CONFIG.LOGGER, function(logParams, logKey) {

			that.LOGGERS[logKey] = bunyan.createLogger({
				    name: logKey.toUpperCase(),
				    streams: logParams
				});
		});

		global.logger = this.LOGGERS['default'];
		console.log("LOGGERS Initialized");
	},

	log: function(logObj, logKey, logLevel) {
		if(logKey==null) logKey = "default";
		if(logLevel==null) logLevel = "info";

		if(this.LOGGERS[logKey]==null) logControl = this.LOGGERS["default"];
		else logControl = this.LOGGERS[logKey];

		if(logControl) {
			switch(logLevel) {
				case "trace":
					logControl.trace(logObj);
				break;
				case "debug":
					logControl.debug(logObj);
				break;
				case "info":
					logControl.info(logObj);
				break;
				case "warn":
					logControl.warn(logObj);
				break;
				case "error":
					logControl.error(logObj);
				break;
				case "fatal":
					logControl.fatal(logObj);
				break;

			}
		} else {
			console.log("LOGGER KEY MISSING", logKey);
		}
	},
 }