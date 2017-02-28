angular.module('myapp')
    .controller('login_controller', login_controller);

login_controller.$inject = ['$http', '$location', '$timeout', 'user_service'];

function login_controller($http, $location,$timeout, user_service) {
    var vm = this;
    vm.service = user_service;
    vm.login = function(){
        console.log('sending login info')
        $http.put('/login', {
            user: {
                username: vm.username,
                password: vm.password
            }
        }).success(function(data){
            console.log(data);
            if(data.logged){
                vm.service.loadUserData(data);
                $timeout(function(){
                    $location.path("/chat");
                }, 100);
            }else{

            }

        }).error(function(){
            console.log("Error connecting to database");
        });
    }
}
