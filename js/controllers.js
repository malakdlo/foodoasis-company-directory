var companyControllers = angular.module('companyControllers', ['ngAnimate']);

companyControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.organizations = data;
    console.log("organizations");
    console.log($scope.organizations);
    
  }); // End HTTP Get
  
  $scope.categories = [
  {
    "category": "farming",
    "description": "Description for why they would want to use this data",
    "options": ["Garden Supplier","Garden Space", "Farming Education", "Advocacy", "Research"]
  },
  {
    "category":"foodResource",
    "description": "Description for why they would want to use this data",
    "options": ["For Sale", "Wholesale", "Subscription / CSA", "For Free"]
  }
];
  
  $scope.searchResults = [];
  $scope.searchValues = function(){
    //$scope.searchResults = $scope.searchResults.concat(newArrValues);
    console.log("Posting Search Values");
    console.log($scope.searchResults);
    $scope.searchV = $scope.searchResults.join(", ");
    console.log("Searching For: ");
    console.log($scope.searchV);
    return $scope.searchV;
  }
  $scope.clearValues = function(){
    $scope.searchResults = [];
    $scope.searchV = ""
    console.log("Search Results Array Has Been Reset To: " + $scope.searchResults);
    console.log("Search V Has Been Reset To: " + $scope.searchV);
    return $scope.searchResults, $scope.searchV;
  }
  
  /*Food Resources Model*/
  $scope.foodModel = {
    forSale: false,
    forFree: false,
    subscription: false,
    wholesale: false
  }
  $scope.$watchCollection('foodModel', function(){
    $scope.searchResults = [];
    angular.forEach($scope.foodModel, function(value, key){
      if(value){
        $scope.searchResults.push(key);
      }
    }) // End for Each
  console.log("Updating Food Model Search Results");
  console.log($scope.searchResults);
  }) // End watchCollection 
  $scope.searchFoodResources = function(){
    $scope.foodSearch = $scope.foodResults.join(", ");
    console.log("Food Search");
    console.log($scope.foodSearch);
    return $scope.foodSearch;
  }
  
  
  /*Farming Model*/
  $scope.farmingModel = {
        space: false,
        supply: false,
        education: false,
        advocacy: false,
        research: false
      };
  $scope.$watchCollection('farmingModel', function () {
    $scope.searchResults = [];
    angular.forEach($scope.farmingModel, function (value, key) {
      if (value) {
        $scope.searchResults.push(key);
      }
    }); // End forEAch
    console.log("Updating Farming Model Search Results");
    console.log($scope.searchResults);
  }); // End WatchCollection
  $scope.searchFarmingResources = function(){
    $scope.farmingSearch = $scope.farmingResults.join(", ");
    console.log("Farming Search");
    console.log($scope.farmingSearch);
    return $scope.farmingSearch;
  }
  
  
  /*Legis Model*/
  
}]);

companyControllers.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  $http.get('js/data.json').success(function(data) {
    $scope.organizations = data;
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.organizations.length-1;
    }

    if ($routeParams.itemId < $scope.organizations.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }

  });
}]);
