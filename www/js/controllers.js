angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, DeezerService) {
  // Controlleur de la "tab" de recherche
  
  $scope.form = {};
  $scope.form.q = '';

  $scope.results = [];

  $scope.search = function() {
    DeezerService.callAPI($scope.form.q, function(res) {
      $scope.results = res.data;
    });
  };

})
.controller('SearchDetailCtrl', function($scope, $stateParams, DeezerService, MediaService, FavoritesService, $ionicPopup) {
  
  $scope.track = DeezerService.get($stateParams.trackId);

  $scope.playMedia = function(src) {
    MediaService.play(src);
  };

  $scope.addToFavorites = function(track) {
    FavoritesService.add(track);

    $ionicPopup.alert({
      title: 'Succès de l\'opération',
      template: 'Favori ajouté !'
    });
  }

  $scope.$on('$ionicView.beforeLeave', function() {
    console.log('Leaving view ...');
    MediaService.stop();
  });
})

.controller('FavoritesCtrl', function($scope, FavoritesService) {
  
  $scope.favorites = FavoritesService.getAll();

  $scope.removeFromFavorites = function(favTrack) {
    FavoritesService.remove(favTrack);
    // Force le rechargement de la liste des favoris
    $scope.favorites = FavoritesService.getAll();
  }
  
})
.controller('FavoritesDetailCtrl', function($scope, $state, $stateParams, FavoritesService, DeezerService, MediaService) {
  
  $scope.track = FavoritesService.get($stateParams.trackId);

  $scope.playMedia = function(src) {
    MediaService.play(src);
  };

  $scope.removeFromFavorites = function(favTrack) {
    FavoritesService.remove(favTrack);
    // Redirection vers l'état "tab.favorites" après la suppression
    $state.go('tab.favorites');
  }

  $scope.$on('$ionicView.beforeLeave', function() {
    console.log('Leaving view ...');
    MediaService.stop();
  });

})

.controller('ParametersCtrl', function($scope, $ionicActionSheet, $ionicPopup, FavoritesService) {

  $scope.removeAllFavorites = function() {
    var hideSheet = $ionicActionSheet.show({
      titleText: 'Supprimer tous les favoris ?',
      destructiveText: 'Supprimer',
      cancelText: 'Annuler',
      destructiveButtonClicked: function() {
        // Supprimer les favoris
        FavoritesService.removeAll();
        hideSheet();

        // Popup informative
        $ionicPopup.alert({
          title: 'Succès',
          template: 'Favoris supprimés !'
        });
      }
    });
  }

});