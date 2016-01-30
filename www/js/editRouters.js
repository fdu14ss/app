/**
 * Created by duocai on 2016/1/30.
 * 编辑项目路由配置
 */
angular.module('stater.editRouters', [])
  .config(function ($stateProvider) {
    $stateProvider
      //编辑项目
      .state('app.edit', {
        url: '/edit',
        views: {
          'menuContent': {
            templateUrl: 'templates/edit.html'
          }
        }
      });
  });
