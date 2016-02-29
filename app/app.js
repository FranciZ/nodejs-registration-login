angular.module('app', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('app').config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'partial/register/register.html',
        controller:'RegisterCtrl'
    });
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'partial/login/login.html',
        controller:'LoginCtrl'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/register');

});

angular.module('app').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
