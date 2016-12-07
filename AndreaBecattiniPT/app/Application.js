var a = angular.module('myApp',['ngRoute','ngAnimate','toaster','angularUtils.directives.dirPagination','ngFileUpload']);


a.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/home', { title:'Home page', templateUrl:'partials/home.html', controller:'homeCtrl' })
		.when('/art', { title:'Area articoli', templateUrl:'partials/articlesPage.html', controller:'artCtrl' })
		.when('/login', { title:'Area Log-in', templateUrl:'partials/loginPage.html', controller:'loginCtrl' })
		.when('/foto', { title:'Area Foto', templateUrl:'partials/photosPage.html', controller:'fotoCtrl' })
		.when('/dashboard', { title:'Dashboard', templateUrl:'partials/dashboard.html', controller:'dashboardCtrl' })
		.when('/signup', { title:'Registrazione', templateUrl:'partials/signupPage.html', controller:'signupCtrl' })
		.when('/fotoDet/:idFoto', { title:'Dettaglio Foto', templateUrl:'partials/photoDetails.html', controller:'fotoDCtrl' })
        .when('/video', { title:'Sezione Video', templateUrl:'partials/videosPage.html', controller:'videoCtrl' })
		.when('/details/:idDet', { title:'Dettagli Articolo', templateUrl:'partials/articlesDetails.html', controller:'detailsCtrl' })
		.when('/detailsVideo/:idVideo', { title:'Dettagli Video', templateUrl:'partials/videoDetails.html', controller:'detailsVideoCtrl' })
		.when('/about', { title:'About Me', templateUrl:'partials/aboutPage.html', controller:'aboutCtrl' })
		.when('/recupera', { title:'Sezione Recupero Password', templateUrl:'partials/recoverPage.html', controller:'recuperaCtrl' })
        .when('/letters', { title:'Sezione News Letter', templateUrl:'partials/Letters.html', controller:'newCtrl' })
		.otherwise({redirectTo:'/home'});
}]);

a.run(function($rootScope, $route, $location, Data) {
	$rootScope.authenticated = false;
	$rootScope.authenticatedA = false;

    var nextUrl="";
    $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
        if (oldVal !== newVal) {
            document.title = $route.current.title;
        }
    });
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		if (next.$$route)
			nextUrl = next.$$route.originalPath;
		if (current && current.$$route)
			var currentUrl = current.$$route.originalPath;

		if(!$rootScope.authenticated){
			Data.getsession().then(function (results) {
				if (results.userid) {
					$rootScope.authenticated = true;
					$rootScope.userid = results.userid;
					$rootScope.username = results.username;
					$rootScope.useremail = results.useremail;
					$rootScope.io = results.io;
					$rootScope.img = results.immagine;
					if($rootScope.io == 1){
						$rootScope.authenticatedA = true;
					}
				}
			});
		}
		else{
			$rootScope.authenticated = true;
		}
	});
});

a.factory('Data',['$http', 'toaster', function($http,toaster) {
	var obj = {};
	obj.toast = function (typetoast,msg) {
		toaster.pop(typetoast, "", msg, 5000, 'trustedHtml');
	};
	obj.getsession = function () {
		return $http.get('db/GetSession.php').then(function (results) {
			return results.data;
		});
	};
	obj.login = function(u,p) {
		return $http.post('db/Login.php',{'username':u,'password':p}).then(function(results) {
			return results;
		});
	};
	obj.logout = function() {
		return $http.get('db/Logout.php');
	}
	obj.get = function(query,p) {
		return $http.post('db/'+query,p).then(function(results) {
			return results;
		});
	};
	
	return obj;
}]);