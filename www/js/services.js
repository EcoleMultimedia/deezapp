angular.module('starter.services', [])

.factory('DeezerService', function($http, $ionicLoading, $ionicPopup) {

  var searchResults = [];

  return {
    callAPI: function getSongs(q, cb) {

      // Vérification Réseau ...
      if (navigator && navigator.connection && navigator.connection.type === 'none') {

        $ionicPopup.alert({
          title: 'Recherche impossible',
          template: 'Vous ne semblez pas être connecté à Internet.'
        });

        return;
      }

      $ionicLoading.show({ template: 'Recherche...' });

      var url = 'http://api.deezer.com/search?callback=JSON_CALLBACK&output=jsonp&q=' + q;

      $http
        .jsonp(url)
        .success(function(res) {
          $ionicLoading.hide();

          searchResults = res.data;
          cb(res);
        });
    },
    get: function(trackId) {
      trackId = Number(trackId);

      for (var i = 0, len = searchResults.length; i < len; ++i) {
        if (searchResults[i].id === trackId) {
          return searchResults[i];
        }
      }

      return null;
    }
  };

})

.factory('MediaService', function($ionicLoading, $ionicPopup) {

  var context;
  var source;
  var cordovaMediaObj;

  function webAudioPlay(src) {
    try {
      // still needed for Safari
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      // create an AudioContext
      context = new AudioContext();
    } catch(e) {
      // API not supported
      console.error('Web Audio API not supported.');
    }
 
    var request = new XMLHttpRequest();
    request.open('GET', src, true);
    request.responseType = 'arraybuffer';
 
    request.onload = function() {
      $ionicLoading.hide();
      // request.response is encoded... so decode it now
      context.decodeAudioData(request.response, function(buffer) {
        source = context.createBufferSource(); // creates a sound source
        source.buffer = buffer;                    // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);                           // play the source now
                                                   // note: on older systems, may have to use deprecated noteOn(time);
      }, function(err) {
        throw new Error(err);
      });
    };
 
    request.send();
  }

  return {
    play: function(src) {

      // Vérification Réseau ...
      if (navigator && navigator.connection && navigator.connection.type === 'none') {

        $ionicPopup.alert({
          title: 'Recherche impossible',
          template: 'Vous ne semblez pas être connecté à Internet.'
        });

        return;
      }

      $ionicLoading.show({ template: 'Chargement ...' });

      try {
        // On teste le lancement de l'audio avec le plugin cordova Media
        cordovaMediaObj = new Media(src, function() {
          $ionicLoading.hide();
        });
        cordovaMediaObj.play();
      }
      catch (e) {
        // Erreur! Fallback vers la WebAudio API
        webAudioPlay(src);
      }
    },

    stop: function() {
      if (source) {
        source.stop();
      }
      if (cordovaMediaObj) {
        cordovaMediaObj.stop();
      }
    }
  };

})

.factory('FavoritesService', function() {

  var favorites;

  return {
    getAll : function() {
      favorites = localStorage.getItem('deezapp.favorites');

      return (favorites) ? JSON.parse(favorites) : [];
    },
    get    : function(trackId) {
      favorites = this.getAll();

      trackId = Number(trackId);

      for (var i = 0, len = favorites.length; i < len; ++i) {
        if (favorites[i].id === trackId) {
          return favorites[i];
        }
      }

      return null;
    },
    add    : function(track) {
      // Pour éviter les doublons
      this.remove(track);

      favorites = this.getAll();

      favorites.push(track);

      // ... sauvegarde en localStorage
      localStorage.setItem('deezapp.favorites', JSON.stringify(favorites));
    },
    remove : function(track) {
      favorites = this.getAll();

      for (var i = 0, len = favorites.length; i < len; ++i) {
        if (favorites[i].id === track.id) {
          favorites.splice(i, 1);
          break;
        }
      }

      // ... sauvegarde en localStorage
      localStorage.setItem('deezapp.favorites', JSON.stringify(favorites));
    },
    removeAll: function() {
      localStorage.removeItem('deezapp.favorites');
      favorites = [];
    }
  }

});