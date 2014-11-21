var myFirstModule = angular.module('myFirstModule',['ngRoute']);

myFirstModule.controller('myFirstController', function($scope, $http){
	
	$scope.GetUsers = function() {
    $http.get('http://localhost:3000/users').
        success(function(data) {
            $scope.users = data;
        });
    }

    $scope.AddUsers = function(){
//		console.log($scope.name);
	var data1 = JSON.stringify({
                username: $scope.name,
                email: $scope.email
            });
	$http.post('http://localhost:3000/users', data1).
	  success(function(data, status, headers, config) {
	    $scope.users = data;
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  	$scope.users = 'err';
	  });
	}
});