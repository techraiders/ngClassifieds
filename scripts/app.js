angular.module('ngClassifieds', ['ngMaterial', 'ui.router'])
	.config(function  ($mdThemingProvider, $stateProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('teal')
			.accentPalette('orange');

		$stateProvider
			.state('one', {
				url: '/stateone',
				template: '<h1> {{stateone.message}}</h1>',
				controller: 'stateOneCtrl as stateone'
			})
			.state('two', {
				url: '/statetwo',
				template: '<h1>State Two</h1>' 
			});
	}).
	controller('stateOneCtrl', function() {
		var vm = this;
		vm.message = "Hey from state one";
	});