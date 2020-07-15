(function () {
'use strict';
    
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
    
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.list = null;
    $scope.message = "";
    
      $scope.check = function(){
          var input = $scope.list;
          if(input == null || input.split(',') == ""){
              $scope.message = "Please enter data first";
          }
          else{
            if(input.split(',').length <= 3) {
                $scope.message = "Enjoy!";
            }
            else{
              $scope.message = "Too much!";
            } 
          }    
      }
}   
})();
    