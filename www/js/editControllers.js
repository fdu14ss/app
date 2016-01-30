/**
 * Created by duocai on 2016/1/30.
 * 编辑项目控制器
 */
angular.module('starter.editControllers', [])

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
      //alert("你要编辑"+id);
      window.location.href = "#app/projectDetail";
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


  });
