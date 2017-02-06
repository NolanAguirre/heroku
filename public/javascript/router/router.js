angular.module('myapp')
    .config(Router);

Router.$inject = ['$routeProvider'];
function Router($routeProvider) {
    $routeProvider
        .when('/', {/*controller: 'Controller as vm',*/templateUrl:'templates/index.html'})
        .when('/create_account', {/*controller: 'Controller as vm',*/templateUrl:'templates/create_account.html'})
        .when('/account_created', {templateUrl:'templates/account_created.html'})
        .otherwise({redirectTo: '/'});
}
