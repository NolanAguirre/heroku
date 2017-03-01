angular.module('myapp')
    .controller('chat_controller', chat_controller);

chat_controller.$inject = ['$http', '$window', 'user_service'];

function chat_controller($http, $window, user_service) {
    var vm = this;
    var socket = io.connect();
    vm.service = user_service;
    vm.messages = {
        recive: [],
        sent: []
    }
    document.getElementById('input').addEventListener('keypress', function(e) {
        if (e.which == 13) {
            e.preventDefault();
        }
    })
    vm.send = function() {
        if (document.getElementById('input').innerHTML != "") {
            vm.messages.sent.push(document.getElementById('input').innerHTML);
            document.getElementById('chat-display').scrollTop = 10000;
            socket.emit('message', {
                message:{
                    from: vm.service.userData.username,
                    to: "bob",
                    data: document.getElementById('input').innerHTML
                }
            });
            if (vm.messages.sent.length == 100) {
                vm.messages.sent = vm.messages.sent.splice(1, 99);
            }
            document.getElementById('input').innerHTML = "";
        }
    }
    $window.onkeyup = function(e) {
        if (e.which == 13) {
            vm.send();
        }
    }
}
