a.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'Data', function($scope, $rootScope, $location, Data) {

	$scope.login = function() {
		if ($scope.loginname != null && $scope.loginpwd != null) {
			if ($scope.controlla($scope.loginname)) {
				Data.get('Login.php', {
					'email_locale': $scope.loginname,
					'password': $scope.loginpwd
				}).then(function(results) {
					if (results.data == 1) {
						if ($rootScope.nextUrl) {
							$location.path($rootScope.nextUrl);
							delete $rootScope.nextUrl;
						}
						else
							$location.path("/dashboard");
					}
					else {
						Data.toast('error', "login errato");
						$scope.reset();
						return false;
					}
				});
			}
			else {
				Data.toast('danger', 'Inserire indirizzo email valido (es: xxxx@gmail.com)');
				return false;
			}
		}
		else {
			Data.toast('warning', 'Compila tutti i campi');
			return false;
		}
	}

	$scope.controlla = function(email) {
		if (email != null) {
			if (email.length > 0) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (re.test(email)) {
					return true;
				}
				else {
					return false;
				}
			}
		}
	}


	$scope.reset = function() {
		$scope.loginname = $scope.loginpwd = null;
	}
}]);