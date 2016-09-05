/**
 * Created by kubix on 03.09.2016.
 */

// Main variable:
var sdolyna = angular.module('sdolyna', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngRoute']);

// Config & routes:
sdolyna.config(function ($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'static/web-content/pages/main.html',
        access: {restricted: false}
    });
    $routeProvider.when('/camps', {
        templateUrl: 'static/web-content/pages/camps.html',
        access: {restricted: false}
    });
    $routeProvider.when('/festivals', {
        templateUrl: 'static/web-content/pages/fests.html',
        access: {restricted: false}
    });
    $routeProvider.when('/system/tools/login', {
        templateUrl: 'static/web-content/pages/login.html',
        access: {restricted: false}
    });
    $routeProvider.when('/system/tools/editor', {
        templateUrl: 'static/web-content/pages/editor.html',
        access: {restricted: false}
    });
    $routeProvider.when('/system/tools/edit/page=:id', {
        templateUrl: 'static/web-content/pages/edit.html',
        access: {restricted: false}
    });
    $routeProvider.otherwise({redirectTo: '/main'});
});

sdolyna.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
        AuthService.getUserStatus()
            .then(function(){
                if (next.access.restricted && !AuthService.isLoggedIn()){
                    $location.path('/');
                    $route.reload();
                }
            });
    });
});