a.controller('dashboardCtrl', ['$scope', '$rootScope', '$location', 'Data', 'Upload', function($scope, $rootScope, $location, Data, Upload) {

	$scope.AD = false;
	$scope.ok = false;
    
	$scope.logout = function() {
		Data.logout().then(function() {
			$rootScope.authenticated = false;
			$rootScope.authenticatedA = false;
			$location.path("/home");
		});
	}

	$scope.DeleteAccount = function() {
		Data.get('DeleteUserAccount.php').then(function(res) {
			if (res.data == 1) {
				$rootScope.authenticated = false;
				$rootScope.authenticatedA = false;
				$location.path("/home");
			}
			else {
				Data.toast('error', 'Account non eliminato');
			}
		});
	}

	$scope.Information = function() {
		Data.get('UserDetails.php').then(function(res) {
			$scope.utente = res.data[0]['Nome'];
			$scope.cog = res.data[0]['Cognome'];
			$scope.em = res.data[0]['Email'];
			$scope.nomeFile = res.data[0]['Image'];
			$scope.pw = res.data[0]['Password'];
			if ($rootScope.io == 1)
				$scope.AD = true;
			else
				$scope.AD = false;
            $scope.ok = true;
		});
	}

	$scope.upload = function() {
		if ($scope.rejFiles.length == 0) {
			if ($scope.imgfile && $scope.imgfile.length > 0) {
				var file = $scope.imgfile;
				Upload.upload({
					url: 'db/UploadFile.php',
					file: $scope.imgfile
				}).progress(function(evt) {
					if (!$scope.progressbarvisible)
						$scope.progressbarvisible = true;
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					$('#progressbar .progress-bar').css('width', progressPercentage + '%');
				}).success(function(data, status, headers, config) {
					if (data == "") {
						Data.toast('error', 'Errore nell\'operazione di caricamento.', 5000);
					}
					else {
						$scope.progressbarvisible = false;
						$('#progressbar .progress-bar').css('width', 0);
						$scope.nomeFile = data;
					}
				}).error(function() {
					Data.toast('error', 'Errore nell\'operazione di caricamento.', 5000);
				});
			}
		}
		else
			Data.toast('error', 'Attenzione: sono ammessi solo file di tipo GIF, JPG, TIFF, PNG o PDF di dimensione massima 2MB!', 5000);
	};

	$scope.update = function() {
		if (!$rootScope.authenticatedA) {
			Data.get('UpdateUserInfo.php', {
					'pw': $scope.pw,
					'img': $scope.nomeFile
				})
				.then(function(res) {
					if (res.data == 1) {
						$scope.Information();
						Data.toast('success', 'Informazioni aggiornate con successo');
					}
					else {
						Data.toast('error', 'Informazioni non aggiornate');
					}
				});
		}
		else {
			Data.get('UpdateInfoAdmin.php', {
					'pw': $scope.pw,
					'img': $scope.nomeFile
				})
				.then(function(res) {
					if (res.data == 1) {
						Data.get('UpdateUserInfo.php', {
								'pw': $scope.pw,
								'img': $scope.nomeFile
							})
							.then(function(res) {
								if (res.data == 1) {
									$scope.Information();
									Data.toast('success', 'Informazioni aggiornate con successo');
								}
								else {
									Data.toast('error', 'Informazioni non aggiornate');
								}
							});
					}
					else {
						Data.toast('error', 'Informazioni non aggiornate');
					}
				});
		}

	}

	$scope.Information();


}]);