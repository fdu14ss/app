/**
 * Created by duocai on 2016/1/30.
 * 编辑项目控制器
 */
angular.module('starter.editControllers', [])

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
  })

  .controller('ProjectsMeCtrl', function($scope, $ionicModal, $ionicPopup, Projects) {
    $ionicModal.fromTemplateUrl('templates/create-project.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.projectModal = modal;
    });

    $scope.projects = Projects.load();

    $scope.edit = function(id) {
      window.location.href = "#app/projectDetail";
    };

    $scope.delete = function(id) {
      var popup = $ionicPopup.confirm({
        title: '删除项目',
        template: '你确定要删除吗?',
      });
      popup.then(function(res) {
        if(res){
          var pj = $scope.projects;
          if(pj.length!=1) {
            $scope.projects = pj.slice(0, id-1).concat(pj.slice(id, pj.length));
          }
          else {
            $scope.projects = [];
          }
          Projects.save($scope.projects);
        }
      })
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
        project.name = "";
        project.description = "";
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
  .controller('projectDetailCtrl',function($scope) {
    $scope.project = {
      name: 'demo1',
      images: [
        [
          {
            id: 1,
            path: 'img/projects/demo.png'
          },
          {
            id: 2,
            path: 'img/projects/demo.png'
          },
          {
            id: 3,
            path: 'img/projects/demo.png'
          }
        ],
        [
          {
            id: 4,
            path: 'img/projects/demo.png'
          },
          {
            id: 5,
            path: 'img/projects/demo.png'
          },
          {
            id: 6,
            path: 'img/projects/demo.png'
          }
        ]
      ]
    };

    $scope.edit = function(id) {
      window.location.href="#app/projectEdit";
    }

  })
  .controller('projectEditCtrl', function($scope) {
    $scope.edit = function() {
      var c = ionic.tap.pointerCoord(event);
      console.log(event);
      alert(angular.toJson(event));
    }
  });
