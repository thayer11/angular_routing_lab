var app = angular.module('wineApp', ['ngRoute']);

console.log('Angular is working.');

////////////
// ROUTES //
////////////
app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      // template: 'Home!'
      templateUrl: '/templates/wines-index.html',
      controller: 'WinesIndexCtrl'
    })
    .when('/wines/:id', {
        templateUrl: '/templates/wines-show.html',
        controller: 'WinesShowCtrl'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
})
/////////////////
// CONTROLLERS //
/////////////////

app.controller('WinesIndexCtrl',function($scope, $http){
  this.$inject = ["$http"];
    function getAllWine() {
        $http.get('http://daretoexplore.herokuapp.com/wines/')
            .then(function(response) {
                $scope.wines = response.data;
            });
    }
        getAllWine();
});


app.controller('WinesShowCtrl',function($scope, $http, $routeParams) {
  console.log($routeParams.id);
    this.$inject=["$http"];
    function getWine(id) {
        $http.get('http://daretoexplore.herokuapp.com/wines/'+id)
            .then(function(response) {
                $scope.wine = response.data;
            });
    }
    var wineID = $routeParams.id;
    getWine(wineID);
});

