(function () {
	"use strict";
	angular
		.module("ngClassifieds")
		.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
			
			classifiedsFactory.getClassifieds().then(function(AOB) {
					$scope.classifieds = AOB.data;
					$scope.categories = getCategories($scope.classifieds);
			});
					var contact = {
						name: "Ryan Chenkie",
						phone: "9876543210",
						email: "ryanchenkie@gmail.com"
					};
					$scope.openSidebar = function() {
						$mdSidenav('left').open();
					};
					$scope.closeSidebar = function() {
						$mdSidenav('left').close();
					};
					function showToast(message, delay) {
						$mdToast.show(
							$mdToast.simple()
								.content(message)
								.position('top, right')
								.hideDelay(delay)
						);
					}
					function getCategories(classifieds) {
						var categories = [];
						angular.forEach(classifieds,  function(item) {
							angular.forEach(item.categories, function(category) {
								categories.push(category);
							});
						});
						return _.uniq(categories);
					}
					$scope.saveClassified = function(classified) {
						if(classified) {
							$scope.contact = contact;
							$scope.classifieds.push(classified);
							$scope.classified = {};
							$scope.closeSidebar();
						}
					};
					$scope.editClassified = function(classified) {
						$scope.editing = true;
						$scope.openSidebar();
						$scope.classified = classified;
					};
					$scope.deleteClassified = function(event, classified) {
						var confirm = $mdDialog.confirm()
							.title('Are you sure you want to delete ' + classified.title + '?')
							.cancel('No')
							.ok('Yes')
							.targetEvent(event);
						$mdDialog.show(confirm).then(function() {
							var index = $scope.classifieds.indexOf(classified);
							$scope.classifieds.splice(index, 1);
						}, function() {
							// What to do if didn't want to delete
						});
					};
					$scope.saveEdit = function() {
						$scope.editing = false;
						$scope.classified = {};
						closeSidebar();
						showToast("Edit saved!", 3000);
					};
		});
}) ();