(function(window, angular) {
	'use strict';

	var app = angular.module('app', ['ngBootstrapDropdown']);

	app.controller('mainController', ['$scope', '$timeout', function($scope, $timeout) {
		$scope.years = {
			"": ""
		};
		$scope.makes = {
			"": ""
		};
		$scope.trims = {
			"": ""
		};
		$scope.models = {
			"": ""
		};
		$scope.year                = "";
		$scope.make                = "";
		$scope.isLoading           = false;
		$scope.isYearFieldDisabled = true;
		$scope.isMakeFieldDisabled = false;
		$scope.isModelFieldDisabled = false;
		$scope.isTrimFieldDisabled = false;

		$timeout(function() {
			$scope.isYearFieldDisabled = false;
			$scope.years = [
				"2017",
				"2016",
				"2015",
				"2014"
			];
		}, 100);

		$scope.onSelectYear = function(value) {
			$scope.isMakeFieldDisabled = true;
			$scope.make = "";
			$scope.makes = {};
			$scope.model = "";
			$scope.models = {};
			$scope.trim = "";
			$scope.trims = {};
			$timeout(function() {
				$scope.isMakeFieldDisabled = false;
				$scope.makes = {
					"Ford": "Ford",
					"Honda": "Honda",
					"Toyota": "Toyota",
					"Nissan": "Nissan"
				};
			}, 100);
		}

		$scope.onSelectMake = function(value) {
			$scope.isModelFieldDisabled = true;
			$scope.model = "";
			$scope.models = {};
			$scope.trim = "";
			$scope.trims = {};
			$timeout(function() {
				$scope.isModelFieldDisabled = false;
				$scope.models = {
					"Civic": "Civic",
					"City": "City",
					"Brezzy": "Brezzy",
					"CRz": "CRz"
				};
			}, 100);
		}

		$scope.onSelectModel = function(value) {
			$scope.isTrimFieldDisabled = true;
			$scope.trim = "";
			$scope.trims = {};
			$timeout(function() {
				$scope.isTrimFieldDisabled = false;
				$scope.trims = {
					"Trim 1": "Trim 1",
					"Trim 2": "Trim 2",
					"Trim 3": "Trim 3",
					"Trim 4": "Trim 4"
				};
			}, 100);
		}
	}]);
})(window, window.angular);