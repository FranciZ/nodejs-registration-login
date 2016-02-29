angular.module('app').controller('RegisterCtrl',function($scope, $http){

	$scope.user = {};

	$scope.register = function(){

		$http.post('http://localhost:3000/user', $scope.user)
			.then(function(res){

				console.log(res);

			});

	};

});