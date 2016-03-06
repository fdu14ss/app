angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {
    username: "",
    password: ""
  };
  $scope.userData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

    //注册页面
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });

  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  $scope.openRegister = function() {
    $scope.registerModal.show();
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

  //打开注册页面
  $scope.register = function() {
    $scope.registerModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $http.post("http://clover.fduss.com/register",angular.toJson($scope.loginData))
        .success(function(data) {
          console.log('Doing register', data);
        });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 2000);
  };

  $scope.doRegister = function() {
    console.log('Doing register', $scope.loginData);
    $http.post("http://clover.fduss.com/register",angular.toJson($scope.loginData))
        .success(function(data) {
          alert(data);
        });


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
      $scope.closeRegister();
    }, 2000);
  };
})

.controller('PlansCtrl', function($scope) {
  $scope.plans = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
});
