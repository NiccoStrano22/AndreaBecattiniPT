a.controller('fotoCtrl', ['$scope', '$rootScope', '$location', 'Data', 'Upload', function($scope, $rootScope, $location, Data, Upload) {

	$scope.ok = false;

	$scope.Foto = function() {
		Data.get('GetPhotos.php').then(function(res) {
			$scope.foto = res.data;
			$scope.ok = true;
		});
	}

	$scope.resetAdd = function() {
		$scope.n = $scope.desc = $scope.nomeFile2 = null;
	}

	$scope.uploadAdd = function(x, y) {
		if (x.length == 0) {
			if (y && y.length > 0) {
				var file = y;
				Upload.upload({
					url: 'db/UploadFile.php',
					file: y
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
						$scope.nomeFile2 = data;
					}
				}).error(function() {
					Data.toast('error', 'Errore nell\'operazione di caricamento.', 5000);
				});
			}
		}
		else
			Data.toast('error', 'Attenzione: sono ammessi solo file di tipo GIF, JPG, TIFF, PNG o PDF di dimensione massima 2MB!', 5000);
	};
    
    $scope.SendEmail = function(nome){
    	Data.get('EmailFromAllUser.php',{'post':"Foto",'nome':nome}).then(function(res){
        	if(res.data == 0)
            	Data.toast('error','Email non inviata');
        });
    }

	$scope.aggiungi = function(nome, desc, img) {
		if (nome != "" && desc != "" && img != "" && nome != null && desc != null && img != null) {
			var dt = new Date();
			var data = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
			Data.get('InsertNewPhoto.php', {
				'nome': nome,
				'desc': desc,
				'data': data,
				'img': img
			}).then(function(res) {
				if (res.data == 1) {
					$scope.resetAdd();
					Data.toast('success', 'Aggiunto con successo');
					$scope.Foto();
                    $scope.SendEmail(nome);
				}
				else {
					Data.toast('error', 'Errore, non aggiunto');
				}
			});
		}
		else
			Data.toast('warning', 'Compila tutti i campi');
	}

	$scope.Foto();
}]);