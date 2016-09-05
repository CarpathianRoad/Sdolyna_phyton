/**
 * Created by kubix on 03.09.2016.
 */
// Services:
angular.module('sdolyna').factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

    var user = null;
    var apiVer = '1.0'; // Api Version

    return ({
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getUserStatus: getUserStatus
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
                if(status === 200 && data.result){
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

        $http.get('/api/v' + apiVer + '/auth/logout')
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

    function getUserStatus() {
        return $http.get('/api/v' + apiVer + '/auth/status')
            .success(function(data){
                (data.status? user=true:user=false);
            })
            .error(function(data){
                user = false;
                console.log('getUserStatus error')
            });
    }
}]);