(function() {
  "use strict";
  angular.module("MenuApp").config(RoutesConfig);
  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "src/templates/home.template.html"
      })
      .state("categoriesList", {
        url: "/categories",
        templateUrl: "src/templates/categoriesList.template.html",
        controller: "CategoriesController as categoriesList",
        resolve: {
          categories: ["MenuDataService", function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state("categoriesList.itemsList", {
        url: "/{categoryShortName}/items",
        templateUrl: "src/templates/itemsList.template.html",
        controller: "ItemsController as itemsList",
        resolve: {
          items: ["$stateParams", "MenuDataService", function($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      });
  }
})();
