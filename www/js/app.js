// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// Database instance.
var db;
var versao = 1; // VERSAO / 1 - FREE / - 2 PAGA

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'morphCarousel', 'ionic-datepicker', 'ngCordova', 'diretivas.directives'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {


// Open our new task modal


    // Instantiate database file/connection after ionic platform is ready.
   //if (window.cordova && window.SQLitePlugin) { // because Cordova is platform specific and doesn't work when you run ionic serve
      db = $cordovaSQLite.openDB({ name: 'emulsioncontrol.db' });
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS maquina (id INTEGER PRIMARY KEY AUTOINCREMENT,cdMaquina INTEGER, descricao TEXT, tipomaquina TEXT, vltanque INTEGER)');
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS tipomaquina (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)');
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS oleo (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, dstipo TEXT)');
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS materialprocesso (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, dstipo TEXT)');
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS parametrosprocesso (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, vlconcentracaoMax INTEGER, vlconcentracaoMin INTEGER, vlph INTEGER, idsituacao TEXT, idmaquina INTEGER, idoleo INTEGER )');
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS marcacao (id INTEGER PRIMARY KEY AUTOINCREMENT, dtlancamento TEXT, dtmesano TEXT, idparametroprocesso INTEGER, idoleo INTEGER, qtconcentracao INTEGER, dsobservacao TEXT, usrmedicao TEXT)');      
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS configuracoes (id INTEGER PRIMARY KEY AUTOINCREMENT, idioma TEXT)'); 
    //}
      
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tabs', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tabs.cadastro', {
    url: '/cadastro',
    views: {
        'tab-cadastro': {
        templateUrl: 'templates/tab-cadastro.html',
        controller: 'CadastroCtrl'
      }
    }
  })

  .state('tabs.cadmaquina', {
    url: '/cadmaquina',
    views: {
        'tab-cadastro': {
            templateUrl: 'templates/tab-cadmaquina.html',
			controller: 'CadMaquina'			
        }
    }
  })
  
  .state('tabs.consmaquina', {
    url: '/consmaquina',
    views: {
        'tab-cadastro': {
            templateUrl: 'templates/tab-consmaquina.html',
			controller: 'ConsMaquina'			
        }
    }
  })
  
  .state('tabs.cadtipomaquina', {
    url: '/cadtipomaquina',
    views: {
        'tab-cadastro': {
        templateUrl: 'templates/tab-cadtipomaquina.html',
			controller: 'CadTipoMaquinaCtrl'			
        }
    }
  })
 
  .state('tabs.constipomaquina', {
    url: '/constipomaquina',
    views: {
        'tab-cadastro': {
        templateUrl: 'templates/tab-constipomaquina.html',
			controller: 'ConsTipoMaquinaCtrl'			
        }
    }
  })
  
  .state('tabs.cadoleo', {
    url: '/cadoleo',
    views: {
        'tab-cadastro': {
            templateUrl: 'templates/tab-cadoleo.html',
			controller: 'CadOleo'			
        }
    }
  })
  
  .state('tabs.consoleo', {
    url: '/consoleo',
    views: {
        'tab-cadastro': {
            templateUrl: 'templates/tab-consoleo.html',
			controller: 'ConsOleo'			
        }
    }
  })
  
  .state('tabs.cadprmprocesso', {
    url: '/cadprmprocesso',
    views: {
        'tab-cadastro': {
            templateUrl: 'templates/tab-cadprmprocesso.html',
			controller: 'CadPrmProcesso'			
        }
    }
  })
  
  .state('tabs.consprmprocesso', {
    url: '/consprmprocesso',
    views: {
        'tab-cadastro': {
            templateUrl: 'templates/tab-consprmprocesso.html',
			controller: 'ConsPrmProcesso'			
        }
    }
  })
  
  .state('tabs.cadmatprocesso', {
    url: '/cadmatprocesso',
    views: {
        'tab-cadastro': {
            templateUrl: 'templates/tab-cadmatprocesso.html',
			controller: 'CadMatProcesso'			
        }
    }
  })
  
  .state('tabs.consmatprocesso', {
    url: '/consmatprocesso',
    views: {
        'tab-cadastro': {
            templateUrl: 'templates/tab-consmatprocesso.html',
			controller: 'ConsMatProcesso'			
        }
    }
  })

  .state('tabs.relatorios', {
      url: '/relatorios',
        views: {
            'tab-relatorios': {
                templateUrl: 'templates/tab-relatorios.html',
                controller: 'Relatorios'
            }
        }
    })
    
  .state('tabs.congrafico', {
    url: '/relatorios',
    views: {
        'tab-relatorios': {
        templateUrl: 'templates/grafico.html',
			controller: 'RelCtrl'			
        }
    }
  })  

  .state('tabs.configuracoes', {
      url: '/configuracoes',
      views: {
        'tab-configuracoes': {
          templateUrl: 'templates/tab-configuracoes.html',
          controller: 'Configuracoes'
        }
      }
  })

    .state('tabs.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'CadastroCtrl'
        }
      }
    })
  
  .state('tabs.marcacao', {
    url: '/marcacao',
    views: {
        'tab-marcacao': {
        templateUrl: 'templates/tab-marcacao.html',
        controller: 'MarcacaoCtrl'
      }
    }
  })
  
  
  .state('tabs.contato', {
    url: '/contato',
    views: {
        'tab-contato': {
        templateUrl: 'templates/tab-contato.html',
        controller: 'ContatoCtrl'
      }
    }
  })
  
  .state('tabs.consmarcacao', {
    url: '/consmarcacao',
    views: {
        'tab-marcacao': {
        templateUrl: 'templates/tab-consmarcacao.html',
        controller: 'ConsMarcacaoCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/cadastro');

});
