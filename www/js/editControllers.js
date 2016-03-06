/**
 * Created by duocai on 2016/1/30.
 * 编辑项目控制器
 */
angular.module('starter.editControllers', ['ngCordova'])

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

    if($rootScope.projects==[]||$rootScope.projects==null||$rootScope.projects.length<1){//default value
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
              name: "inbox",
              path: 'img/projects/inbox.png',
              boxes: []
            },
            {
              id: 1,
              name: "detail",
              path: 'img/projects/detail.png',
              boxes: []
            },
            {
              id: 2,
              name: "reply",
              path: 'img/projects/reply.png',
              boxes: []
            },
            {
              id: 3,
              name: "search",
              path: 'img/projects/search.png',
              boxes: []
            },
            {
              id: 4,
              name: "new_mail",
              path: 'img/projects/new_mail.png',
              boxes: []
            },
            {
              id: 5,
              name: "outbox",
              path: 'img/projects/inbox.png',
              boxes: []
            }
          ]
        }
      ];
    }

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
      $scope.projectsOthers = [
        {
          id: 1,
          imgUrl:"img/projects/ionic.png",
          author:"小李",
          date: "2016-2-1",
          time: "10:25",
          name:"Demo@##",
          address:"上海杨浦",
          pageNumber:1,
          description: "我是一个测试项目，我是测试项目3号"
        },
        {
          id: 2,
          imgUrl:"img/projects/ionic.png",
          author:"小zhang",
          date: "2016-1-1",
          time: "09:25",
          name:"exampleHAHA",
          address:"上海浦东高科苑",
          pageNumber:31,
          description: "我是一个测试项目，我是测试项目4号"
        }
      ];
  })

  .controller('projectDetailCtrl',function($scope, $rootScope,$cordovaCamera, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('templates/popover_detail.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.projectImagesToShow = [];

    $scope.setShow = function () {
      $scope.projectImagesToShow = [];
      for (var i = 0; i<$rootScope.curpj.images.length/3; i++) {
        if (i * 3 + 2 < $rootScope.curpj.images.length) {
          $scope.projectImagesToShow.push([
            $rootScope.curpj.images[i * 3],
            $rootScope.curpj.images[i * 3 + 1],
            $rootScope.curpj.images[i * 3 + 2]
          ]);
        }
        else if (i * 3 + 1 < $rootScope.curpj.images.length) {
          $scope.projectImagesToShow.push([
            $rootScope.curpj.images[i * 3],
            $rootScope.curpj.images[i * 3 + 1]
          ]);
        }
        else {
          $scope.projectImagesToShow.push([
            $rootScope.curpj.images[i * 3]
          ]);
        }
      }
    };

    $scope.setShow();

    $scope.edit = function(id) {
      $rootScope.curImg = $rootScope.curpj.images[id];
      window.location.href="#app/projectEdit";
    };

    $scope.operate = function( ) {
      window.location.href="#app/projectOperation";
    };

    $scope.takePhoto=function() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: 0,
        cameraDirection: 0,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function (imagePath) {
        $rootScope.curpj.images.push({
          id: $rootScope.curpj.images.length,
          path: imagePath,
          boxes: []
        });
        $scope.setShow();
        $scope.apply();
      }, function (err) {
        alert(err);
      });
    };

    $scope.loadPhoto=function() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: 0,
        cameraDirection: 0,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function (imagePath) {
        $rootScope.curpj.images.push({
          id: $rootScope.curpj.images.length,
          path: imagePath,
          boxes: []
        });
        $scope.setShow();
        $scope.apply();
      }, function (err) {
        alert(err);
      });
    };
  })

  .controller('projectEditCtrl', function($scope, $rootScope, $ionicPopover, Projects, $timeout) {
      $ionicPopover.fromTemplateUrl('templates/popover_edit.html', {
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

      $scope.operate = function( ) {
        window.location.href="#app/projectOperation";
      }

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
                upLeft: {x: "-5px", y: "-5px"},
                upRight: {x: "45px", y: "-5px"},
                bottomLeft: {x: "-5px", y: "45px"},
                bottomRight: {x: "45px", y: "45px"}
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
        var id = $rootScope.curBox.id;
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

      /*
       框的缩放
       */
      $scope.move = function(event, box, position) {
        event = event ? event : window.event;
        var point = event.srcElement ? event.srcElement : event.target,
            styleHeight = point.parentNode.style.height.toString(),
            styleWidth = point.parentNode.style.width.toString(),
            styleLeft = point.parentNode.style.left.toString(),
            styleTop = point.parentNode.style.top.toString(),
            boxHigh = box.high.toString(),
            boxWide = box.wide.toString(),
            boxLeft = box.left.toString(),
            boxTop = box.top.toString();
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
                "translate3d(" + posX + "px," + posY + "px, 0) scale(1) rotate(0deg) ",
                changedBoxHigh = 0,
                changedBoxWide = 0,
                changedBoxLeft = 0,
                changedBoxTop = 0,
                changedStyleHigh = 0,
                changedStyleWide = 0,
                parent = e.target.parentNode,
                children = parent.childNodes;

            switch (position) {
              case 'upLeft':
                changedBoxHigh = parseInt(boxHigh.substring(0,boxHigh.length-2)) - deltaY;
                changedBoxWide = parseInt(boxWide.substring(0,boxWide.length-2)) - deltaX;
                changedBoxTop = parseInt(boxTop.substring(0,boxTop.length-2)) + deltaY;
                changedBoxLeft = parseInt(boxLeft.substring(0,boxLeft.length-2)) + deltaX;
                changedStyleHigh = parseInt(styleHeight.substring(0,styleHeight.length-2)) - deltaY;
                changedStyleWide = parseInt(styleWidth.substring(0,styleWidth.length-2)) - deltaX;

                parent.style.left =
                    parseInt(styleLeft.substring(0,styleLeft.length-2)) + deltaX + "px";
                parent.style.top =
                    parseInt(styleTop.substring(0,styleTop.length-2)) + deltaY + "px";
                parent.style.height = changedStyleHigh + "px";
                parent.style.width = changedStyleWide + "px";
                children[3].style.left = changedStyleWide - 5 + "px";
                children[5].style.top = changedStyleHigh - 5 + "px";
                children[7].style.left = changedStyleWide - 5 + "px";
                children[7].style.top = changedStyleHigh - 5 + "px";

                box.left = changedBoxLeft + "px";
                box.top = changedBoxTop + "px";
                box.high = changedBoxHigh + "px";
                box.wide = changedBoxWide + "px";
                box.upRight.x = changedBoxWide - 5 + "px";
                box.bottomLeft.y = changedBoxHigh - 5 + "px";
                box.bottomRight.x = changedBoxWide - 5 + "px";
                box.bottomRight.y = changedBoxHigh - 5 + "px";
                break;
              case 'upRight':
                changedBoxHigh = parseInt(boxHigh.substring(0,boxHigh.length-2)) - deltaY;
                changedBoxWide = parseInt(boxWide.substring(0,boxWide.length-2)) + deltaX;
                changedBoxTop = parseInt(boxTop.substring(0,boxTop.length-2)) + deltaY;
                changedStyleHigh = parseInt(styleHeight.substring(0,styleHeight.length-2)) - deltaY;
                changedStyleWide = parseInt(styleWidth.substring(0,styleWidth.length-2)) + deltaX;

                parent.style.top =
                    parseInt(styleTop.substring(0,styleTop.length-2)) + deltaY + "px";
                parent.style.height = changedStyleHigh + "px";
                parent.style.width = changedStyleWide + "px";
                children[3].style.left = changedStyleWide - 5 + "px";
                children[5].style.top = changedStyleHigh - 5 + "px";
                children[7].style.left = changedStyleWide - 5 + "px";
                children[7].style.top = changedStyleHigh - 5 + "px";

                box.top = changedBoxTop + "px";
                box.high = changedBoxHigh + "px";
                box.wide = changedBoxWide + "px";
                box.upRight.x = changedBoxWide - 5 + "px";
                box.bottomLeft.y = changedBoxHigh - 5 + "px";
                box.bottomRight.x = changedBoxWide - 5 + "px";
                box.bottomRight.y = changedBoxHigh - 5 + "px";
                break;
              case 'bottomLeft':
                changedBoxHigh = parseInt(boxHigh.substring(0,boxHigh.length-2)) + deltaY;
                changedBoxWide = parseInt(boxWide.substring(0,boxWide.length-2)) - deltaX;
                changedBoxLeft = parseInt(boxLeft.substring(0,boxLeft.length-2)) + deltaX;
                changedStyleHigh = parseInt(styleHeight.substring(0,styleHeight.length-2)) + deltaY;
                changedStyleWide = parseInt(styleWidth.substring(0,styleWidth.length-2)) - deltaX;

                parent.style.left =
                    parseInt(styleLeft.substring(0,styleLeft.length-2)) + deltaX + "px";
                parent.style.height = changedStyleHigh + "px";
                parent.style.width = changedStyleWide + "px";
                children[3].style.left = changedStyleWide - 5 + "px";
                children[5].style.top = changedStyleHigh - 5 + "px";
                children[7].style.left = changedStyleWide - 5 + "px";
                children[7].style.top = changedStyleHigh - 5 + "px";

                box.left = changedBoxLeft + "px";
                box.top = changedBoxTop + "px";
                box.high = changedBoxHigh + "px";
                box.wide = changedBoxWide + "px";
                box.upRight.x = changedBoxWide - 5 + "px";
                box.bottomLeft.y = changedBoxHigh - 5 + "px";
                box.bottomRight.x = changedBoxWide - 5 + "px";
                box.bottomRight.y = changedBoxHigh - 5 + "px";
                break;
              case 'bottomRight':
                changedBoxHigh = parseInt(boxHigh.substring(0,boxHigh.length-2)) + deltaY;
                changedBoxWide = parseInt(boxWide.substring(0,boxWide.length-2)) + deltaX;
                changedStyleHigh = parseInt(styleHeight.substring(0,styleHeight.length-2)) + deltaY;
                changedStyleWide = parseInt(styleWidth.substring(0,styleWidth.length-2)) + deltaX;

                parent.style.height = changedStyleHigh + "px";
                parent.style.width = changedStyleWide + "px";
                children[3].style.left = changedStyleWide - 5 + "px";
                children[5].style.top = changedStyleHigh - 5 + "px";
                children[7].style.left = changedStyleWide - 5 + "px";
                children[7].style.top = changedStyleHigh - 5 + "px";

                box.high = changedBoxHigh + "px";
                box.wide = changedBoxWide + "px";
                box.upRight.x = changedBoxWide - 5 + "px";
                box.bottomLeft.y = changedBoxHigh - 5 + "px";
                box.bottomRight.x = changedBoxWide - 5 + "px";
                box.bottomRight.y = changedBoxHigh - 5 + "px";
                break;
            }
          }, point);
        });
      }
  })

  .controller('projectLinkCtrl', function($scope, $rootScope, Projects) {
      $scope.projectLinkImagesToShow = [];

      for (var i = 0; i<$rootScope.curpj.images.length/3; i++) {
        $scope.projectLinkImagesToShow.push([
          $rootScope.curpj.images[i*3],
          $rootScope.curpj.images[i*3+1],
          $rootScope.curpj.images[i*3+2]
        ]);
      }

      $scope.linkTo = function(id) {
        $rootScope.curBox.link = id;
        Projects.saveProject($rootScope.projects);
        window.location.href="#/app/projectEdit";
      }
  })
  .controller("projectOperationCtrl", function($scope, $rootScope) {
    $scope.curImgId = 0;//default

    $scope.check = function(){

      if(!$scope.lock){
        //var coordinate = {x:0, y:0};
        var x = event.gesture.touches[0].pageX;
        var y = event.gesture.touches[0].pageY;

        for(var i = 0; i < $rootScope.curpj.images[$scope.curImgId].boxes.length; i++) {
          var box = $rootScope.curpj.images[$scope.curImgId].boxes[i];
          var top = parseInt(box.top.substring(0,box.top.length-2))+25+43;
          var left = parseInt(box.left.substring(0,box.left.length-2))+25;
          var down = top + parseInt(box.high.substring(0,box.high.length-2));
          var right = left + parseInt(box.wide.substring(0,box.wide.length-2));

          if (x>left && x<right && y>top && y<down){
            $scope.curImgId = box.link;
          }
        }
      }
    };

    $scope.share = function() {

    };
  });
