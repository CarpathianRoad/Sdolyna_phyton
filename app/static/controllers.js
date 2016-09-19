dolyna.controller('adminPanelCtrl', function ($scope, $http, AdminPanelService, $route) {

    $scope.show_table = true;
    $scope.show_edit = false;
    $scope.show_add = false;

    $http.get('/api/v1.0/content/all')
        .success(function (data) {
            $scope.allContent = data.result;
        })
        .error(function () {
            console.log('Error in getAllContentCtrl');
        });

    $http.get('/api/v1.0/content/countries')
        .success(function (data) {
            $scope.countries = data.result;
        })
        .error(function () {
            console.log('Error in getAllContentCtrl');
        });

    $http.get('/api/v1.0/content/fests')
        .success(function (data) {
            $scope.fests = data.result;
        })
        .error(function () {
            console.log('Error in getAllContentCtrl')
        });

    $http.get('/api/v1.0/content/camps')
        .success(function (data) {
            $scope.camps = data.result;
        })
        .error(function () {
            console.log('Error in getAllContentCtrl')
        });

    $scope.deleteContent = function (id) {
        $http.get('/api/v1.0/content/page/delete/' + id)
            .success(function (data) {
                $route.reload();
            })
            .error(function () {
                console.log('Error delete content, content_id= ' + id);
            });
    };

    $scope.editContent = function (id) {
        $http.get('/api/v1.0/content/page/' + id).success(function (data) {
            $scope.content = data.result;
            $scope.show_table = false;
            $scope.show_edit = true;
            $scope.show_add = false;
        }).error(function () {
            console.log('Error, get content from API, content_id= ' + id);
        });
    };

    $scope.addContent = function () {
        $scope.show_table = false;
        $scope.show_edit = false;
        $scope.show_add = true;
    };
});

dolyna.controller('loginController', ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

        $scope.login = function () {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            AuthService.login($scope.loginForm.email, $scope.loginForm.password)
            // handle success
                .then(function () {
                    $location.path('/system/tools/admin_panel');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });

        };

    }]);

dolyna.controller('logoutController', ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

        $scope.logout = function () {

            // call logout from service
            AuthService.logout()
                .then(function () {
                    $location.path('/login');
                });

        };

    }]);

dolyna.controller('registerController', ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

        $scope.register = function () {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call register from service
            AuthService.register($scope.registerForm.email,
                $scope.registerForm.password)
            // handle success
                .then(function () {
                    $location.path('/login');
                    $scope.disabled = false;
                    $scope.registerForm = {};
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });

        };

    }]);

dolyna.controller('DatepickerPopupDemoCtrl', function ($scope) {
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }
        return '';
    }
});

