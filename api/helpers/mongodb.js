//MongoDB Database Helper Functions

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (server, express) {

	server.loadMongoModels = function () {
		console.log("LOADING MONGODB MODELS");
		fs.readdirSync('./api/models/').forEach(function (file) {
			if ((file.indexOf(".js") > 0 && (file.indexOf(".js") + 3 == file.length))) {
				var filePath = path.resolve('./api/models/' + file);

				var clsName = file.replace('.js', '')
				try {
					global[clsName] = require(filePath);
				} catch (e) {
					console.error(e);
					console.log("\x1b[35m%s\x1b[0m", "Callback Route Error - " + filePath);
				}
			}
		});
	},

		global.fetchMongoData = function (myModel, queryParams, callback) {
			if (queryParams._id != null && queryParams._id.length > 0) {
				myModel.findById(queryParams._id)
					.exec(function (err, data) {
						console.log(data)
						if (err) {
							console.log(err);
							return callback(false, err);
						} else if(data == null){
							callback(false,'no data found');
						} else {
							callback(data);
						}
					});
			} else {
				myModel.find()
					.exec(function (err, data) {
						console.log(data)
						if (err) {
							console.log(err);
							return callback(false, err);
						}else if(data == null){
							callback(false,'no data found');
						} else {
							callback(data);
						}
					});
			}
		},

		global.createRecords = function (myModel, records, callback) {
			if (Array.isArray(records)) {
				myModel.insertMany(records, function (err, docs) {
					if (err) {
						callback(false, err);
					}
					callback(true, docs);
				});
			} else {
				myModel.create(records, function (err, docs) {
					if (err) {
						callback(false, err, docs);
					} else {
						callback(docs);
					}
				});
			}
		},

		global.updateRecords = function (myModel, records, callback) {
			if (Array.isArray(records)) {
				records.forEach(item => {
					console.log(item)
					const filter = { _id: item._id };
					function getItem() {
						return item;
					}
					const output = getItem();
					const updateDoc = {
						$set: output
						,
					};
					myModel.updateMany(filter, updateDoc, function (err, docs) {
						console.log(err, docs)
						if (err) {
							return callback(false, err);
						}
					});
				})
				return callback(true)
			} else {
				myModel.findByIdAndUpdate(records._id, { $set: records }, { new: true }, function (err, result) {
					if (err) {
						return callback(false, err);
					} else {
						return callback(true, result);
					}

				});
			}
		}

	global.removeRecords = function (myModel, records, callback) {
		if (Array.isArray(records)) {
			records.forEach(item => {
				console.log(item)
				const filter = { _id: item._id };
				myModel.deleteMany(filter, function (err, docs) {
					console.log(err, docs)
					if (err) {
						return callback(false, err);
					}
				});
			})
			return callback(true)
		} else {
			myModel.findByIdAndDelete(records._id, function (err, result) {
				if (err) {
					return callback(false, err);
				} else {
					return callback(true, result);
				}
			});
		}
	}
}