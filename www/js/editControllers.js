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
    从数据库加载该用户的所有项目
     */
    $scope.projects = Projects.loadProject();

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
          var pj = $scope.projects;
          if(pj.length!=1) {
            $scope.projects = pj.slice(0, id-1).concat(pj.slice(id, pj.length));
            angular.forEach($scope.projects, function(item){
              if(item.id > id){
                item.id -= 1;
              }
            });
          }
          else {
            $scope.projects = [];
          }
          Projects.saveProject($scope.projects);
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
        Projects.saveProject($scope.projects);
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

  .controller('projectDetailCtrl',function($scope, $rootScope) {
    /*
    从数据库加载
     */
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

      //var htmlboxes = angular.element(['.box']);
      //angular.forEach(htmlboxes, function(htmlbox, index) {
      //  $scope.b
      //});

      $scope.edit = function(){
        var coordinate = {x:0, y:0};
        coordinate.x = event.gesture.touches[0].pageX;
        coordinate.y = event.gesture.touches[0].pageY;
        console.log("x: " + coordinate.x + "y" + coordinate.y);
        //console.log(angular.toJson(event));
        $scope.boxes.push(
            {
              id: $scope.boxes.length+1,
              top: coordinate.y + "px",
              left: coordinate.x + "px",
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
