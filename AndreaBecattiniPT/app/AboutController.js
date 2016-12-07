a.controller('aboutCtrl', ['$scope', 'Data', function($scope, Data) {
	
	$scope.ok = false;
    
    $scope.InsertNewEsp = function(){
    	if($scope.n2!=null){
            Data.get('InsertNewEsp.php',{'nome':$scope.n2}).then(function(res){
                if(res.data == 1){
                    Data.toast('success','Esperienza aggiunta con successo');
                    $scope.AllEsp();
                    $scope.nome2 = null;
                }
                else{
                    Data.toast('error','Esperienza non aggiunta');
                }
            });
        }
        else
        	Data.toast('warning','Compila tutti il campo nome esperienza');
    }
	
    $scope.AllEsp = function(){
    	Data.get('GetEsp.php').then(function(res){
			$scope.esp = res.data;	
            $scope.ok = true;
		});
    }
    
    $scope.removeEsp = function(id){
    	Data.get('DeleteEsp.php',{'id':id}).then(function(res){
        	if(res.data == 1)
            {
            	Data.toast('success','Esperienza eliminata con successo');
                $scope.AllEsp();
            }
            else
            	Data.toast('error','Esperienza non eliminata');
        });
    }
    
	$scope.InsertNewCertification = function(){
    	if($scope.c!=null && $scope.l!=null && $scope.d!=null){
            Data.get('InsertNewCertification.php',{'c':$scope.c,'l':$scope.l,'d':$scope.d}).then(function(res){
                if(res.data == 1){
                    Data.toast('success','Certificazione aggiunta con successo');
                    $scope.AllCertification();
                }
                else{
                    Data.toast('error','Certificazione non aggiunta');
                }
            });
        }
        else
        	Data.toast('warning','Compila tutti i campi');
        	
	}
	
	$scope.AllCertification = function(){
		Data.get('GetCertifications.php').then(function(res){
			$scope.certifications = res.data;	
            $scope.ok = true;
		});
	}
    
    $scope.removeCertification = function(id){
    	Data.get('DeleteCertification.php',{'id':id}).then(function(res){
        	if(res.data == 1)
            {
            	Data.toast('success','Certificazione eliminata con successo');
                $scope.AllCertification();
            }
            else
            	Data.toast('error','Certificazione non eliminata');
        });
    }
    
    $scope.ConfermaEsp = function(id){
    	 var r = confirm("ATTENZIONE! Sicuro di voler eliminare questa esperienza?");
          if (r) {
              $scope.removeEsp(id);
          } else {
             return;
          }
    
    }
    
      $scope.ConfermaCertificazione = function(id)
      {
          var r = confirm("ATTENZIONE! Sicuro di voler eliminare questa certificazione?");
          if (r) {
              $scope.removeCertification(id);
          } else {
             return;
          }
      }
    
    $scope.ConfermaCorso = function(id)
      {
          var r = confirm("ATTENZIONE! Sicuro di voler eliminare questo corso?");
          if (r) {
              $scope.removeCourse(id);
          } else {
             return;
          }
      }
      
    $scope.removeCourse = function(id){
    	Data.get('DeleteCourse.php',{'id':id}).then(function(res){
        	if(res.data == 1)
            {
            	Data.toast('success','Corso eliminato con successo');
                $scope.AllCourse();
            }
            else
            	Data.toast('error','Corso non eliminato');
        });
    }
    
	
	$scope.InsertNewCourse = function(){
     	if($scope.n!=null)
        {
          Data.get('InsertNewCourse.php',{'c':$scope.n}).then(function(res){
              if(res.data == 1){
                  Data.toast('success','Corso aggiunto con successo');
                  $scope.AllCourse();
              }
              else{
                  Data.toast('error','Corso non aggiunto');
              }
          });
        }
        else
        	Data.toast('warning','Compila il campo con il nome');
	}
	
	$scope.AllCourse = function(){
		Data.get('GetCourses.php').then(function(res){
			$scope.courses = res.data;
			$scope.ok = true;
		});
	}
    
     $scope.DataConf = function dateCompare(date){
        var preimpostata = new Date(date);
        var oggi = new Date();
        var diff = preimpostata.getTime()  - oggi.getTime();
        if(diff<=0)
            return true;
       	return false;

    }
	
	$scope.AllEsp();
	$scope.AllCourse();
	$scope.AllCertification();
	
}]);