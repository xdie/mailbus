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
		
		$scope.master = {};
		$scope.message = 'Agregar Usuario de Correo';
		
		// Obtenemos usuarios
		getUsers();
		function getUsers(){
		   $http.get('ajax/getUsers.php').success(function(data){
		   $scope.users=data; // este es el array de nombres recuperado del servidor en JSON
		  });
		}
		$scope.deleteUser = function (user, id) {
			if(confirm("Seguro que quiere borrar el usuario "+user+"? ")){
				$http.get("ajax/delUser.php?ID="+id).success(function(data){
					getUsers();
				});
			}
			
		}
		$scope.addUser = function (name,email,password) {
			$http.get("ajax/addUser.php?user="+name+"&email="+email+"&password="+password+"&status=Activo").success(function(data){
				$scope.reset();
				getUsers();
			});
		}
		$scope.updateUser = function (status, id) {
			if (status == "Activo") {
				
				$http.get("ajax/updateUser.php?ID="+id+"&status="+"Inactivo").success(function(data){
					getUsers();
				});
			
			} else {
			
				$http.get("ajax/updateUser.php?ID="+id+"&status="+"Activo").success(function(data){
					getUsers();
				});
				
			}
			
		}
		
		$scope.modifyPass = function (user,id){
			
		var answer = prompt ("Por favor type la nueva clave para "+user,"passwordseguro");
			if (answer){
				
				$http.get("ajax/modifyPass.php?ID="+id+"&password="+answer).success(function(data){
				alert ("Se aplico el cambio de clave con exito! ")
				});
				
			}
	
		}
		// Funcion para resetear campos
		$scope.reset = function() {
			$scope.user = angular.copy($scope.master);
		};
	
	});
	
	mailbusApp.controller('domainController', function($scope) {
		$scope.message = 'Agregar modificar dominios';	
	});
	
	mailbusApp.controller('statsController', function($scope) {
		$scope.message = 'Estaditicas generales, correos enviados la ultima hora, etc';
	});
