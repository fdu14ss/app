// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','stater.editRouters','starter.editControllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  //使得导航栏在不同平台中适配标准
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
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
  .state('app.notice', {
      url: '/notice',
      views: {
        'menuContent': {
          templateUrl: 'templates/notice.html'
        }
      }
    })
    .state('app.plans', {
      url: '/plans',
      views: {
        'menuContent': {
          templateUrl: 'templates/plans.html',
          controller: 'PlansCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/projects/me');
});
