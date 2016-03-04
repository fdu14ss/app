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

  .directive('ionPinch', function($timeout) {
    return {
      restrict: 'A',
      link: function($scope, $element) {
        var styleHeight = $element[0].parentNode.style.height.toString(),
            styleWidth = $element[0].parentNode.style.width.toString();

        $timeout(function() {
          var posX = 0,
              posY = 0,
              lastPosX = 0,
              lastPosY = 0,
              scale = 1,
              lastScale,
              rotation = 0;
          ionic.onGesture('touch drag transform dragend', function(e) {
            e.gesture.srcEvent.preventDefault();
            e.gesture.preventDefault();
            switch (e.type) {
              case 'drag':
                posX = e.gesture.deltaX + lastPosX;
                posY = e.gesture.deltaY + lastPosY;
                e.target.parentNode.style.height =
                    parseInt(styleHeight.substring(0,styleHeight.length-2))
                    + e.gesture.deltaY + "px";
                e.target.parentNode.style.width =
                    parseInt(styleWidth.substring(0,styleWidth.length-2))
                    + e.gesture.deltaX + "px";
                break;
              case 'dragend':
                lastPosX = posX;
                lastPosY = posY;
                lastScale = scale;
                break;
            }
            var transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale(" + scale + ")" +
                "rotate(" + rotation + "deg) ";
            e.target.style.transform = transform;
            e.target.style.webkitTransform = transform;
          }, $element[0]);
        });
      }
    };
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
    $rootScope.projects = Projects.loadProject();

    $rootScope.projects = [
      {
        id: 0,
        imgUrl: "img/projects/ionic.png",
        name: "test1",
        pageNumber:0,
        description: "test1",
        images: [
          {
            id: 0,
            path: 'img/projects/inbox.png',
            boxes: []
          },
          {
            id: 1,
            path: 'img/projects/detail.png',
            boxes: []
          },
          {
            id: 2,
            path: 'img/projects/reply.png',
            boxes: []
          },
          {
            id: 3,
            path: 'img/projects/search.png',
            boxes: []
          },
          {
            id: 4,
            path: 'img/projects/new_mail.png',
            boxes: []
          },
          {
            id: 5,
            path: 'img/projects/inbox.png',
            boxes: []
          }
        ]
      },
    ];

    $scope.edit = function(id) {
      $rootScope.curpj = $rootScope.projects[id];
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
            $rootScope.projects = pj.slice(0, id).concat(pj.slice(id+1, pj.length));
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
              id : $rootScope.projects.length,
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

    $scope.edit = function(id) {
      $rootScope.curImg = $rootScope.curpj.images[id];
      window.location.href="#app/projectEdit";
    }

  })
  .controller('projectEditCtrl', function($scope, $rootScope, $ionicPopover, Projects, $timeout) {
      $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
      });
      $scope.lock = false;

      $scope.openPopover = function($event) {
        $scope.popover.show($event);
        $scope.lock = true;
      };

      $scope.closePopover = function() {
        $scope.popover.hide();
        $scope.lock = false;
      };

      $scope.newBox = function(){
        if(!$scope.lock){
          var coordinate = {x:0, y:0};
          coordinate.x = event.gesture.touches[0].pageX;
          coordinate.y = event.gesture.touches[0].pageY;
          $rootScope.curImg.boxes.push(
              {
                id: $rootScope.curImg.boxes.length,
                top: (coordinate.y-25-43) + "px",
                left: (coordinate.x-25) + "px",
                wide: "50px",
                high: "50px",
                link: -1,
              }
          );
          Projects.saveProject($rootScope.projects);
        }
      };

      $scope.setCurrentBox = function(id) {
        $rootScope.curBox = $rootScope.curImg.boxes[id];
      };

      $scope.deleteBox = function() {
        var allBox = $rootScope.curImg.boxes;
        var id = $scope.currentIndex;
        if(allBox.length!=1) {
          $rootScope.curImg.boxes = allBox.slice(0, id).concat(allBox.slice(id+1, allBox.length));
          angular.forEach($rootScope.curImg.boxes, function(item){
            if(item.id > id){
              item.id -= 1;
            }
          });
        }
        else {
          $rootScope.curImg.boxes = [];
        }
        Projects.saveProject($rootScope.projects);
      };

      $scope.skip = function(){
        window.location.href = "#app/projectLink";
      };

      $scope.move = function(event, box) {
        event = event ? event : window.event;
        var point = event.srcElement ? event.srcElement : event.target,
            styleHeight = point.parentNode.style.height.toString(),
            styleWidth = point.parentNode.style.width.toString(),
            boxHigh = box.high.toString(),
            boxWide = box.wide.toString();
        //console.log("before: "+boxHigh);
        $timeout(function() {
          var posX = 0,
              posY = 0,
              lastPosX = 0,
              lastPosY = 0,
              deltaX = 0,
              deltaY = 0;
          ionic.onGesture('touch drag transform dragend', function(e) {
            e.gesture.srcEvent.preventDefault();
            e.gesture.preventDefault();
            switch (e.type) {
              case 'drag':
                deltaX = e.gesture.deltaX;
                deltaY = e.gesture.deltaY;
                posX = deltaX + lastPosX;
                posY = deltaY + lastPosY;
                break;
              case 'dragend':
                lastPosX = posX;
                lastPosY = posY;
                break;
            }
            var transform =
                "translate3d(" + posX + "px," + posY + "px, 0) scale(1) rotate(0deg) ";
            e.target.style.transform = transform;
            e.target.style.webkitTransform = transform;
            e.target.parentNode.style.height =
                parseInt(styleHeight.substring(0,styleHeight.length-2))
                + deltaY + "px";
            box.high = parseInt(boxHigh.substring(0,boxHigh.length-2))
                + deltaY + "px";
            e.target.parentNode.style.width =
                parseInt(styleWidth.substring(0,styleWidth.length-2))
                + deltaX + "px";
            box.wide = parseInt(boxWide.substring(0,boxWide.length-2))
                + deltaX + "px";
            //console.log("after: "+box.high);
          }, point);
        });
      }
  })

  .controller('projectLinkCtrl', function($scope, $rootScope, Projects) {
      $scope.linkTo = function(id) {
        $rootScope.curBox.link = id;
        Projects.saveProject($rootScope.projects);
        window.location.href="#/app/projectEdit";
      }
  });
