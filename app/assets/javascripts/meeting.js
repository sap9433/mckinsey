angular.module('meetingApp', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider',function($routeProvider) {
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
}])

.controller('participantController',['$scope', function($scope) {
  $scope.participants = [
    {name:'Saptarshi chatterjee'},
    {name:'Robert De Niro'},
    {name:'Christian Bale'},
    {name:'mark zuckerberg'}];

  $scope.uploadToCloud = function() {
   filepicker.setKey('A2kM2lyAMQqK2DgFwwJvAz');
   filepicker.pick({
      mimetypes: ['image/*', 'text/plain'],
      container: 'window',
      services:['COMPUTER', 'FACEBOOK', 'GMAIL'],
    },
    function(InkBlob){
      console.log(JSON.stringify(InkBlob));
    },
    function(FPError){
      console.log(FPError.toString());
    }
   );
  }

}]);
