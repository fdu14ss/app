/**
 * Created by duocai on 2016/1/30.
 * 编辑项目控制器
 */
angular.module('starter.editControllers', [])

  .factory('Projects', function() {
    return {
      loadProject: function() {
        var data = window.localStorage['projects'];
        if(data) {
          return angular.fromJson(data);
        }
        return [];
      },
      saveProject: function(projects) {
        window.localStorage['projects'] = angular.toJson(projects);
      }
    }
  })

  .factory('Boxes', function() {
    return {
      loadBox: function() {
        var box = window.localStorage['boxes'];
        if(box) {
          return angular.fromJson(box);
        }
        return [];
      },
      saveBox: function(boxes) {
        window.localStorage['boxes'] = angular.toJson(boxes);
      }
    }
  })

  .controller('ProjectsMeCtrl', function($scope, $rootScope, $ionicModal, $ionicPopup, Projects) {
    $ionicModal.fromTemplateUrl('templates/create-project.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.projectModal = modal;
    });

    /*
    从本地加载该用户的所有项目
     */
    //$scope.projects = Projects.loadProject();
    $rootScope.projects = [
      {
        id: 1,
        imgUrl: "img/projects/ionic.png",
        name: "test1",
        pageNumber:0,
        description: "test1",
        images: [
          {
            id: 1,
            path: 'img/projects/inbox.png',
            boxes: []
          },
          {
            id: 2,
            path: 'img/projects/detail.png',
            boxes: []
          },
          {
            id: 3,
            path: 'img/projects/reply.png',
            boxes: []
          },
          {
            id: 4,
            path: 'img/projects/search.png',
            boxes: []
          },
          {
            id: 5,
            path: 'img/projects/new_mail.png',
            boxes: []
          },
          {
            id: 6,
            path: 'img/projects/inbox.png',
            boxes: []
          }
        ],
      }
    ];

    $scope.edit = function(id) {
      $rootScope.projectId = id;
      window.location.href = "#app/projectDetail";
    };

    $scope.delete = function(id) {
      var popup = $ionicPopup.confirm({
        title: '删除项目',
        template: '你确定要删除吗?',
      });
      popup.then(function(res) {
        if(res){
          var pj = $rootScope.projects;
          if(pj.length!=1) {
            $rootScope.projects = pj.slice(0, id-1).concat(pj.slice(id, pj.length));
            angular.forEach($rootScope.projects, function(item){
              if(item.id > id){
                item.id -= 1;
              }
            });
          }
          else {
            $rootScope.projects = [];
          }
          Projects.saveProject($rootScope.projects);
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
        $rootScope.projects.push(
            {
              id : $rootScope.projects.length+1,
              imgUrl:"img/projects/ionic.png",
              name: project.name,
              pageNumber: 0,
              description: project.description,
              images: []
            }
        );
        $scope.projectModal.hide();
        Projects.saveProject($scope.projects);
        project.name = "";
        project.description = "";
      }
    };
  })

  .controller('ProjectsOthersCtrl', function($scope) {

  })

  .controller('projectDetailCtrl',function($scope, $rootScope) {
    $scope.currentProject = $rootScope.projects[$rootScope.projectId];

    $scope.edit = function(id) {
      $rootScope.imgId = id;
      window.location.href="#app/projectEdit";
    }

  })
  .controller('projectEditCtrl', function($scope, $ionicPopover, Boxes) {
      $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
      });

      $scope.boxes = [];
      var currentBoxes =
      /*var htmlboxes = angular.element(['.box']);
      alert(htmlboxes.length);
      angular.forEach(htmlboxes, function(htmlbox, index){
        var curBox = $scope.boxes[index];
        htmlbox.css("left", curBox.left);
        htmlbox.css({
          "left": curBox.left,
          "top": curBox.top,
          "width": curBox.width,
          "height": curBox.height
        });
      });*/

      $scope.newBox = function(){
        var coordinate = {x:0, y:0};
        coordinate.x = event.gesture.touches[0].pageX;
        coordinate.y = event.gesture.touches[0].pageY;
        $scope.boxes.push(
            {
              id: $scope.boxes.length+1,
              top: (coordinate.y-25-43) + "px",
              left: (coordinate.x-25) + "px",
              width: "50px",
              height: "50px",
              link: -1
            }
        );
        Boxes.saveBox($scope.boxes);
      }

      $scope.setCurrentBox = function(index) {
        $scope.currentIndex = index;
      }

      $scope.deleteBox = function() {
        var allBox = $scope.boxes;
        var id = $scope.currentIndex;
        if(allBox.length!=1) {
          $scope.boxes = allBox.slice(0, id-1).concat(allBox.slice(id, allBox.length));
        }
        else {
          $scope.boxes = [];
        }
        Boxes.saveBox($scope.boxes);
      }

      $scope.skip = function(){
        window.location.href = "#app/projectLink";
      }

      $scope.linkTo = function(index) {
        $scope.boxes[$scope.currentIndex].link = index;
        Boxes.saveBox($scope.boxes);
        window.location.href="#/app/projectEdit";
      }
  });
