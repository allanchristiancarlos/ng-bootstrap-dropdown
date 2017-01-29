(function(window, angular) {
	'use strict';

	var app = angular.module('app', ['ngBootstrapDropdown']);

	app.controller('mainController', ['$scope', function($scope) {
		$scope.options = {
			"choice1": "Choice 1",
			"choice2": "Choice 2",
			"choice3": "Choice 3"
		};
		$scope.isLoading = false;
		$scope.selected  = "";

		$scope.onSelect = function(value) {
			console.log(value);
		}
	}]);
})(window, window.angular);