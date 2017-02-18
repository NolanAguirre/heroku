angular.module('myapp')
    .service('user_service', user_service);

user_service.$inject = ['$cookies'];

function user_service($cookies){
    var service = this;
    service.userData = {
        logged: $cookies.get('logged'),
        username: $cookies.get('username'),
        name: $cookies.get('name'),
        profilePicture: $cookies.get('profilePicture')
    }
    service.loadUserData = function(data){
        $cookies.put('logged', data.logged, new Date().setTime(new Date().getTime()+3600000));
        $cookies.put('username', data.username, new Date().setTime(new Date().getTime()+3600000));
        $cookies.put('name', data.name, new Date().setTime(new Date().getTime()+3600000));
        $cookies.put('profilePicture', data.profilePicture, new Date().setTime(new Date().getTime()+3600000));
    }

}
