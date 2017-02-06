angular.module('myapp')
    .controller('nav_bar_controller', create_account_controller);

create_account_controller.$inject = ['$http'];

function nav_bar_controller($http, $window) {
    var vm = this;
}
