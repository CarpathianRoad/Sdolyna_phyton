/**
 * Created by kubix on 03.09.2016.
 */

// Main variable:
var dolyna = angular.module('dolyna', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngRoute']);

// Config & routes:
dolyna.config(function ($routeProvider) {
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
    $routeProvider.when('/system/tools/admin_panel', {
        templateUrl: 'static/web-content/pages/admin_panel.html',
        access: {restricted: true}
    });
    $routeProvider.when('/system/tools/edit/page=:id', {
        templateUrl: 'static/web-content/pages/edit.html',
        access: {restricted: true}
    });
    $routeProvider.when('/system/tools/delete/page=:id', {
        access: {restricted: true}
    });
    $routeProvider.when('/system/tools/login', {
      templateUrl: 'static/web-content/pages/login.html',
      controller: 'loginController',
      access: {restricted: false}
    });
    $routeProvider.when('/system/tools/logout', {
        controller: 'logoutController',
        access: {restricted: true}
    });
    $routeProvider .when('/system/tools/register', {
      templateUrl: 'static/web-content/pages/register.html',
      controller: 'registerController',
      access: {restricted: false}
    });
    $routeProvider.otherwise({redirectTo: '/main'});
});

dolyna.run(function ($rootScope, $location, $route, AuthService) {
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