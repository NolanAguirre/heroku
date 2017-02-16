angular.module('myapp')
    .controller('nav_bar_controller', nav_bar_controller);

create_account_controller.$inject = ['user_service'];

function nav_bar_controller(user_service) {
    var vm = this;
    vm.service = user_service;
}
