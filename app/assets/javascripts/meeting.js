angular.module('meetingApp', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider',function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'participantController',
      templateUrl:'/meeting/choose_action'
    })
    .when('/participate/:id', {
      templateUrl:'/meeting/user_input/1'
    })
    .when('/participant_details', {
      templateUrl:'/meeting/participant_details'
    })
    .when('/newEvent', {
      templateUrl:'meetings#new'
    })
    .otherwise({
      redirectTo:'/'
    });
}])

.config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = document.getElementsByName('csrf-token')[0].content;
  }
])

.controller('participantController',['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.uploadedBills = [];
  $scope.uploadToCloud = function() {
   filepicker.setKey('A2kM2lyAMQqK2DgFwwJvAz');
   filepicker.pick({
      mimetypes: ['image/*'],
      container: 'modal',
      services:['COMPUTER'],
    },
    function(data){
      $http.post('/meeting/storeupload', {
        'id' : 1,
        'url': data.url,
        'filename' : data.filename,
        'agent' : navigator.userAgent
      }).success(function(){
        $scope.uploadedBills.push({
          'url': data.url,
          'filename' : data.filename,
          'date' : new Date()
        });
      });
    },
    function(FPError){
      alert('error occured in saving image to cloud');
    }
   );
  }

}]);
