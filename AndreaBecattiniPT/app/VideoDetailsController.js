a.controller('detailsVideoCtrl', ['$scope', '$rootScope', '$location', 'Data', 'Upload', '$routeParams', function($scope, $rootScope, $location, Data, Upload, $routeParams) {

	$scope.ok = false;

	$scope.Rec = function() {
		Data.get('VideoDetails.php', {
			'id': $routeParams.idVideo
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
    
    $scope.Update = function(){
		if($scope.desc1!=null && $scope.n!=null){
        	Data.get('UpdateVideoInfo.php',{'id':$routeParams.idVideo,'d':$scope.desc1,'t':$scope.n}).then(function(res){
            	if(res.data == 1){
                	Data.toast('success','Informazioni del video aggiornate');
                    $scope.ok = false;
                    $scope.Rec();
                }
                else
                	Data.toast('error','Informazioni del video non aggiornate');
            });
        }
        else
        	Data.toast('warning','Compila tutti i campi');
    }

	$scope.Commenti = function() {
		Data.get('GetVideoComments.php', {
			'id': $routeParams.idVideo
		}).then(function(res) {
			$scope.comm = res.data;
		});
	}
    
     $scope.SendEmail = function(email){
        Data.get('Email.php',{'email':email,'utente':$rootScope.username,'post':$scope.nome}).then(function(res){
          if(res.data == 0)
            	Data.toast('error', "Email non inviata");
        });
    }
  

	$scope.Ncommento = function(y) {
		var dt = new Date();
		var data = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
		var ora = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
		if (y != '' && y != null) {
			Data.get('InsertNewVideoComment.php', {
				'desc': y,
				'data': data,
				'foto': $routeParams.idVideo,
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
    
      $scope.Conferma = function()
      {
          var r = confirm("ATTENZIONE! Sicuro di voler eliminare questo video?");
          if (r) {
              $scope.del();
          } else {
             return;
          }
      }
	
	$scope.del = function() {
		Data.get('DeleteVideo.php', {
			'id': $routeParams.idVideo
		}).then(function(res) {
			if (res.data == 1) {
				Data.toast('success', 'Video eliminato');
				$location.path('/video');
			}
			else {
				Data.toast('error', 'Video non eliminato');
			}
		});
	}

	$scope.Commenti();
	$scope.Rec();
}]);