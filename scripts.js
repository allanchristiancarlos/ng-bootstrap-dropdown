var app = angular.module('app', []);

app.controller('mainController', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.options = ['Choice 1', 'Choice 2', 'Choice 3'];
	$scope.isLoading = false;
	$scope.placeholder = $scope.isLoading ? 'Loading..' : "Place";
	$scope.selectedChoice = "";

	$scope.changePlaceholder = function() {
		$scope.isLoading = false;
	}

	$scope.funcOnController = function(value) {
		alert(value);
	}

	$scope.onFormSubmit = function(form) {
		return;
	}
}]);

app.directive('dropdown', function() {
	return {
		restrict: 'E',
		require: 'ngModel',
		scope: {
			ngModel: '=ngModel',
			ngDisabled: '=ngDisabled',
			ngClass: '=ngClass',
			required: '=required',
			options: '=options',
			placeholder: '@placeholder',
			isKeyValue: '=isKeyValue',
			onSelect: '&'
		},
		transclude: true,
		replace: true,
		template: '\
			<div class="dropdown">\
				<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" ng-disabled="ngDisabled" ng-class="ngClass">\
					{{ getLabel() }}\
					<span class="caret"></span>\
				</button>\
				<ul class="dropdown-menu" ng-transclude>\
				</ul>\
			</div>\
		',
		link: function(scope, element, attributes, controller) {
			/**
			 * Custom functions
			 */
			scope.getLabel = function() {
				if (scope.ngModel == null || scope.ngModel == "") {
					return scope.placeholder;
				}
				var items = scope.getItems();
				var itemLabel = items[scope.ngModel];

				if (typeof itemLabel == "undefined") {
					return scope.placeholder;
				}

				return itemLabel;
			}
			scope.getItems = function() {
				var items = {};
				var isKeyValue = ((scope.isKeyValue == undefined) || (typeof scope.isKeyValue != "boolean")) ? false : scope.isKeyValue;

				angular.forEach(scope.options, function(value, key) {
					if (isKeyValue) {
						items[key] = value;
						return;
					}
					items[value] = value;
				});

				return items;
			}
			scope.selectItem = function(value) {
				scope.ngModel = value;
				if (scope.onSelect != "undefined") {
					scope.onSelect({value: value});
				}
			}

			/**
			 * Validations
			 */
			if (controller) {
				controller.$validators.required = function(modelValue, viewValue) {
					return !attributes.required || !controller.$isEmpty(viewValue);
				};
				attributes.$observe('required', function() {
					controller.$validate();
				});
			}
		}
	}
});

app.directive('dropdownOption', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<li><a href="" ng-click="selectItem(sdadasd)" ng-transclude></a></li>',
		link: function(scope, element, attributes, controller) {
			scope.sdadasd = attributes.value;
			scope.selectItem = function(value) {
				console.log(value);
				scope.$parent.selectItem(value);
			}
		}
	}
});