a.controller('detailsCtrl', ['$scope', 'Data', '$location', '$routeParams', '$rootScope', function($scope, Data, $location, $routeParams, $rootScope) {

	$scope.ok = false;
	$scope.ps = false;

	$scope.Rec = function() {
		Data.get('ArticleDetailsWithSleep.php', {
			'id': $routeParams.idDet
		}).then(function(result) {
			$scope.nome = result.data[0]['Titolo'];
			$scope.desc = result.data[0]['Descrizione'];
			$scope.d = result.data[0]['DataPubblicazione'];
			$scope.path = result.data[0]['Immagine'];
			$scope.ok = true;
		});
	}

	$scope.Rec();

	Data.get('GetArticlesWithLimit.php',{'id': $routeParams.idDet}).then(function(res) {
		$scope.articoli = res.data;
	});

	$scope.go = function(id) {
		$location.path('/details/' + id);
	}

	$scope.Commenti = function() {
		Data.get('GetArticleComments.php', {
			'id': $routeParams.idDet
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

	$scope.Commenti();

	$scope.Ncommento = function(y) {
		var dt = new Date();
		var data = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
		var ora = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
		if (y != '' && y != null) {
			Data.get('InsertNewComment.php', {
				'desc': y,
				'data': data,
				'art': $routeParams.idDet,
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


}]);