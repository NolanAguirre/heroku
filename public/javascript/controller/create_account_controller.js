angular.module('myapp')
    .controller('create_account_controller', create_account_controller);

create_account_controller.$inject = ['$http'];

function create_account_controller($http) {
    var vm = this;
    vm.usernameBuffer = false;
    uniqueUsername = false;
    console.log("Don't break this code, it's using client side trust");
    var timer;
    vm.checkUsername = function() {
        vm.usernameBuffer = true;
        uniqueUsername = false;
        clearTimeout(timer);
        timer = setTimeout(function() {
            $http.put('/create_account', {
                user: {
                    username: vm.username
                }
            }).success(function(data) {
                vm.usernameBuffer = false;
                if (!data) {
                    vm.usernameTaken = "username is available"
                    uniqueUsername = true;
                } else {
                    vm.usernameTaken = "username is taken"
                }

            }).error(function() {
                console.log("Error connecting to database");
            });
        }, 500);
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
        if (vm.checkPasswordMatch() && vm.checkPasswordStrength() && uniqueUsername) {
            $http.post('/create_account', {
                user: {
                    username: vm.username,
                    password: vm.password,
                    name: vm.name
                }
            });
            window.location.href = '/#/create_account/upload_picture';
        }

    }
}
