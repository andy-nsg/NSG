four51.app.controller('NavCtrl', ['$location', '$route', '$scope', '$451', '$timeout', 'User',
  function ($location, $route, $scope, $451, $timeout, User) {
      $scope.Logout = function(){
          User.logout($scope.user, function(u){
              if ($scope.isAnon) {
                  $timeout(function () {
                      $location.path("/catalog");
                      location.reload(true);
                  }, 500);
              }
          }, function(ex){
              console.log(ex.Message);
          });
      };
  
      // http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
      $scope.isActive = function(path) {
          var cur_path = $location.path().replace('/', '');
          var result = false;
  
          if (path instanceof Array) {
              angular.forEach(path, function(p) {
                  if (p == cur_path && !result)
                      result = true;
              });
          }
          else {
              if (cur_path == path)
                  result = true;
          }
          return result;
      };
      // extension of above isActive in path
      $scope.isInPath = function(path) {
          var cur_path = $location.path().replace('/', '');
          var result = false;
  
          if(cur_path.indexOf(path) > -1) {
              result = true;
          }
          else {
              result = false;
          }
          return result;
      };
  
      $scope.Clear = function() {
          localStorage.clear();
      }
  
      $scope.$on('event:orderUpdate', function(event, order) {
          $scope.cartCount = (order ? ((order.Status == 'Unsubmitted') ? order.LineItems.length : null) : null);
      });
  }]);