angular.module('starter.controllers', [])

<<<<<<< HEAD
.factory('Projects', function() {
      return {
        load: function() {
          var data = window.localStorage['projects'];
          if(data) {
            return angular.fromJson(data);
          }
          return [];
        },
        save: function(projects) {
          window.localStorage['projects'] = angular.toJson(projects);
        }
      }
    }
)

=======
>>>>>>> origin/member/duocai
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
<<<<<<< HEAD
    $scope.loginModal = modal;
=======
    $scope.modal = modal;
>>>>>>> origin/member/duocai
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
<<<<<<< HEAD
    $scope.loginModal.hide();
=======
    $scope.modal.hide();
>>>>>>> origin/member/duocai
  };

  // Open the login modal
  $scope.login = function() {
<<<<<<< HEAD
    $scope.loginModal.show();
=======
    $scope.modal.show();
>>>>>>> origin/member/duocai
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
<<<<<<< HEAD
.controller('ProjectsMeCtrl', function($scope, $ionicModal, Projects) {

    $ionicModal.fromTemplateUrl('templates/create-project.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.projectModal = modal;
    });

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

    $scope.projects = Projects.load();

    $scope.edit = function(id) {
      alert("你要编辑"+id);
    };

    $scope.delete = function(id) {
      var pj = $scope.projects;
      $scope.projects = pj.slice(0, id-1).concat(pj.slice(id, pj.length));
      Projects.save($scope.projects);
    };

    $scope.openNewProject = function() {
      $scope.projectModal.show();
    };

    $scope.closeNewProject = function() {
      $scope.projectModal.hide();
    };

    $scope.createProject = function(project) {
      if(project) {
        $scope.projects.push(
            {
              id : $scope.projects.length+1,
              imgUrl:"img/projects/ionic.png",
              name: project.name,
              pageNumber: 0,
              description: project.description
            }
        );
        $scope.projectModal.hide();
        Projects.save($scope.projects);
        $scope.name = "";
        $scope.description = "";
      }
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
=======

>>>>>>> origin/member/duocai
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
