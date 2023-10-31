const Books = require("../models/Books")

module.exports = {
	getBookDataByid: function (bookid, callback) {
		console.log()
		fetchMongoData(Books, {
			"_id": bookid
		}, function (data, errMsg) {
			callback(data, errMsg)
		})
	},

	getBookData: function (callback) {
		fetchMongoData(Books, "", function (data, errMsg) {
			console.log(data)
			callback(data, errMsg)
		})
	},

	insertRecords: function (bookData, callback) {
		createRecords(Books, bookData, function (data, errMsg) {
			callback(data, errMsg)
		});
	},

	editRecords: function (bookData, callback) {
		updateRecords(Books, bookData, function (data, errMsg) {
			callback(data, errMsg)
		});
	},
	deleteRecords: function (bookData, callback) {
		removeRecords(Books, bookData, function (data, errMsg) {
			callback(data, errMsg)
		});
	}
}