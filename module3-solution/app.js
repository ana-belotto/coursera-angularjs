(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', foundItemsDirective)
    .controller('FoundItemsDirectiveController', FoundItemsDirectiveController)

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
            items: '<',
            onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            transclude: true
        };

        return ddo;
    }

    FoundItemsDirectiveController.$inject = ['$rootScope'];
    function FoundItemsDirectiveController($rootScope) {
        var list = this;
        
        list.removeItem = function (itemIndex) {
            $rootScope.menu.found.splice(itemIndex, 1)
          };
    }

    NarrowItDownController.$inject = ['MenuSearchService', '$rootScope'];
    function NarrowItDownController(MenuSearchService, $rootScope) {
        $rootScope.menu = this;
        $rootScope.menu.found = [];

        $rootScope.menu.logMenuItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems();

            promise.then(function (response) {
                response = response.data.menu_items;
                for(var i=0; i<response.length; i++){
                    if(response[i].description.includes(searchTerm)){
                        $rootScope.menu.found.push(response[i]);
                    }
                }         
            })
            .catch(function (error) {
              console.log(error);
            })
        };

    }   

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function () {
            var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            });

            return response;
        };

    }

})();
    