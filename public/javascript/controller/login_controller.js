angular.module('myapp')
    .controller('login_controller', login_controller);

login_controller.$inject = ['$http', '$location'];

function login_controller($http, $location) {
    var vm = this;
    vm.login = function(){
        console.log('sending login info')
        $http.put('/login', {
            user: {
                username: vm.username,
                password: vm.password
            }
        }).success(function(data){
            if(data == false){

            }else{
                $location.path("/chat");
            }

        }).error(function(){
            console.log("Error connecting to database");
        });
    }
}
