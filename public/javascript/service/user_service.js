angular.module('myapp')
    .service('user_service', user_service);

user_service.$inject = ['$cookies'];

function user_service($cookies) {
    var service = this;
    service.userData = {
        logged: function(){return $cookies.get('logged')},
        username: $cookies.get('username'),
        name: $cookies.get('name'),
        profilePicture: $cookies.get('profilePicture'),
        friends: ['bob', 'joe', 'dave', 'chuck', 'jacob', 'david']
    }
    service.loadUserData = function(data) {
        var date = new Date();
        date.setMinutes(new Date().getMinutes() + 120);
        $cookies.put('logged', data.logged, {
            expires: date
        });
        $cookies.put('username', data.username, {
            expires: date
        });
        $cookies.put('name', data.name, {
            expires: date
        });
        $cookies.put('profilePicture', data.profilePicture, {
            expires: date
        });
    }

}
