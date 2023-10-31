//Validation Functions Across System

var Validator = require('validatorjs');

module.exports = function(server, express) {

	server.initValidator = function() {
		
		Validator.register('mobile', function(value, requirement, attribute) {
			  if(value==null || value.replace(/ /g,"").length!=10) return false;
			  if(isNaN(value) || value.indexOf(" ")!=-1) return false;
			  return true;
			}, 'The :attribute mobile number is not valid');
	},

	global.validateRule = function(formData, ruleObj) {
		let validation = new Validator(formData, ruleObj);

		return {
			"status": validation.passes(),
			"errors": validation.errors.all()
		};
	},


	global.validate = function(formData, ruleKey) {
		let data = {
		  name: 'John',
		  email: 'johndoe@gmail.com',
		  age: 28
		};
		 
		let rules = {
		  name: 'required',
		  email: 'required|email',
		  age: 'min:18'
		};
		 
		let validation = new Validator(data, rules);

		validation.passes(); // true
		validation.fails(); // false
	}
}