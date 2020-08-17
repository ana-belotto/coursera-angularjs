(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ShoppingListAddController.$inject = ['ShoppingListCheckOffService'];
function ShoppingListAddController(ShoppingListCheckOffService) {
  var itemAdder = this;

  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";

  itemAdder.addItem = function () {
    ShoppingListCheckOffService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  }
}


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItems();

  showList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items2 = ShoppingListCheckOffService.getItems2();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [{name: "cookies", quantity: 10}, {name: "avocado", quantity: 2}, {name: "peanut", quantity: 5}, {name: "coke", quantity: 6}, {name: "lemon", quantity: 1}, ];
  var items2 = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items2.push(items[itemIndex]);
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getItems2 = function () {
    return items2;
  };
}

})();
