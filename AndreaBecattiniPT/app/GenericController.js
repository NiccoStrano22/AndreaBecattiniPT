a.controller('myCtrl', ['Data', '$rootScope', '$location', '$scope','Upload', function(Data, $rootScope, $location, $scope, Upload) {

	$scope.logout = function() {
		Data.logout().then(function() {
			$rootScope.authenticated = false;
			$rootScope.authenticatedA = false;
			$location.path("/home");
		});
	}

	$scope.getClass = function(path) {
		return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	}
    
    $scope.Carousel = function(){
        Data.get('GetCarouselPhoto.php').then(function(res){
            $scope.slideOne = res.data[0]['FirstSlide'];
            $scope.slideTwo = res.data[0]['SecondSlide'];
            $scope.slideThree = res.data[0]['ThirdSlide'];
        });
    }
      
    $scope.dett = function(slide)
    {
        $scope.number = slide;
        Data.get('GetDetailsCarousel.php',{'number':slide}).then(function(res){
            if(slide == 1)
                $scope.nomeFile15 = res.data[0]['FirstSlide'];
            else if(slide == 2)
                $scope.nomeFile15 = res.data[0]['SecondSlide'];
            else
                $scope.nomeFile15 = res.data[0]['ThirdSlide'];
        });    
    }
    
    $scope.aggiornaCarousel = function(){
        if($scope.nomeFile15 != null){
            Data.get('UpdateCarousel.php',{'number':$scope.number,'img':$scope.nomeFile15}).then(function(res){
               if(res.data == 1){
                   $scope.Carousel();
                   Data.toast('success','Immagine aggiornata');
               } 
               else{
                   Data.toast('error','Immagine non aggiornata');
               }
            });
        }
    }
    
  
    
    $scope.uploadCarousel = function(x, y) {
		if (x.length == 0) {
			if (y && y.length > 0) {
				var file = y;
				Upload.upload({
					url: 'db/UCarousel.php',
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
						$scope.nomeFile15 = data;
					}
				}).error(function() {
					Data.toast('error', 'Errore nell\'operazione di caricamento.', 5000);
				});
			}
		}
		else
			Data.toast('error', 'Attenzione: sono ammessi solo file di tipo GIF, JPG, TIFF, PNG o PDF di dimensione massima 2MB!', 5000);
	};
    
    $scope.Carousel();

}]);