a.controller('fotoDCtrl', ['$scope', '$rootScope', '$location', 'Data', 'Upload', '$routeParams', function($scope, $rootScope, $location, Data, Upload, $routeParams) {

	$scope.ok = false;
	
    $scope.Conferma = function()
    {
        var r = confirm("ATTENZIONE! Sicuro di voler eliminare questa foto?");
        if (r) {
            $scope.del();
        } else {
           return;
        }
    }
    
     $scope.Foto = function() {
		Data.get('GetOtherPhotos.php',{'id':$routeParams.idFoto}).then(function(res) {
			$scope.foto = res.data;
			$scope.ok = true;
		});
   	} 
     
    $scope.SendEmail = function(email){
        Data.get('Email.php',{'email':email,'utente':$rootScope.username, 'post':$scope.nome}).then(function(res){
          if(res.data == 0)
            	Data.toast('error', "Email non inviata");
        });
    }
    
	$scope.del = function() {
		Data.get('DeletePhoto.php', {
			'id': $routeParams.idFoto
		}).then(function(res) {
			if (res.data == 1) {
				Data.toast('success', 'Foto eliminata');
				$location.path('/foto');
			}
			else {
				Data.toast('error', 'Foto non eliminata');
			}
		});
	}
    
    $scope.Update = function(){
		if($scope.desc1!=null && $scope.n!=null){
        	Data.get('UpdatePhotoInfo.php',{'id':$routeParams.idFoto,'d':$scope.desc1,'t':$scope.n}).then(function(res){
            	if(res.data == 1){
                	Data.toast('success','Informazioni della foto aggiornate');
                    $scope.ok = false;
                    $scope.Rec();
                }
                else
                	Data.toast('error','Informazioni della foto non aggiornate');
            });
        }
        else
        	Data.toast('warning','Compila tutti i campi');
    }
	
	$scope.Rec = function() {
		Data.get('PhotoDetails.php', {
			'id': $routeParams.idFoto
		}).then(function(result) {
			$scope.nome = result.data[0]['Titolo'];
			$scope.desc = result.data[0]['Descrizione'];
			$scope.d = result.data[0]['DataPubblicazione'];
			$scope.path = result.data[0]['Percorso'];

			$scope.n = result.data[0]['Titolo'];
			$scope.desc1 = result.data[0]['Descrizione'];
			$scope.ok = true;
		});
	}

	$scope.Commenti = function() {
		Data.get('GetPhotoComments.php', {
			'id': $routeParams.idFoto
		}).then(function(res) {
			$scope.comm = res.data;
		});
	}

	$scope.Ncommento = function(y) {
		var dt = new Date();
		var data = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
		var ora = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
		if (y != '' && y != null) {
			Data.get('InsertNewPhotoComment.php', {
				'desc': y,
				'data': data,
				'foto': $routeParams.idFoto,
				'ora': ora
			}).then(function(res) {
				if (res.data == 1) {
					Data.toast('success', 'Commento salvato correttamente');
					$scope.Commenti();
                    if(!$rootScope.authenticatedA){
                    	$scope.SendEmail("andreabecattinipt@gmail.com");
                    }
				}
				else {
					Data.toast('error', 'Commento non salvato');
				}
			});
		}
		else
			Data.toast('warning', 'Compila tutti i campi');
	}
	
    $scope.Foto();
	$scope.Commenti();
	$scope.Rec();
}]);