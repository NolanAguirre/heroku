angular.module('myapp')
    .controller('add_friend_controller', add_friend_controller);
add_friend_controller.$inject = ['$http', '$scope', '$window', 'user_service'];
function add_friend_controller($http, $scope, $window, user_service) {
    var vm = this
    vm.service = user_service
    vm.userData = null
    var timer;
    vm.send = function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            $http.put('/add_friend', {
                user: {
                    username: vm.username
                }
            }).success(function(data) {
                vm.userData = data
            }).error(function() {
                console.log("Error connecting to database");
            });
        }, 500);
    }
    $window.onkeyup = function(e) {
        if (e.which == 13) {
            vm.send();
            $scope.$apply()
        }
    }
}
