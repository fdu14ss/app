/**
 * Created by duocai on 2016/1/30.
 * 编辑项目路由配置
 */
angular.module('stater.editRouters', [])
  .config(function ($stateProvider) {
    $stateProvider

      .state('app.projects', {
        url: '/projects',
        abstract: true,
        views: {
          'menuContent': {
            templateUrl: 'templates/projects.html',
          }
        }
      })
      .state('app.projects.me', {
        url: '/me',
        views: {
          'me': {
            templateUrl: 'templates/projects.me.html',
            controller: 'ProjectsMeCtrl'
          }
        }
      })
      .state('app.projects.others', {
        url: '/others',
        views: {
          'others': {
            templateUrl: 'templates/projects.others.html',
            controller: 'ProjectsOthersCtrl'
          }
        }
      })

      //编辑项目
      .state('app.projectDetail', {
        url: '/projectDetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/project.detail.html',
            controller: 'projectDetailCtrl'
          }
        }
      })
      .state('app.projectEdit', {
        url: '/projectEdit',
        views: {
          'menuContent': {
            templateUrl: 'templates/project.edit.html',
            controller: 'projectEditCtrl'
          }
        }
      })
      .state('app.projectLink', {
        url: '/projectLink',
        views: {
          'menuContent': {
            templateUrl: 'templates/project.link.html',
            controller: 'projectEditCtrl'
          }
        }
      });
  });
