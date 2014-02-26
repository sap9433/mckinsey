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

.controller('userinputController',function($scope, $http) {
(function() {

  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
      width = 320,
      height = 0;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var image = canvas.toDataURL('image/png');

     //Uplload to imgur - start
    $http({
          method  : 'POST',
          url     : 'https://api.imgur.com/3/upload',
          data    : {
            'Client-ID' : '71762f6a0a8efcf',
            'image' : image,
          },  // pass in data as strings
      })
    .success(function(data) {
        console.log(data);

        if (!data.success) {
          // if not successful, bind errors to error variables
            $scope.errorName = data.errors.name;
            $scope.errorSuperhero = data.errors.superheroAlias;
        } else {
          // if successful, bind success message to message
            $scope.message = data.message;
        }
    });
    //Upload to imgur - end


  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();
  }, false);

})();
})
