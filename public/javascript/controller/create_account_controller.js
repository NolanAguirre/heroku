angular.module('myapp')
    .controller('create_account_controller', create_account_controller);

create_account_controller.$inject = ['$http', '$window'];

function create_account_controller($http, $window) {
    var vm = this;
    vm.usernameBuffer = false;
    uniquePassword = false;
    console.log("Don't break this code, it's using client side trust");
    var date = new Date();
    var time = date.getTime();
    vm.checkUsername = function() {
        vm.usernameBuffer = true;
        if((time+2000) < date.getSeconds()){
            time = date.getTime();
            $http.put('/create_account', {
                user: {
                    username: vm.username
                }
            }).success(function(data){
                vm.usernameBuffer = false;
                uniquePassword = !data;
            }).error(function(){
                console.log("Error connecting to database");
            });
        }
    }
    vm.checkPasswordStrength = function() {
        if (vm.password != null && vm.password.length >= 6 && vm.password.match(/\d+/g) != null) {
            vm.passwordStrength = "password is strong";
            return true;
        } else {
            vm.passwordStrength = "password is weak"
            return false;
        }
    }
    vm.checkPasswordMatch = function() {
        if (vm.passwordTwo == null) {
            return false;
        }
        if (vm.password == vm.passwordTwo) {
            vm.passwordmatch = "passwords match";
            return true;
        } else {
            vm.passwordmatch = "password mismatch";
            return false;
        }
    }
    vm.mkuser = function() {
        if (vm.checkPasswordMatch() && vm.checkPasswordStrength() && uniquePassword) {
            $http.post('/create_account', {
                user: {
                    username: vm.username,
                    password: vm.password
                }
            });
            window.location.href = '/#/account_created';
        }

    }
}
