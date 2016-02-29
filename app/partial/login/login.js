angular.module('app').controller('LoginCtrl',function($scope, $http){


	$scope.user = {};

	$scope.login = function(){

		console.log('Login');

		$http.post('http://localhost:3000/login',$scope.user).then(function(res){

			console.log(res);

		});

	};

	$scope.checkLogin = function(){

		$http.get('http://localhost:3000/check-login').then(function(res){

			console.log(res.data);

		});

	};

});