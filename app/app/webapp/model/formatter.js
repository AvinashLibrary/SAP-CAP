sap.ui.define([], function () {
	"use strict";
	return {
		presentBooksDetails: function (oBook) {
			return oBook[0].ID
		},
		updatename:function(name){
			var names = name.split(' ');
			var finalName = `FirstName :  ${names[0]} \n LastName  : ${names[1]}`
			return finalName
		}
	};
});