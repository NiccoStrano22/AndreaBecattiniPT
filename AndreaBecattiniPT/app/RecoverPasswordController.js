a.controller('recuperaCtrl', ['$scope', '$rootScope', '$location', 'Data', function($scope, $rootScope, $location, Data) {

	$scope.GetAccountPassword = function(){
    	if($scope.email!=null){
          Data.get("RecoverAccountPassword.php",{'email':$scope.email}).then(function(res){
              if(res.data != 0)
              {
                  Data.toast('success','La password ti è stata inviata per email.');
                  $location.path('/login');
              }
              else
                  Data.toast('error','Parametri inseriti non corretti');
          });
       }
       else
       		Data.toast('warning', 'Compila tutti i campi');
    }

}]);