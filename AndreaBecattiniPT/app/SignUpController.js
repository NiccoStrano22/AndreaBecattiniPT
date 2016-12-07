a.controller('signupCtrl', ['$scope', '$location', 'Data', 'Upload', function($scope, $location, Data, Upload) {

    var dt = new Date();
    var data = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
    $scope.progressbarvisible = false;
    
    $scope.DoSignUp = function() {
        Data.get('Signup.php', {
            'nome_locale': $scope.nome,
            'civ_locale': $scope.civico,
            'email_locale': $scope.e,
            'pass_locale': $scope.p,
            'img': $scope.nomeFile,
            'date': data
        }).then(function(result) {
            if (result.data == 1) {
                Data.toast('success', 'registrazione avvenuta');
                $location.path('/dashboard');
            }
            else {
                Data.toast('error', 'Errore durante la registrazione');
                $scope.reset();
            }
        });
    }
    
    $scope.ValidateFields = function(){
        if ($scope.nome != null && $scope.civico != null && $scope.e != null && $scope.p != null)
            return true; 
        return false;
    }
    
    $scope.signup = function() {
       if ($scope.ValidateFields()) {
            if ($scope.controlla($scope.e)) {
               Data.get('CheckEmail.php', {
                    'email': $scope.e
                }).then(function(res) {
                    if (res.data == 1) {
                        CreateToaster('error', 'Email già in uso');
                    }
                    else {
                        $scope.DoSignUp();
                    }
               });
            }
            else {
               CreateToaster('error', 'Indirizzo email non valido. Sintassi errata');
            }
        }
        else
             CreateToaster('warning', 'Compila tutti i campi');
        
        $scope.reset();
    }
    
    function CreateToaster(style, text){
        return Data.toast(style, text); 
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
        $scope.nome = $scope.civico = $scope.e = $scope.data = $scope.tel = $scope.p = $scope.nomeFile = '';
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

}]);
