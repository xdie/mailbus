	// create the module and name it mailbusAPP
	var mailbusApp = angular.module('mailbusApp', ['ngRoute']);

	// configure our routes
	mailbusApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the users page
			.when('/usuarios', {
				templateUrl : 'pages/usuarios.html',
				controller  : 'userController'
			})

			// route for the domains page
			.when('/dominios', {
				templateUrl : 'pages/dominios.html',
				controller  : 'domainController'
			})
			// route for stats
			.when('/estadisticas', {
				templateUrl : 'pages/estadisticas.html',
				controller  : 'statsController'
			});
	});

	// create the controller and inject Angular's $scope
	mailbusApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Administracion del servidor Mailbuzz';
		
		
	});

	mailbusApp.controller('userController', function($scope, $http) {
		$scope.message = 'Agrega borrar y modificar usuarios';
		// Random fruit
		   $http.get('ajax/getUsers.php').success(function(data){
		   $scope.users=data; // este es el array de nombres recuperado del servidor
		   console.log(data); 
		  });
		$scope.deleteUser = function (user) {
		if(confirm("Seguro que quiere borrar el usuario "+user+"? ")){
			$http.get("ajax/deleteUser.php?ID="+id).success(function(data){
		
			});
			}
		}	
	});
		

	mailbusApp.controller('domainController', function($scope) {
		$scope.message = 'Agregar modificar dominios';
		
	});
	mailbusApp.controller('statsController', function($scope) {
		$scope.message = 'Estaditicas generales, correos enviados la ultima hora, etc';
		
	});
