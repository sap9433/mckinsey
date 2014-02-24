angular.module('meetingApp', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'participantController',
      templateUrl:'/meeting/participant_details'
    })
    .when('/participate', {
      templateUrl:'/meeting/user_input'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('participantController',function($scope) {
  $scope.participants = [
    {name:'Saptarshi chatterjee'},
    {name:'Robert De Niro'},
    {name:'Christian Bale'},
    {name:'mark zuckerberg'}];
})
