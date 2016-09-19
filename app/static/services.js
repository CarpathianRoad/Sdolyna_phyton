/**
 * Created by kubix on 03.09.2016.
 */
// Services:
angular.module('dolyna').factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

    var user = null;
    var apiVer = '1.0'; // Api Version
    var apiKey = 'ASLKDJKL2121';

    return ({
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getUserStatus: getUserStatus,
        register: register
    });

    function isLoggedIn() {
        return user;
    }

    function login(email, password) {
        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/api/v' + apiVer + '/auth/login', {email: email, password: password})
        // handle success
            .success(function (data, status) {
                if (status === 200 && data.result) {
                    user = true;
                    deferred.resolve();
                } else {
                    user = false;
                    deferred.reject();
                }
            })
            // handle error
            .error(function (data) {
                user = false;
                deferred.reject();
            });
        // return promise object
        return deferred.promise;
    }

    function logout() {
        var deffered = $q.defer();

        $http.get('/dolyna/api/v' + apiVer + '/auth/logout')
            .success(function (data) {
                user = false;
                deffered.resolve();
            })
            .error(function (data) {
                user = false;
                deffered.reload();
            });

        return deffered.promise;
    }

    function register(email, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/dolyna/api/' + apiVer + '/' + apiKey + '/auth/register', {email: email, password: password})
        // handle success
            .success(function (data, status) {
                if (status === 200 && data.result) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            // handle error
            .error(function (data) {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    }

    function getUserStatus() {
        return $http.get('/api/v1.0/auth/status')
            .success(function (data) {
                (data.status ? user = true : user = false);
            })
            .error(function () {
                user = false;
                console.log('getUserStatus error')
            });
    }
}]);

dolyna.factory('AdminPanelService', function () {

    var content_table = true;
    var edit_panel = false;

    return{
        get_show_content_table: function () {
            return content_table;
        },
        get_show_edit_panel: function () {
            return edit_panel;
        },
        set_show_content_table: function (value) {
            return content_table = value;
        },
        set_show_edit_panel: function (value) {
            return edit_panel = value;
        }
    };

    // var admin_panel_service = {};
    //
    // admin_panel_service.show_content_table = function (value) {
    //     content_table = value;
    // };
    //
    // admin_panel_service.show_edit_panel = function (value) {
    //     edit_panel = value;
    // };
});