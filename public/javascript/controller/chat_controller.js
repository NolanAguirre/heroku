angular.module('myapp')
    .controller('chat_controller', chat_controller);

chat_controller.$inject = ['$http', '$scope'];

function chat_controller($http, $scope) {
    var vm = this;
    vm.messages = {
        recive : [],
        sent : []
    }
    vm.send = function(){
        vm.messages.sent.push(document.getElementById('input').innerHTML);
        document.getElementById('chat-display').scrollTop = 10000;
        //$scope.$apply();
        // $http.put('/chat', {
        //     user: {
        //         username: vm.username,
        //         message: vm.message
        //     }
        // }).success(function(data){
        //     if(data){
        //
        //     }
        // }).error(function(){
        //     console.log("Error connecting to database");
        // });
        if(vm.messages.sent.length == 100){
            vm.messages.sent = vm.messages.sent.splice(1,99);
        }
    }
}
