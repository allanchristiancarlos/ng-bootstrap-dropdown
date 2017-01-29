/*jshint esversion: 6 */
(function(window, angular) {
	'use strict';

	var ngBootstrapDropdownModule = angular.module('ngBootstrapDropdown', []);

	/**
	 * ngBootstrapDropdown Directive
	 */
	ngBootstrapDropdownModule.directive('ngBootstrapDropdown', () => {
		return {
			restrict: 'E',
			require: 'ngModel',
			scope: {
				ngModel: '=ngModel',
				ngDisabled: '=ngDisabled',
				ngClass: '=ngClass',
				required: '=required',
				ngBootstrapDropdownOptions: '=ngBootstrapDropdownOptions',
				ngBootstrapDropdownPlaceholder: '@ngBootstrapDropdownPlaceholder',
				ngBootstrapDropdownOnSelect: '&'
			},
			template: '<div class="dropdown"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown" ng-disabled="ngDisabled" ng-class="ngClass">{{ getLabel() }}<span class="caret"></span></button><ul class="dropdown-menu"><li ng-repeat="(value, label) in ngBootstrapDropdownOptions"><a href="" ng-click="selectItem(value)">{{ label }}</a></li></ul></div>',
			link: (scope, element, attributes, controller) => {
				scope.getLabel = function() {
					if (scope.ngModel === null || scope.ngModel === "") {
						return scope.ngBootstrapDropdownPlaceholder;
					}
					var items = scope.ngBootstrapDropdownOptions;
					var itemLabel = items[scope.ngModel];

					if (typeof itemLabel === "undefined") {
						return scope.ngBootstrapDropdownPlaceholder;
					}

					return itemLabel;
				};

				scope.selectItem = (value) => {
					scope.ngModel = value;

					if (scope.ngBootstrapDropdownOnSelect !== "undefined") {
						scope.ngBootstrapDropdownOnSelect({value: value});
					}
				};

				if (controller) {
					controller.$validators.required = (modelValue, viewValue) => {
						return !attributes.required || !controller.$isEmpty(viewValue);
					};
					attributes.$observe('required', () => {
						controller.$validate();
					});
				}
			}
		};
	});

})(window, window.angular);