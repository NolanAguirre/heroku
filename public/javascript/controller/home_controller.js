angular.module('myapp')
    .controller('home_controller', home_controller);

home_controller.$inject = ['$http'];

function home_controller($http) {
    vm = this;
    vm.log = function() {
        console.log('sending post request');
        if (vm.username != null && vm.password != null) {
            $http.post('http://localhost:3000/', {
                "use": "log",
                user: {
                    username: vm.username,
                    password: vm.password
                }
            }).success(function(data){
                console.log(data);
            }).error(function(){
                console.log("Adam Touched It (its broken)");
            });
        }
    }
}
