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

    //if($rootScope.projects==[]||$rootScope.projects==null||$rootScope.projects.length<1){//default value
    //  $rootScope.projects = [
    //    {
    //      id: 0,
    //      imgUrl: "img/projects/ionic.png",
    //      name: "test1",
    //      pageNumber:0,
    //      description: "test1",
    //      images: [
    //        {
    //          id: 0,
    //          name: "inbox",
    //          path: 'img/projects/inbox.png',
    //          boxes: []
    //        },
    //        {
    //          id: 1,
    //          name: "detail",
    //          path: 'img/projects/detail.png',
    //          boxes: []
    //        },
    //        {
    //          id: 2,
    //          name: "reply",
    //          path: 'img/projects/reply.png',
    //          boxes: []
    //        },
    //        {
    //          id: 3,
    //          name: "search",
    //          path: 'img/projects/search.png',
    //          boxes: []
    //        },
    //        {
    //          id: 4,
    //          name: "new_mail",
    //          path: 'img/projects/new_mail.png',
    //          boxes: []
    //        },
    //        {
    //          id: 5,
    //          name: "outbox",
    //          path: 'img/projects/inbox.png',
    //          boxes: []
    //        }
    //      ],
    //      plugins: [
    //        {
    //          name: "室内星",
    //          id: 0,
    //          isSelected: false,
    //          visibility: "hidden"
    //        }
    //      ],
    //      controls: [
    //        {
    //          name: "Input",
    //          id: 0,
    //          isSelected: false,
    //          visibility: "hidden"
    //        },
    //        {
    //          name: "Submit",
    //          id: 1,
    //          isSelected: false,
    //          visibility: "hidden"
    //        },
    //        {
    //          name: "Back",
    //          id: 2,
    //          isSelected: false,
    //          visibility: "hidden"
    //        },
    //        {
    //          name: "Setting",
    //          id: 3,
    //          isSelected: false,
    //          visibility: "hidden"
    //        },
    //        {
    //          name: "Checkbox",
    //          id: 4,
    //          isSelected: false,
    //          visibility: "hidden"
    //        },
    //        {
    //          name: "Upload",
    //          id: 5,
    //          isSelected: false,
    //          visibility: "hidden"
    //        }
    //      ]
    //    }
    //  ];
    //}

    $scope.edit = function(id) {
      $rootScope.curpj = $rootScope.projects[id];
      console.log(id);
      console.log($rootScope.curpj.images.length);
      window.location.href = "#app/projectDetail";
    };

    $scope.delete = function(id) {
      var popup = $ionicPopup.confirm({
        title: '删除项目',
        template: '你确定要删除吗?'
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
              images: [],
              plugins: [
                {
                  name: "室内星",
                  id: 0,
                  isSelected: false,
                  visibility: "hidden"
                }
              ],
              controls: [
                {
                  name: "Input",
                  id: 0,
                  isSelected: false,
                  visibility: "hidden"
                },
                {
                  name: "Submit",
                  id: 1,
                  isSelected: false,
                  visibility: "hidden"
                },
                {
                  name: "Back",
                  id: 2,
                  isSelected: false,
                  visibility: "hidden"
                },
                {
                  name: "Setting",
                  id: 3,
                  isSelected: false,
                  visibility: "hidden"
                },
                {
                  name: "Checkbox",
                  id: 4,
                  isSelected: false,
                  visibility: "hidden"
                },
                {
                  name: "Upload",
                  id: 5,
                  isSelected: false,
                  visibility: "hidden"
                }
              ]
            }
        );
        $scope.projectModal.hide();
        Projects.saveProject($scope.projects);
        project.name = "";
        project.description = "";
      }
    };
  })

  .controller('ProjectsOthersCtrl', function($scope,$rootScope) {
      $rootScope.projectsOthers = [
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

  .controller('projectDetailCtrl',function($scope, $rootScope, $cordovaCamera, $ionicPopover, Projects) {
    $ionicPopover.fromTemplateUrl('templates/popover_detail_photo.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.photoPopover = popover;
    });

    $ionicPopover.fromTemplateUrl('templates/popover_detail_delete.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.deletePopover = popover;
    });

    ionic.Platform.ready(function(){
      $scope.isIOS = ionic.Platform.isIOS();
    });

    $scope.projectImagesToShow = [];

    $scope.setShow = function() {
      $scope.projectImagesToShow = [];
      if($rootScope.curpj.images!=[]){
        console.log(123);
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
      }else{
        $scope.projectImagesToShow = [];
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

    $scope.shareProject = function () {
      $rootScope.curpj.author = "N4A";
      $rootScope.curpj.address = "上海浦东";
      $rootScope.curpj.time = "09:36";
      $scope.temp = [];
      $scope.temp.push($rootScope.curpj);
      for(var i= 0; i<$rootScope.projectsOthers.length; i++) {
        $scope.temp.push($rootScope.projectsOthers[i]);
      }
      $rootScope.projectsOthers=$scope.temp;
      window.location.href="#app/projects/others";
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

      });
      $scope.photoPopover.hide();
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
        alert(imagePath);
        $scope.setShow();
        $scope.apply();
      }, function (err) {
        alert(err);
      });
      $scope.photoPopover.hide();
    };

    $scope.openDeletePopover = function(event, id) {
      $scope.deletePopover.show(event);
      $scope.deleteImgId = id;
    };

    $scope.deletePhoto = function() {
      var allImg = $rootScope.curpj.images;
      var id = $scope.deleteImgId;
      if(allImg.length!=1) {
        $rootScope.curpj.images = allImg.slice(0, id).concat(allImg.slice(id+1, allImg.length));
        angular.forEach($rootScope.curpj.images, function(item){
          if(item.id > id){
            item.id -= 1;
          }
        });
      }
      else {
        $rootScope.curpj.images = [];
      }
      $scope.deletePopover.hide();
      $scope.setShow();
      Projects.saveProject($rootScope.projects);
    };
  })

  .controller('projectEditCtrl', function($scope, $rootScope, $ionicModal, $ionicPopover, $ionicPopup, Projects, $timeout) {
      $ionicPopover.fromTemplateUrl('templates/popover_edit.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });

      $ionicModal.fromTemplateUrl('templates/use-plugin.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.pluginModal = modal;
      });

      ionic.Platform.ready(function(){
        $scope.isIOS = ionic.Platform.isIOS();
      });

      $scope.lock = false;

      $scope.openPopover = function(event) {
        $scope.popover.show(event);
        $scope.lock = true;
      };

      $scope.closePopover = function() {
        $scope.popover.hide();
        $scope.lock = false;
      };

      $scope.operate = function( ) {
        window.location.href="#app/projectOperation";
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
          var deltaX = 0,
              deltaY = 0;
          ionic.onGesture('dragstart drag dragend', function(e) {
            var changedBoxHigh = 0,
                changedBoxWide = 0,
                changedBoxLeft = 0,
                changedBoxTop = 0,
                changedStyleHigh = 0,
                changedStyleWide = 0,
                changedStyleLeft = 0,
                changedStyleTop = 0,
                parent = e.target.parentNode,
                children = parent.childNodes;

            e.gesture.srcEvent.preventDefault();
            e.gesture.preventDefault();
            switch (e.type) {
              case 'drag':
                deltaX = e.gesture.deltaX;
                deltaY = e.gesture.deltaY;
                break;
            }

            switch (position) {
              case 'upLeft':
                changedBoxHigh = parseInt(boxHigh.substring(0,boxHigh.length-2)) - deltaY;
                changedBoxWide = parseInt(boxWide.substring(0,boxWide.length-2)) - deltaX;
                changedBoxTop = parseInt(boxTop.substring(0,boxTop.length-2)) + deltaY;
                changedBoxLeft = parseInt(boxLeft.substring(0,boxLeft.length-2)) + deltaX;
                changedStyleHigh = parseInt(styleHeight.substring(0,styleHeight.length-2)) - deltaY;
                changedStyleWide = parseInt(styleWidth.substring(0,styleWidth.length-2)) - deltaX;
                changedStyleTop = parseInt(styleTop.substring(0,styleTop.length-2)) + deltaY;
                changedStyleLeft = parseInt(styleLeft.substring(0,styleLeft.length-2)) + deltaX;

                if(changedBoxHigh<50 && changedStyleHigh<50){
                  changedBoxHigh = 50;
                  changedStyleHigh = 50;
                  changedBoxTop = parseInt(boxTop.substring(0,boxTop.length-2)) + (50 - boxHigh);
                  changedStyleTop = parseInt(styleTop.substring(0,styleTop.length-2)) + (50 - styleHeight);
                }
                if(changedBoxWide<50 && changedStyleWide<50){
                  changedBoxWide = 50;
                  changedStyleWide = 50;
                  changedBoxLeft = parseInt(boxLeft.substring(0,boxLeft.length-2)) + (50 - boxWide);
                  changedStyleLeft = parseInt(styleLeft.substring(0,styleLeft.length-2)) + (50 - styleWidth);
                }

                parent.style.left = changedStyleLeft + "px";
                parent.style.top = changedStyleTop + "px";
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
                changedStyleTop = parseInt(styleTop.substring(0,styleTop.length-2)) + deltaY;

                if(changedBoxHigh<50 && changedStyleHigh<50){
                  changedBoxHigh = 50;
                  changedStyleHigh = 50;
                  changedBoxTop = parseInt(boxTop.substring(0,boxTop.length-2)) + (50 - boxHigh);
                  changedStyleTop = parseInt(styleTop.substring(0,styleTop.length-2)) + (50 - styleHeight);
                }
                if(changedBoxWide<50 && changedStyleWide<50){
                  changedBoxWide = 50;
                  changedStyleWide = 50;
                }

                parent.style.top = changedStyleTop + "px";
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
                changedStyleLeft = parseInt(styleLeft.substring(0,styleLeft.length-2)) + deltaX;

                if(changedBoxHigh<50 && changedStyleHigh<50){
                  changedBoxHigh = 50;
                  changedStyleHigh = 50;
                }
                if(changedBoxWide<50 && changedStyleWide<50){
                  changedBoxWide = 50;
                  changedStyleWide = 50;
                  changedBoxLeft = parseInt(boxLeft.substring(0,boxLeft.length-2)) + (50 - boxWide);
                  changedStyleLeft = parseInt(styleLeft.substring(0,styleLeft.length-2)) + (50 - styleWidth);
                }

                parent.style.left = changedStyleLeft + "px";
                parent.style.height = changedStyleHigh + "px";
                parent.style.width = changedStyleWide + "px";
                children[3].style.left = changedStyleWide - 5 + "px";
                children[5].style.top = changedStyleHigh - 5 + "px";
                children[7].style.left = changedStyleWide - 5 + "px";
                children[7].style.top = changedStyleHigh - 5 + "px";

                box.left = changedBoxLeft + "px";
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

                if(changedBoxHigh<50 && changedStyleHigh<50){
                  changedBoxHigh = 50;
                  changedStyleHigh = 50;
                }
                if(changedBoxWide<50 && changedStyleWide<50){
                  changedBoxWide = 50;
                  changedStyleWide = 50;
                }

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
            Projects.saveProject($rootScope.projects);
          }, point);
        });
      };

      $scope.openUsePlugin = function() {
        $scope.pluginModal.show();
        $scope.closePopover();

      };

      /*
       use-plugin.html
       */
      $scope.closeUsePlugin = function() {
        $scope.pluginModal.hide();
      };

      $scope.setPlugin = function(plugin) {
        if(plugin.isSelected == false){
          var alertPopup = $ionicPopup.alert({
            title: 'Origo',
            template: '设置成功'
          });
          alertPopup.then(function(res) {
            angular.forEach($rootScope.curpj.plugins, function(item){
              if(item.isSelected == true){
                item.isSelected = false;
                item.visibility = "hidden";
              }
            });
            plugin.isSelected = true;
            plugin.visibility = "visible";
            $scope.pluginModal.hide();
          });
        }else{
          var alertPopup = $ionicPopup.alert({
            title: 'Origo',
            template: '设置取消'
          });
          alertPopup.then(function(res) {
            plugin.isSelected = false;
            plugin.visibility = "hidden";
            $scope.pluginModal.hide();
          });
        }
      };

      $scope.setControl = function(control) {
        if(control.isSelected == false){
          var alertPopup = $ionicPopup.alert({
            title: 'Origo',
            template: '设置成功'
          });
          alertPopup.then(function(res) {
            control.isSelected = true;
            control.visibility = "visible";
            $scope.pluginModal.hide();
          });
        }else{
          var alertPopup = $ionicPopup.alert({
            title: 'Origo',
            template: '设置取消'
          });
          alertPopup.then(function(res) {
            control.isSelected = false;
            control.visibility = "hidden";
            $scope.pluginModal.hide();
          });
        }
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
