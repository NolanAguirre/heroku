angular.module('myapp')
    .service('user_service', user_service);

function user_service(){
    var service = this;
    service.logged = false;
    service.userData = function(data){
        service.logged = data.logged;
        service.username = data.username;
        service.name = data.name;
        service.profilePicture = data.profilePicture;
    }
}
