'use strict';

/*jshint esversion: 6 */
(function (window, angular) {
	'use strict';

	var ngBootstrapDropdownModule = angular.module('ngBootstrapDropdown', []);

	/**
  * ngBootstrapDropdown Directive
  */
	ngBootstrapDropdownModule.directive('ngBootstrapDropdown', function () {
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
				ngBootstrapDropdownButtonClass: '@ngBootstrapDropdownButtonClass',
				ngBootstrapDropdownOnSelect: '&'
			},
			template: '<div class="dropdown"><button class="{{ getButtonClasses() }} dropdown-toggle" data-toggle="dropdown" ng-disabled="ngDisabled" ng-class="ngClass">{{ getLabel() }}<span class="caret"></span></button><ul class="dropdown-menu"><li ng-repeat="(value, label) in ngBootstrapDropdownOptions"><a href="" ng-click="selectItem(value)">{{ label }}</a></li></ul></div>',
			link: function link(scope, element, attributes, controller) {
				scope.getLabel = function () {
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

				scope.selectItem = function (value) {
					scope.ngModel = value;

					if (scope.ngBootstrapDropdownOnSelect !== "undefined") {
						scope.ngBootstrapDropdownOnSelect({ value: value });
					}
				};

				scope.getButtonClasses = function () {
					if (scope.ngBootstrapDropdownButtonClass === undefined) {
						return "btn btn-default";
					}

					return scope.ngBootstrapDropdownButtonClass;
				};

				if (controller) {
					controller.$validators.required = function (modelValue, viewValue) {
						return !attributes.required || !controller.$isEmpty(viewValue);
					};
					attributes.$observe('required', function () {
						controller.$validate();
					});
				}
			}
		};
	});
})(window, window.angular);