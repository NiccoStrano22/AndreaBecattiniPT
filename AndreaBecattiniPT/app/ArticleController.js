a.controller('artCtrl', ['$scope', 'Data', '$location', '$rootScope', 'Upload', function($scope, Data, $location, $rootScope, Upload) {

    $scope.vedi = false;

    $scope.Articoli = function() {
        $scope.ok = false;
        Data.get('GetArticles.php').then(function(results) {
            $scope.articoli = results.data;
            $scope.ok = true;
        });
    }

    $scope.Conferma = function(id) {
        var r = confirm("ATTENZIONE! Sicuro di voler eliminare questo articolo?");
        if (r) {
            $scope.del(id);
        }
        else {
            return;
        }
    }

    $scope.ChangeView = function() {
        if ($scope.vedi) {
            $scope.vedi = false;
        }
        else
            $scope.vedi = true;
    }

    $scope.SendEmail = function(nome) {
        Data.get('EmailFromAllUser.php', {
            'post': "Articolo",
            'nome': nome
        }).then(function(res) {
            if (res.data == 0)
                Data.toast('error', 'Email non inviata');
        });
    }

    $scope.Articoli();

    $scope.del = function(idX) {
        Data.get('DeleteArticle.php', {
            'id': idX
        }).then(function(res) {
            if (res.data == 1) {
                Data.toast('success', 'Articolo eliminato');
                $scope.Articoli();
            }
            else {
                Data.toast('error', 'Articolo non eliminato');
            }
        });
    }

    $scope.conferma = function(idZ) {
        $scope.zz = idZ;
    }

    $scope.ok = false;

    $scope.dettagli = function(id) {
        Data.get('ArticleDetails.php', {
            'id': id
        }).then(function(result) {
            $scope.id = result.data[0]['idArticolo'];
            $scope.nome = result.data[0]['Titolo'];
            $scope.descr = result.data[0]['Descrizione'];
            $scope.nomeFile = result.data[0]['Immagine'];
            $scope.ChangeView();
        });
    }

    $scope.aggiorna = function(id, nome, desc, img) {
        if (nome != "" && desc != "" && img != "" && nome != null && desc != null && img != null) {
            Data.get('UpdateInfoArticle.php', {
                'id': id,
                'nome': nome,
                'desc': desc,
                'img': img
            }).then(function(res) {
                if (res.data == 1) {
                    Data.toast('success', 'Aggiornato con successo');
                    $scope.ChangeView();
                    $scope.Articoli();
                }
                else {
                    Data.toast('error', 'Errore, non aggiornato');
                }
            });
        }
        else
            Data.toast('warning', 'Compila tutti i campi');
    }

    $scope.reset = function() {
        $scope.nome = $scope.descr = $scope.nomeFile = $scope.path = null;
    }

    $scope.upload = function(x, y) {
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

    $scope.go = function(id) {
        $location.path('/details/' + id);
    }

    $scope.aggiungi = function(nome, desc, img) {
        if (nome != "" && desc != "" && img != "" && nome != null && desc != null && img != null) {
            var dt = new Date();
            var data = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
            Data.get('InsertNewArticle.php', {
                'nome': nome,
                'desc': desc,
                'data': data,
                'img': img
            }).then(function(res) {
                if (res.data == 1) {
                    $scope.resetAdd();
                    Data.toast('success', 'Aggiunto con successo');
                    $scope.Articoli();
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

    $scope.resetAdd = function() {
        $scope.n = $scope.desc = $scope.nomeFile2 = null;
    }

}]);
