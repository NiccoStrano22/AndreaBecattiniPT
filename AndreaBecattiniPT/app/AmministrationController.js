a.controller('newCtrl', ['$scope', 'Data', function($scope, Data) {

	$scope.send = -1;
	$scope.ok = false;

	$scope.Users = function() {
		Data.get('GetAllUser.php').then(function(res) {
			$scope.users = res.data;
			$scope.ok = true;
		});
	}

	$scope.Conferma = function(id) {
		var r = confirm("ATTENZIONE! Sicuro di voler eliminare questo utente dal sito?");
		if (r) {
			$scope.del(id);
		}
		else {
			return;
		}
	}
	$scope.email = "";

	$scope.SetEmail = function(email) {
		$scope.email = email;
	}

	$scope.Send = function() {
		Data.get('EmailFromAndreToUser.php', {
			'email': $scope.email,
			'header': $scope.header,
			'msg': $scope.msg
		}).then(function(res) {
			$scope.send = res.data;
			$scope.email = $scope.header = $scope.msg = null;
		});
	}

	$scope.del = function(id) {
		Data.get(' DeletUserFromAdmin.php', {
			'id': id
		}).then(function(res) {
			if (res.data == 1) {
				Data.toast('success', 'Utente eliminato');
				$scope.Users();
			}
			else {
				Data.toast('error', 'Utente non eliminato');
			}
		});
	}


	$scope.Users();

}]);
