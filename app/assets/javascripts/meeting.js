angular.module('meetingApp', [])
.controller('participantController',function($scope) {
  $scope.participants = [
    {name:'learn angular'},
    {name:'build an angular app'}];
});