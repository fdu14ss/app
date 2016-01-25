angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  //打开注册页面
  $scope.register = function() {
    alert("暂未实现");
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('ProjectsMeCtrl', function($scope) {
    $scope.projects = [
      {
        id: 1,
        imgUrl:"img/projects/ionic.png",
        name:"Demo",
        pageNumber:1,
        description: "我是一个测试项目，我是测试项目1号"
      },
      {
        id: 2,
        imgUrl:"img/projects/ionic.png",
        name:"example",
        pageNumber:3,
        description: "我是一个测试项目，我是测试项目2号"
      }
    ];

    $scope.edit = function(id) {
      alert("你要编辑"+id);
    };
})
.controller('ProjectsOthersCtrl', function($scope) {
  $scope.projects = [
    {
      id: 1,
      imgUrl:"img/projects/ionic.png",
      name:"DemoOthers",
      pageNumber:1,
      description: "我是一个测试项目，我是测试项目3号"
    },
    {
      id: 2,
      imgUrl:"img/projects/ionic.png",
      name:"exampleOthers",
      pageNumber:31,
      description: "我是一个测试项目，我是测试项目1号"
    }
  ];
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
