angular.module('starter.controllers', [])

.controller('CadTipoMaquinaCtrl', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {
	$rootScope.cadastro = {};
	
	$scope.save = function() {
      	if($rootScope.cadastro.novoTipoMaquina == null || $rootScope.cadastro.novoTipoMaquina == '' ){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'O tipo da m&#225;quina deve ser informado!'
			});			
		}
		else{
			if($rootScope.cadastro.id != undefined){
				var query = "UPDATE tipomaquina SET descricao = (?) WHERE id = (?)";
				$cordovaSQLite.execute(db, query, [$rootScope.cadastro.novoTipoMaquina, $rootScope.cadastro.id])
				.then(
					function(result) {
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Registro alterado com sucesso!'
						});
						alertPopup.then(function(res) {
							$rootScope.cadastro.novoTipoMaquina = '';
						});					
					}, 
					function(error) {				
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Erro ao alterar o registro!'
						});	
					}
				);
			}else{
			var query = "INSERT INTO tipomaquina (descricao) VALUES (?)";
			$cordovaSQLite.execute(db, query, [$rootScope.cadastro.novoTipoMaquina])
				.then(
					function(result) {
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Registro salvo com sucesso!'
						});
						alertPopup.then(function(res) {
							$rootScope.cadastro.novoTipoMaquina = '';
						});					
					}, 
					function(error) {				
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Erro ao salvar registro!'
						});	
					}
				);
			}
		}
	}	
})

.controller('ConsTipoMaquinaCtrl', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {
	
	
	var query = "SELECT id, descricao FROM tipomaquina ORDER BY id";
    $scope.selectedItem = null;
  	var list = [];
	$scope.shouldShowDelete = false;
	$scope.listCanSwipe = true;
	$rootScope.cadastro = {};
  
    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
			if(result.rows.length > 0) {
				for(var i = 0; i < result.rows.length; i++) {
					list.push( {id: result.rows.item(i).id 
							  , descricao: result.rows.item(i).descricao});
				}
				
				$scope.list = list;
		
			} 
			else {
				var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'N&#227;o foi encontrado nenhuma informa&#231;&#227;o!'
				});
				alertPopup.then(function(res) {
					$state.go('tabs.cadtipomaquina');
				});
			}				
	},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    );
	
	
   $scope.onItemDelete = function(item) {
	var query = "DELETE FROM tipomaquina WHERE id = ?";
        $cordovaSQLite.execute(db, query, [item.id])
            .then(
				function(result) {
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Registro exclu&#237;do com sucesso!'
					});		
					alertPopup.then(function(res) {
						$scope.list.splice($scope.list.indexOf(item), 1);
				    });
					
				}, 
				function(error) {				
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Erro ao excluir registro!'
					});	
				}
			);
 	
   };
   
   $scope.edit = function(item) {
    	$rootScope.cadastro.id = item.id;
		$rootScope.cadastro.novoTipoMaquina = item.descricao;
		$state.go('tabs.cadtipomaquina');
	
   };
  
  
})

.controller('CadMaquina', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {
	$rootScope.cadastro = {};
	
    var list = [];
	var idQtdMaq = false;
	var queryQtdMaq = "SELECT * FROM maquina";
	// Execute SELECT statement to load message from database.
	$cordovaSQLite.execute(db, queryQtdMaq).then(
		function(result) {
			if(result.rows.length >= 5) {
				idQtdMaq = true;
			} 
		},
		function(error) {
			console.log("Error on loading: " + error.Error);
		}
	);
	
	if (versao == 1 && idQtdMaq){
		var alertPopup = $ionicPopup.alert({
			title: 'Informa&#231;&#227;o',
			template: 'Nesta vers&#227;o s&#243; &#233; permitido cadastrar 5 m&#225;quinas!'
		});	
	}
	
	var query = "SELECT id, descricao FROM tipomaquina ORDER BY id";
	// Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
			if(result.rows.length > 0) {
				for(var i = 0; i < result.rows.length; i++) {
					list.push( {id: result.rows.item(i).id 
							  , descricao: result.rows.item(i).descricao});
				}
				
				$scope.list = list;
		
			} 
		},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    );
    $scope.listatipomaquina = list;
    
    
	$scope.save = function() 
	{
		var queryQtdMaq = "SELECT * FROM maquina";
		// Execute SELECT statement to load message from database.
		$cordovaSQLite.execute(db, queryQtdMaq).then(
			function(result) {
				if(result.rows.length >= 5) {
					idQtdMaq = true;
				} 
			},
			function(error) {
				console.log("Error on loading: " + error.Error);
			}
		);
		// Se a versão for a free verifica quantas maquinas já estão cadastradas
		if (versao == 1 && idQtdMaq)
		{
			var alertPopup = $ionicPopup.alert({
				title: 'Informa&#231;&#227;o',
				template: 'Nesta vers&#227;o s&#243; &#233; permitido cadastrar 5 m&#225;quinas!'
			});	
		}else
		{
			if($rootScope.cadastro.cdMaquina == null || $rootScope.cadastro.cdMaquina == '' ){
				var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'O c&#243;digo da m&#225;quina deve ser informado!'
				});			
			}
			else 
			{
				if($rootScope.cadastro.descricao == null || $rootScope.cadastro.descricao == ''){
					var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'A descri&#231;&#227;o da m&#225;quina deve ser informada!'
					});			
				}
				else 
				{
					if($rootScope.cadastro.tipomaquina == null || $rootScope.cadastro.tipomaquina == ''){
						var alertPopup = $ionicPopup.alert({
								title: 'Informa&#231;&#227;o',
								template: 'O tipo da m&#225;quina deve ser informado!'
						});			
					}
					else
					{ 
						if($rootScope.cadastro.vltanque == null || $rootScope.cadastro.vltanque == ''){
							var alertPopup = $ionicPopup.alert({
									title: 'Informa&#231;&#227;o',
									template: 'O volume total da m&#225;quina deve ser informado!'
							});			
						}
						else
						{
							if($rootScope.cadastro.id != undefined){
								var query = "UPDATE maquina  "+
											"   SET cdMaquina = (?) "+
											"     , descricao = (?) "+
											"     , tipomaquina = (?) "+
											"     , vltanque = (?) "+
											" WHERE id = (?)";
								$cordovaSQLite.execute(db, query, [ $rootScope.cadastro.cdMaquina
																, $rootScope.cadastro.descricao
																, $rootScope.cadastro.tipomaquina
																, $rootScope.cadastro.vltanque 
																, $rootScope.cadastro.id])
								.then(
									function(result) {
										var alertPopup = $ionicPopup.alert({
											title: 'Informa&#231;&#227;o',
											template: 'Registro alterado com sucesso!'
										});
										alertPopup.then(function(res) {										
												$rootScope.cadastro.cdMaquina = '';
												$rootScope.cadastro.descricao = '';
												$rootScope.cadastro.tipomaquina = '';
												$rootScope.cadastro.vltanque = '';
										});					
									}, 
									function(error) {				
										var alertPopup = $ionicPopup.alert({
											title: 'Informa&#231;&#227;o',
											template: 'Erro ao alterar o registro!'
										});	
									}
								);
							}
							else
							{
								var query = 'INSERT INTO maquina (cdMaquina, descricao, tipomaquina, vltanque ) VALUES (?, ?, ?, ?)';
								console.log($rootScope.cadastro.cdMaquina+','+$rootScope.cadastro.descricao+','+$rootScope.cadastro.tipomaquina+','+$rootScope.cadastro.vltanque);
								$cordovaSQLite.execute(db, query, [ $rootScope.cadastro.cdMaquina
																, $rootScope.cadastro.descricao
																, $rootScope.cadastro.tipomaquina
																, $rootScope.cadastro.vltanque])
									.then(
										function(result) {
											var alertPopup = $ionicPopup.alert({
												title: 'Informa&#231;&#227;o',
												template: 'Registro salvo com sucesso!'
											});		
											alertPopup.then(function(res) {
												$rootScope.cadastro.cdMaquina = '';
												$rootScope.cadastro.descricao = '';
												$rootScope.cadastro.tipomaquina = '';
												$rootScope.cadastro.vltanque = '';
											});
										}, 
										function(error) {			
											var alertPopup = $ionicPopup.alert({
												title: 'Informa&#231;&#227;o',
												template: 'Erro ao salvar registro!'
											});	
										}
									);
							}
						}
					}
				}
			}
		}
	}
})

.controller('ConsMaquina', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {

    // Execute SELECT statement to load message from database.
	// $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS maquina (id INTEGER PRIMARY KEY AUTOINCREMENT,cdMaquina INTEGER, descricao TEXT, tipomaquina TEXT, vltanque INTEGER)');
	//  $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS tipomaquina (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)');
    var query = "SELECT m.id, m.cdMaquina, m.descricao, m.id tipomaquina, tm.descricao dsTipoMaquina, m.vltanque FROM maquina m, tipomaquina tm WHERE m.tipomaquina = tm.id  ORDER BY m.id DESC";
    $scope.selectedItem = null;
  	var list = [];
	$scope.shouldShowDelete = false;
	$scope.listCanSwipe = true;
	$rootScope.cadastro = {};
  
    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
		 if(result.rows.length > 0) {
			for(var i = 0; i < result.rows.length; i++) {
				list.push({ id: result.rows.item(i).id
					      , cdMaquina: result.rows.item(i).cdMaquina
				          , descricao: result.rows.item(i).descricao
						  , dsTipoMaquina  : result.rows.item(i).dsTipoMaquina
				          , tipomaquina: result.rows.item(i).tipomaquina
				          , vltanque: result.rows.item(i).vltanque});
			}
				
			$scope.list = list;
		
		} else {
				var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'N&#227;o foi encontrado nenhuma informa&#231;&#227;o!'
				});
				alertPopup.then(function(res) {
					$state.go('tabs.cadmaquina');
				});
		}
		},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    );            

   
   $scope.onItemDelete = function(item) {
	var query = "DELETE FROM maquina WHERE id = ?";
        $cordovaSQLite.execute(db, query, [item.id])
            .then(
				function(result) {
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Registro exclu&#237;do com sucesso!'
					});		
					alertPopup.then(function(res) {
						$scope.list.splice($scope.list.indexOf(item), 1);
				    });
					
				}, 
				function(error) {				
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Erro ao excluir registro!'
					});	
				}
			);
 	
   };

   $scope.edit = function(item) {
		$rootScope.cadastro.id = item.id;
		$rootScope.cadastro.cdMaquina = item.cdMaquina;
		$rootScope.cadastro.descricao = item.descricao;
		$rootScope.cadastro.tipomaquina = item.tipomaquina;
		$rootScope.cadastro.vltanque = item.vltanque;
		$state.go('tabs.cadmaquina');
   };
})

.controller('CadMatProcesso', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {

	$rootScope.cadastro = {};
	
	$scope.save = function() {
		if($rootScope.cadastro.matProcesso == null || $rootScope.cadastro.matProcesso == '' ){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'A descri&#231;&#227;o do material de processo deve ser informado!'
			});			
		}
		else{
			if($rootScope.cadastro.id != undefined){
				var query = "UPDATE materialprocesso SET descricao = (?) WHERE id = (?)";
				$cordovaSQLite.execute(db, query, [$rootScope.cadastro.matProcesso, $rootScope.cadastro.id])
				.then(
					function(result) {
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Registro alterado com sucesso!'
						});
						alertPopup.then(function(res) {
							$rootScope.cadastro.matProcesso = '';
						});					
					}, 
					function(error) {				
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Erro ao alterar o registro!'
						});	
					}
				);
			}
			else{
		        var query = 'INSERT INTO materialprocesso (descricao) VALUES (?)';
		        $cordovaSQLite.execute(db, query, [$rootScope.cadastro.matProcesso])
		            .then(
						function(result) {
							var alertPopup = $ionicPopup.alert({
								title: 'Informa&#231;&#227;o',
								template: 'Registro salvo com sucesso!'
							});
							alertPopup.then(function(res) {
								$rootScope.cadastro.matProcesso = '';
							});
						}, 
						function(error) {				
							var alertPopup = $ionicPopup.alert({
								title: 'Informa&#231;&#227;o',
								template: 'Erro ao salvar registro!'
							});	
						}
					);
			}
		}
	}
})

.controller('ConsMatProcesso', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {	
	
	$rootScope.cadastro = {};
	
    // Execute SELECT statement to load message from database.
    var query = "SELECT * FROM materialprocesso ORDER BY id DESC";
    $scope.selectedItem = null;
  	var list = [];
  
    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
		 if(result.rows.length > 0) {
			for(var i = 0; i < result.rows.length; i++) {
				list.push({ id: result.rows.item(i).id
					      , descricao: result.rows.item(i).descricao});
			}
				
			$scope.list = list;
		
		} else {
				var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'N&#227;o foi encontrado nenhuma informa&#231;&#227;o!'
				});
				alertPopup.then(function(res) {
					$state.go('tabs.cadmatprocesso');
				});
			}
		},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    ); 
    
    $scope.onItemDelete = function(item) {
		var query = "DELETE FROM materialprocesso WHERE id = ?";
        $cordovaSQLite.execute(db, query, [item.id])
            .then(
				function(result) {
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Registro exclu&#237;do com sucesso!'
					});		
					alertPopup.then(function(res) {
						$scope.list.splice($scope.list.indexOf(item), 1);
				    });
					
				}, 
				function(error) {				
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Erro ao excluir registro!'
					});	
				}
			);
   };

   $scope.edit = function(item) {
		$rootScope.cadastro.id = item.id;
		$rootScope.cadastro.matProcesso = item.descricao;
		$state.go('tabs.cadmatprocesso');
   };

})

.controller('CadOleo', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {
	$rootScope.cadastro = {};
	
	$scope.save = function() {
        if($rootScope.cadastro.descricao == null || $rootScope.cadastro.descricao == ''){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'A descri&#231;&#227;o do &#243;leo deve ser informado!'
			});			
		}
		else if($rootScope.cadastro.dstipo == null || $rootScope.cadastro.dstipo == ''){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'A descri&#231;&#227;o do tipo de &#243;leo deve ser informado!'
			});			
		}
        else{
        		if($rootScope.cadastro.id != undefined){
				var query = "UPDATE oleo SET descricao = (?), dstipo = (?) WHERE id = (?)";
				$cordovaSQLite.execute(db, query, [ $rootScope.cadastro.descricao
												  , $rootScope.cadastro.dstipo
				                                  , $rootScope.cadastro.id])
				.then(
					function(result) {
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Registro alterado com sucesso!'
						});
						alertPopup.then(function(res) {							
							$rootScope.cadastro.descricao = '';
							$rootScope.cadastro.dstipo = '';
						});					
					}, 
					function(error) {				
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Erro ao alterar o registro!'
						});	
					}
				);
			}
			else{
		        var query = 'INSERT INTO oleo (descricao, dstipo ) VALUES (?, ?)';
		        $cordovaSQLite.execute(db, query , [$rootScope.cadastro.descricao, $rootScope.cadastro.dstipo])
		        .then(
		            function(result) {
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Registro salvo com sucesso!'
						});	
						alertPopup.then(function(res) {
							$rootScope.cadastro.descricao = '';
							$rootScope.cadastro.dstipo = '';
						});
					}, 
					function(error) {				
					    var alertPopup = $ionicPopup.alert({
						    title: 'Informa&#231;&#227;o',
							template: 'Erro ao salvar registro!'
						});	
					}
		        );
			}
        }
	}
})

.controller('ConsOleo', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {		
 

    // Execute SELECT statement to load message from database.
    var query = "SELECT * FROM oleo ORDER BY id DESC";
    $scope.selectedItem = null;
  	var list = [];
  	$rootScope.cadastro = {};
  
    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
		 if(result.rows.length > 0) {
			for(var i = 0; i < result.rows.length; i++) {
				list.push({id: result.rows.item(i).id
					      ,descricao: result.rows.item(i).descricao
					      ,dstipo : result.rows.item(i).dstipo});
			}
				
			$scope.list = list;
		
		} else {
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'N&#227;o foi encontrado nenhuma informa&#231;&#227;o!'
			});
			alertPopup.then(function(res) {
				$state.go('tabs.cadoleo');
			});
		}
		},
        function(error) {
        	console.log("Error on loading: " + error.Error);
        }
    ); 
    
    $scope.onItemDelete = function(item) {
		var query = "DELETE FROM oleo WHERE id = ?";
        $cordovaSQLite.execute(db, query, [item.id])
            .then(
				function(result) {
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Registro exclu&#237;do com sucesso!'
					});		
					alertPopup.then(function(res) {
						$scope.list.splice($scope.list.indexOf(item), 1);
				    });
					
				}, 
				function(error) {				
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Erro ao excluir registro!'
					});	
				}
			);
   };

   $scope.edit = function(item) {	   
		$rootScope.cadastro.id = item.id;
		$rootScope.cadastro.descricao = item.descricao;
		$rootScope.cadastro.dstipo = item.dstipo;
		$state.go('tabs.cadoleo');
   };

})

.controller('Configuracoes', function($scope, $cordovaSQLite, $state, $ionicPopup, $timeout) {

	$scope.save = function(idIdioma) {
        var query = 'INSERT INTO configuracoes (idioma) VALUES (?)';
        $cordovaSQLite.execute(db, query , [idIdioma])
        .then(
            function(result) {
				var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'Registro salvo com sucesso!'
				});		
			}, 
			function(error) {				
			    var alertPopup = $ionicPopup.alert({
				    title: 'Informa&#231;&#227;o',
					template: 'Erro ao salvar registro!'
				});	
			}
        );
	}
})

.controller('ContatoCtrl', function($scope, $cordovaSQLite, $state, $ionicPopup, $timeout, $cordovaEmailComposer) {
	if($rootScope.cadastro.email == null || $rootScope.cadastro.email == '' ){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'O e-mail deve ser informado!'
			});			
	}
	else if($rootScope.cadastro.mensagem == null || $rootScope.cadastro.mensagem == '' ){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'A mensagem deve ser informada!'
			});			
	} 
	
	$scope.enviar = function() {
        $cordovaEmailComposer.isAvailable().then(function() {
			// is available
			}, function () {
			// not available
			});

			var email = {
				to: 'emulsioncontrol@gmail.com',
				cc: '',
				bcc: [],
				attachments: [],
				subject: 'Contato - EmulsionControl',
				body: $rootScope.cadastro.mensagem,
				isHtml: true
			};

			$cordovaEmailComposer.open(email).then(null, function () {
			// user cancelled email
			});
	}
})

.controller('MarcacaoCtrl', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {
	
	$rootScope.cadastro = {};
	var list = [];

	// $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS parametrosprocesso (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT,  vlconcentracaoMax INTEGER, vlconcentracaoMin INTEGER, vlph INTEGER, idsituacao TEXT, idmaquina INTEGER, idoleo INTEGER )');
	var query = "SELECT id, descricao FROM parametrosprocesso ORDER BY id";
	// Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
			if(result.rows.length > 0) {
				for(var i = 0; i < result.rows.length; i++) {
					list.push( {id: result.rows.item(i).id
							  , descricao: result.rows.item(i).descricao});
				}

				$scope.list = list;

			}
		},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    );
    $scope.listatipoparametro = list;


	// Execute SELECT statement to load message from database.
    var query = "SELECT id, descricao FROM oleo ORDER BY id DESC";
    $scope.selectedItem = null;
  	var listOleo = [];

    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
			if(result.rows.length > 0) {
				for(var i = 0; i < result.rows.length; i++) {
					listOleo.push({ id: result.rows.item(i).id
						      , descricao: result.rows.item(i).descricao});
				}

				$scope.listOleo = listOleo;
			}
		},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    );

    $scope.listaoleo = listOleo;
    
	
	/*$scope.items = [
	  { number: 1 },
	  { number: 2 },
	  { number: 3 },
	  { number: 4 },
	  { number: 5 },
	  { number: 6 },
	  { number: 7 },
	  { number: 8 },
	  { number: 9 },
	  { number: 10 },
	  { number: 11 },
	  { number: 12 },
	  { number: 13 },
	  { number: 14 },
	  { number: 15 }
	];
	$scope.selectedItem = $scope.items[2];	
	*/
	var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2016'), //Works with any valid Date formats like long format
      new Date("08-14-2016"), //Short format
      new Date(1439676000000) //UNIX format
    ];
	
	var weekDaysList = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
	var monthList = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];	
	
	$scope.datepickerObject = {};
	
	var setData = function(value){
		if(value){
			$scope.datepickerObject.inputDate = moment(value).format('DD/MM/YYYY');
		}
		else{
			$scope.datepickerObject.inputDate = new moment(Date()).format('DD/MM/YYYY');
		}
		$rootScope.cadastro.dtlancamento = $scope.datepickerObject.inputDate;
		$rootScope.cadastro.dtmesano = $scope.datepickerObject.inputDate;
	};
	
	setData();
	
	$scope.datepickerObjectPopUp = {
      titleLabel: 'Calend&#225;rio',  
      todayLabel: 'Hoje',  
      closeLabel: 'Fechar',  
      setLabel: 'Ok',  
      setButtonType : 'button-assertive',  
      todayButtonType : 'button-assertive',
      closeButtonType : 'button-assertive',
	  modalHeaderColor:'bar-positive',
      modalFooterColor:'bar-positive',
	  templateType:'popup',      
      mondayFirst: true,  
      disabledDates: disabledDates, 
      weekDaysList: weekDaysList, 
      monthList: monthList, 
      templateType: 'popup', 
      showTodayButton: 'true',
      from: new Date(2012, 8, 2), 
      to: new Date(2018, 8, 25),  
      callback: function (val) {  
        datePickerCallback(val);
      },
      dateFormat: 'dd-MM-yyyy',
      closeOnSelect: false,
    };	
		
	var datePickerCallback = function (val) {
		if (typeof(val) === 'undefined') {			
			console.log('No date selected');			
		} else {
		    setData(val);			
		}
	};

	var SalvaRegistro = function(){
		if($rootScope.cadastro.id != undefined){
			var query = "UPDATE marcacao SET dtlancamento = (?) " +
										" , idparametroprocesso = (?) " + 
										" , idoleo = (?) " +
										" , qtconcentracao = (?) " +
										" , dsobservacao = (?) " +
										" , usrmedicao  = (?) " +
								" WHERE id = (?)";
			$cordovaSQLite.execute(db, query, [ $rootScope.cadastro.dtlancamento
											, $rootScope.cadastro.tipoprocesso
											, $rootScope.cadastro.oleo
											, $rootScope.cadastro.qtconcentracao
											, $rootScope.cadastro.dsobservacao
											, $rootScope.cadastro.usrmedicao
											, $rootScope.cadastro.id])
			.then(
				function(result) {
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Registro alterado com sucesso!'
					});
					alertPopup.then(function(res) {
						$rootScope.cadastro.tipoparametro = '';
						$rootScope.cadastro.oleo = '';
						$rootScope.cadastro.qtconcentracao = '';
						$rootScope.cadastro.dsobservacao = '';
						$rootScope.cadastro.usrmedicao = '';
					});					
				}, 
				function(error) {				
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Erro ao alterar o registro!'
					});	
				}
			);
		}
		else{
			// $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS marcacao (id INTEGER PRIMARY KEY AUTOINCREMENT, dtlancamento TEXT,
			//                                                                  dtmesano TEXT, idparametroprocesso INTEGER, idoleo INTEGER, qtconcentracao INTEGER, 
			//                                                                  dsobservacao TEXT, usrmedicao TEXT)');
			var query =  'INSERT INTO marcacao (dtlancamento, dtmesano, idparametroprocesso, idoleo, qtconcentracao, dsobservacao, usrmedicao ) VALUES (?,?,?,?,?,?,?)';
			$cordovaSQLite.execute(db, query, [ moment($rootScope.cadastro.dtlancamento).format('L')
												, moment($rootScope.cadastro.dtmesano).format('MM YYYY')
												, $rootScope.cadastro.tipoparametro
												, $rootScope.cadastro.oleo
												, $rootScope.cadastro.qtconcentracao
												, $rootScope.cadastro.dsobservacao
												, $rootScope.cadastro.usrmedicao])
			.then(
				function(result) {
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Registro salvo com sucesso!'
					});		
					alertPopup.then(function(res) {
						$rootScope.cadastro.tipoparametro = '';
						$rootScope.cadastro.oleo = '';
						$rootScope.cadastro.qtconcentracao = '';
						$rootScope.cadastro.dsobservacao = '';
						$rootScope.cadastro.usrmedicao = '';
					});
				}, 
				function(error) {	
					console.log(error);			
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Erro ao salvar registro!'
					});	
				}
			);					
		}
	};
	
	$scope.save = function() {
		
		if($rootScope.cadastro.tipoparametro == null  || $rootScope.cadastro.tipoparametro == ''){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'O par&#226;metro do processo deve ser informado!'
			});			
		}		else if($rootScope.cadastro.oleo == null || $rootScope.cadastro.oleo == ''){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'O &#243;leo deve ser informado!'
			});			
		}
		else if($rootScope.cadastro.dtlancamento == null || $rootScope.cadastro.dtlancamento == ''){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'A data de lan&#231;amento deve ser informada!'
			});			
		} 
		else if($rootScope.cadastro.qtconcentracao == null  || $rootScope.cadastro.qtconcentracao == ''){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'A quantidade de concentra&#231;&#227;o deve ser informada!'
			});			
		}
		else if($rootScope.cadastro.dsobservacao == null || $rootScope.cadastro.dsobservacao == ''){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'A observa&#231;&#227;o deve ser informada!'
			});			
		}
		else if($rootScope.cadastro.usrmedicao == null || $rootScope.cadastro.usrmedicao == ''){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'O usu&#225;rio deve ser informado!'
			});			
		}
	
		// Busca pelo parametro de processo a quantidade minima e maxima
		// tabela parametrosprocesso (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT,
		//                            vlconcentracaoMax INTEGER, vlconcentracaoMin INTEGER, vlph INTEGER
		//                          , idsituacao TEXT, idmaquina INTEGER, idoleo INTEGER )');	    
        var query = "SELECT vlconcentracaoMax, vlconcentracaoMin  FROM parametrosprocesso WHERE id = ?";		
		$cordovaSQLite.execute(db, query, [$rootScope.cadastro.tipoparametro]).then(
          function(result) {
			if(result.rows.length > 0) {
			  for(var i = 0; i < result.rows.length; i++) {
				  if($rootScope.cadastro.qtconcentracao >  result.rows.item(i).vlconcentracaoMax){
					$ionicPopup.show({
						title: 'Informa&#231;&#227;o',
						subTitle: '',
						content: 'Quantidade de concentra&#231;&#227;o é maior que a quantidade m&#225;xima permitida ('+result.rows.item(i).vlconcentracaoMax+'). Deseja continuar?',
						scope: $scope,
						buttons: [{
						text: 'Sim',
						type: 'button-positive',
						onTap: function(e) {
							SalvaRegistro();
						}
						}, {
						text: 'Não',
						type: 'button-positive',
						onTap: function(e) {
						}
						}, ]
					})
					
				  }				  
				  else if($rootScope.cadastro.qtconcentracao < result.rows.item(i).vlconcentracaoMin){						
					$ionicPopup.show({
						title: 'Informa&#231;&#227;o',
						subTitle: '',
						content: 'Quantidade de concentra&#231;&#227;o é menor que a quantidade m&#237;nima permitida ('+result.rows.item(i).vlconcentracaoMin+'). Deseja continuar?',
						scope: $scope,
						buttons: [{
						text: 'Sim',
						type: 'button-positive',
						onTap: function(e) {
							SalvaRegistro();
						}
						}, {
						text: 'Não',
						type: 'button-positive',
						onTap: function(e) {
						}
						}, ]
					})
				  }else{
                      SalvaRegistro();
				  }
			  }
		    } 
		  },
          function(error) {
        	console.log("Error on loading: " + error.Error);
          }
          ); 
    	
		
	}
})

.controller('ConsMarcacaoCtrl', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {	
	
	// $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS marcacao (id INTEGER PRIMARY KEY AUTOINCREMENT, dtlancamento TEXT,
	//                                                                  dtmesano TEXT, idparametroprocesso INTEGER, idoleo INTEGER, qtconcentracao INTEGER, 
	//                                                                  dsobservacao TEXT, usrmedicao TEXT)');
	
	// $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS parametrosprocesso (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT
	//                                                                           , vlconcentracaoMax INTEGER, vlconcentracaoMin INTEGER, vlph INTEGER, idsituacao TEXT, 
	//                                                                             idmaquina INTEGER, idoleo INTEGER )');
	
	//  $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS oleo (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, dstipo TEXT)');
     
	// Execute SELECT statement to load message from database.
    var query = "SELECT m.*  " +
			    "     , pp.descricao dsPrmProcesso" +
				"     , o.descricao dsOleo " +
	            "  FROM marcacao m " +
				"     , parametrosprocesso pp " +
				"     , oleo o " +
				" WHERE m.idparametroprocesso = pp.id "+
				"   AND m.idoleo = o.id" 
	            " ORDER BY m.id DESC";
    $scope.selectedItem = null;
  	var list = [];
  
    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
		 if(result.rows.length > 0) {
	    	for(var i = 0; i < result.rows.length; i++) {
				list.push({ id: result.rows.item(i).id
					      , dtlancamento : result.rows.item(i).dtlancamento
						  , dtmesano :  result.rows.item(i).dtmesano
						  , idparametroprocesso :  result.rows.item(i).idparametroprocesso
						  , dsparametroprocesso : result.rows.item(i).dsPrmProcesso
						  , idoleo :  result.rows.item(i).idoleo
						  , dsoleo : result.rows.item(i).dsOleo
						  , qtconcentracao :  result.rows.item(i).qtconcentracao
						  , dsobservacao :  result.rows.item(i).dsobservacao
						  , usrmedicao :  result.rows.item(i).usrmedicao});
			}
				
			$scope.list = list;
		
		} else {
			console.log("No results found");
		}
		},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    );
	
	    $scope.onItemDelete = function(item) {
		var query = "DELETE FROM marcacao WHERE id = ?";
        $cordovaSQLite.execute(db, query, [item.id])
            .then(
				function(result) {
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Registro exclu&#237;do com sucesso!'
					});		
					alertPopup.then(function(res) {
						$scope.list.splice($scope.list.indexOf(item), 1);
				    });
					
				}, 
				function(error) {				
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Erro ao excluir registro!'
					});	
				}
			);
   };

   $scope.edit = function(item) {	   
		$rootScope.cadastro.id = item.id;
		$rootScope.cadastro.dtlancamento = item.dtlancamento;
		$rootScope.cadastro.tipoprocesso = item.idparametroprocesso;	
		$rootScope.cadastro.oleo = item.idoleo;
		$rootScope.cadastro.qtconcentracao = item.qtconcentracao; 
		$rootScope.cadastro.dsobservacao = item.dsobservacao;
		$rootScope.cadastro.usrmedicao = item.usrmedicao;
		$state.go('tabs.marcacao');
   };
 
	
})

/* Controller responsável pela tela de filtros do relatório */
.controller('Relatorios', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {

	var list = [];

    // $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS parametrosprocesso (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT,  vlconcentracaoMax INTEGER, vlconcentracaoMin INTEGER, vlph INTEGER, idsituacao TEXT, idmaquina INTEGER, idoleo INTEGER )');
    var query = "SELECT id, descricao FROM parametrosprocesso ORDER BY id";
    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
            if(result.rows.length > 0) {
                for(var i = 0; i < result.rows.length; i++) {
                    list.push( {id: result.rows.item(i).id
                        , descricao: result.rows.item(i).descricao});
                }

                $scope.list = list;

            }
        },
        function(error) {
            console.log("Error on loading: " + error.Error);
        }
    );
    $scope.listatipoparametro = list;


    // Execute SELECT statement to load message from database.
    var query = "SELECT id, descricao FROM oleo ORDER BY id DESC";
    $scope.selectedItem = null;
    var listOleo = [];

    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
            if(result.rows.length > 0) {
                for(var i = 0; i < result.rows.length; i++) {
                    listOleo.push({ id: result.rows.item(i).id
                        , descricao: result.rows.item(i).descricao});
                }

                $scope.listOleo = listOleo;
            }
        },
        function(error) {
            console.log("Error on loading: " + error.Error);
        }
    );

    $scope.listaoleo = listOleo;

    $rootScope.cadastro = {};

    var disabledDates = [
        new Date(1437719836326),
        new Date(),
        new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
        new Date('Wednesday, August 12, 2016'), //Works with any valid Date formats like long format
        new Date("08-14-2016"), //Short format
        new Date(1439676000000) //UNIX format
    ];

    var weekDaysList = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    var monthList = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    $scope.datepickerObject = {};
    $scope.datepickerObjectFim = {};

    var setData = function(value){
        if(value){
            $scope.datepickerObject.inputDate = moment(value).format('DD/MM/YYYY');
        }
        else{
            $scope.datepickerObject.inputDate = new moment(Date()).format('DD/MM/YYYY');
        }
        $rootScope.cadastro.dtinicioRel = $scope.datepickerObject.inputDate;
    };

    setData();

    $scope.datepickerObjectPopUp = {
        titleLabel: 'Calend&#225;rio',
        todayLabel: 'Hoje',
        closeLabel: 'Fechar',
        setLabel: 'Ok',
        setButtonType : 'button-assertive',
        todayButtonType : 'button-assertive',
        closeButtonType : 'button-assertive',
        modalHeaderColor:'bar-positive',
        modalFooterColor:'bar-positive',
        templateType:'popup',
        mondayFirst: true,
        disabledDates: disabledDates,
        weekDaysList: weekDaysList,
        monthList: monthList,
        templateType: 'popup',
        showTodayButton: 'true',
        from: new Date(2012, 8, 2),
        to: new Date(2018, 8, 25),
        callback: function (val) {
            datePickerCallback(val);
        },
        dateFormat: 'dd-MM-yyyy',
        closeOnSelect: false,
    };

    var datePickerCallback = function (val) {
        if (typeof(val) === 'undefined') {
            console.log('No date selected');
        } else {
            setData(val);
        }
    };

    var setDataFim = function(value){
        if(value){
            $scope.datepickerObjectFim.inputDate = moment(value).format('DD/MM/YYYY');
        }
        else{
            $scope.datepickerObjectFim.inputDate = new moment(Date()).format('DD/MM/YYYY');
        }
        $rootScope.cadastro.dtfimRel = $scope.datepickerObjectFim.inputDate;
    };

    setDataFim();

    $scope.datepickerObjectPopUpFim = {
        titleLabel: 'Calend&#225;rio',
        todayLabel: 'Hoje',
        closeLabel: 'Fechar',
        setLabel: 'Ok',
        setButtonType : 'button-assertive',
        todayButtonType : 'button-assertive',
        closeButtonType : 'button-assertive',
        modalHeaderColor:'bar-positive',
        modalFooterColor:'bar-positive',
        templateType:'popup',
        mondayFirst: true,
        disabledDates: disabledDates,
        weekDaysList: weekDaysList,
        monthList: monthList,
        templateType: 'popup',
        showTodayButton: 'true',
        from: new Date(2012, 8, 2),
        to: new Date(2018, 8, 25),
        callback: function (val) {
            datePickerCallbackFim(val);
        },
        dateFormat: 'dd-MM-yyyy',
        closeOnSelect: false,
    };

    var datePickerCallbackFim = function (val) {
        if (typeof(val) === 'undefined') {
            console.log('No date selected');
        } else {
            setDataFim(val);
        }
    };

})

/* Controller responsável pela geração do relatório */
.controller('RelCtrl', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {


    // $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS marcacao (id INTEGER PRIMARY KEY AUTOINCREMENT, dtlancamento TEXT, dtmesano TEXT, idparametroprocesso INTEGER
	//                                                                 , idoleo INTEGER, qtconcentracao INTEGER, dsobservacao TEXT, usrmedicao TEXT)'); 
	// Execute SELECT statement to load message from database.
	console.log("INICIO = " +$rootScope.cadastro.dtinicioRel);
	console.log("FIM = " +$rootScope.cadastro.dtfimRel);
    console.log("tipoprocesso = " +$rootScope.cadastro.tipoparametro);
    console.log("oleo = " + $rootScope.cadastro.oleo);
    var parameters = [ $rootScope.cadastro.tipoparametro, $rootScope.cadastro.oleo, $rootScope.cadastro.dtinicioRel,  $rootScope.cadastro.dtfimRel];
    var query = "SELECT * FROM marcacao WHERE idparametroprocesso = (?) AND idoleo = (?) AND dtlancamento >= (?) AND dtlancamento <=(?) ORDER BY id DESC";
  	var list = [];
    $scope.list = [];

    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query, parameters).then(
        function(result) {
		 if(result.rows.length > 0) {
			console.log("entrou no if");
			for(var i = 0; i < result.rows.length; i++) {
				list.push({ id: result.rows.item(i).id
					      , dtlancamento: result.rows.item(i).dtlancamento
						  , dtmesano : result.rows.item(i).dtmesano
						  , idparametroprocesso : result.rows.item(i).idparametroprocesso
						  , idoleo : result.rows.item(i).idoleo
						  , qtconcentracao : result.rows.item(i).qtconcentracao
						  , dsobservacao : result.rows.item(i).dsobservacao
						  , usrmedicao : result.rows.item(i).usrmedicao});
			}
				
			$scope.list = list;

         } },
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    );
    $scope.listMaxConcentracao = [];

    var listMaxConcentracao = [];
    var parametersMaxConcentracao = [ $rootScope.cadastro.tipoparametro, $rootScope.cadastro.oleo];
    var queryMaxConcentracao = "SELECT max(vlconcentracaoMax) max FROM parametrosprocesso WHERE id = (?) AND idoleo = (?)";

    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, queryMaxConcentracao, parametersMaxConcentracao).then(
        function(result) {
            if(result.rows.length > 0) {
                for(var i = 0; i < result.rows.length; i++) {
                    listMaxConcentracao.push( {id: result.rows.item(i).max});
                }
                $scope.listMaxConcentracao = listMaxConcentracao;
            }
        },
        function(error) {
            console.log("Error ao buscar max concentracao: " + error.Error);
        }
    );

    $scope.listMinConcentracao = [];

    var listMinConcentracao = [];
    var parametersMinConcentracao = [ $rootScope.cadastro.tipoparametro, $rootScope.cadastro.oleo];
    var queryMinConcentracao = "SELECT min(vlconcentracaoMin) min FROM parametrosprocesso WHERE id = (?) AND idoleo = (?)";

    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, queryMinConcentracao, parametersMinConcentracao).then(
        function(result) {
            if(result.rows.length > 0) {
                for(var i = 0; i < result.rows.length; i++) {
                    listMinConcentracao.push( {id: result.rows.item(i).min});
                }
                $scope.listMinConcentracao = listMinConcentracao;
            }
        },
        function(error) {
            console.log("Error ao buscar min concentracao: " + error.Error);
        }
    );

    $rootScope.cadastro = {};

    $scope.chartOptions = {
        exporting: {
            chartOptions: { // specific options for the exported image
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                }
            },
            scale: 3,
            fallbackToExportServer: false
        },
        title: {
            text: 'Registro de Marcação',
            x: -20 //center
        },
        subtitle: {
            text: 'Emulsion Control',
            x: -20
        },
        xAxis: {
            title: {
                text: 'Data'
            },
            categories: [1,2,3,4,5,6]//[$scope.list[0].dtlancamento]
        },
        yAxis: {
            title: {
                text: 'Marcação'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [
            {
                name: 'Máximo',
                data: [$scope.listMaxConcentracao]
            }
            , {
                name: 'Registrado',
                data: [3,5,6,4,8]//[$scope.list[0].qtconcentracao]
            }
            , {
                name: 'Mínimo',
                data: [2,2,2,2,2,2,2]//[$scope.listMinConcentracao[0].id]
            }
        ]
    };

})

.controller('CadPrmProcesso', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {
	$rootScope.cadastro = {};
	
	// Execute SELECT statement to load message from database.
    var query = "SELECT id, descricao FROM maquina ORDER BY id DESC";
    $scope.selectedItem = null;
  	var list = []; 
	
	// maquina (id INTEGER PRIMARY KEY AUTOINCREMENT,cdMaquina INTEGER, descricao TEXT, tipomaquina TEXT, vltanque INTEGER)');
    // oleo (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, dstipo TEXT)');
	// parametrosprocesso (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, vlconcentracaoMax INTEGER, vlconcentracaoMin INTEGER, vlph INTEGER, idsituacao TEXT, idmaquina INTEGER, idoleo INTEGER
    
	// Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
			if(result.rows.length > 0) {
				for(var i = 0; i < result.rows.length; i++) {
					list.push({ id: result.rows.item(i).id
						      , descricao: result.rows.item(i).descricao});
				}	
				
				$scope.list = list;
			} 
		},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    ); 
    
    $scope.listamaquina = list;    
    
	// Execute SELECT statement to load message from database.
    var query = "SELECT id, descricao FROM oleo ORDER BY id DESC";
    $scope.selectedItem = null;
  	var listOleo = [];
  
    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
			if(result.rows.length > 0) {
				for(var i = 0; i < result.rows.length; i++) {
					listOleo.push({ id: result.rows.item(i).id
						      , descricao: result.rows.item(i).descricao});
				}	
				
				$scope.listOleo = listOleo;
			} 
		},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    ); 
    
    $scope.listaoleo = listOleo;
    
	
	$scope.save = function() {
		if($rootScope.cadastro.maquina == null || $rootScope.cadastro.maquina == '' ){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'A máquina deve ser informada!'
			});			
		}
		else if($rootScope.cadastro.descricao == null || $rootScope.cadastro.descricao == '' ){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'A descri&#231;&#227;o deve ser informada!'
			});
		}
		else if($rootScope.cadastro.oleo == null || $rootScope.cadastro.oleo == '' ){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'O óleo deve ser informado!'
			});
		}
		else if($rootScope.cadastro.vlConcentracaoMax == null || $rootScope.cadastro.vlConcentracaoMax == '' ){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'O valor de concentração máximo deve ser informado!'
			});
		}
		else if($rootScope.cadastro.vlConcentracaoMin == null || $rootScope.cadastro.vlConcentracaoMin == '' ){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'O valor de concentração minímo deve ser informado!'
			});
		}
		else if($rootScope.cadastro.vlPh == null  || $rootScope.cadastro.vlPh == ''){
			var alertPopup = $ionicPopup.alert({
					title: 'Informa&#231;&#227;o',
					template: 'O valor de ph deve ser informado!'
			});
		}
		else{
			if($rootScope.cadastro.id != undefined){
				var query = "UPDATE parametrosprocesso  "+
				            "   SET vlconcentracaoMax = (?) "+
				            "     , vlconcentracaoMin = (?) "+ 
							"     , descricao = (?) "+ 
				            "     , vlph = (?) "+ 
				            "     , idsituacao = (?) "+ 
				            "     , idmaquina = (?) "+ 
				            "     , idoleo  = (?) "+
				            "WHERE id = (?)";
				
				$cordovaSQLite.execute(db, query, [ $rootScope.cadastro.vlConcentracaoMax
				                                  , $rootScope.cadastro.vlConcentracaoMin
												  , $rootScope.cadastro.descricao
				                                  , $rootScope.cadastro.vlPh
				                                  , $rootScope.cadastro.idsituacao
				                                  , $rootScope.cadastro.maquina
				                                  , $rootScope.cadastro.oleo
				                                  , $rootScope.cadastro.id])
				.then(
					function(result) {
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Registro alterado com sucesso!'
						});
						alertPopup.then(function(res) {
							$rootScope.cadastro.vlConcentracaoMax= '';
				            $rootScope.cadastro.vlConcentracaoMin= '';
							$rootScope.cadastro.descricao= '';
				            $rootScope.cadastro.vlPh= '';
				            $rootScope.cadastro.idsituacao= '';
				            $rootScope.cadastro.maquina= '';
				            $rootScope.cadastro.oleo = '';
						});					
					}, 
					function(error) {				
						var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'Erro ao alterar o registro!'
						});	
					}
				);
			}
			else{
		        if ($rootScope.cadastro.vlConcentracaoMax < $rootScope.cadastro.vlConcentracaoMin) {
					var alertPopup = $ionicPopup.alert({
							title: 'Informa&#231;&#227;o',
							template: 'O valor máximo não pode ser menor que o valor mínimo!'
						});	
				}else{ 
				 	if ($rootScope.cadastro.vlConcentracaoMin > $rootScope.cadastro.vlConcentracaoMax) {
						var alertPopup = $ionicPopup.alert({
								title: 'Informa&#231;&#227;o',
								template: 'O valor mínimo não pode ser maior que o valor máximo!'
							});	
					}else{
						var query = 'INSERT INTO parametrosprocesso (descricao, vlconcentracaoMax, vlconcentracaoMin, vlph, idsituacao, idmaquina, idoleo) VALUES (?,?,?,?,?,?,?)';
						$cordovaSQLite.execute(db, query, [ $rootScope.cadastro.descricao
												  , $rootScope.cadastro.vlConcentracaoMax
				                                  , $rootScope.cadastro.vlConcentracaoMin
				                                  , $rootScope.cadastro.vlPh
				                                  , $rootScope.cadastro.idsituacao
				                                  , $rootScope.cadastro.maquina
				                                  , $rootScope.cadastro.oleo])
		            .then(
						function(result) {
							var alertPopup = $ionicPopup.alert({
								title: 'Informa&#231;&#227;o',
								template: 'Registro salvo com sucesso!'
							});
							alertPopup.then(function(res) {
								$rootScope.cadastro.vlConcentracaoMax = '';
				                $rootScope.cadastro.vlConcentracaoMin = '';
								$rootScope.cadastro.descricao = '';
				                $rootScope.cadastro.vlPh = '';
				                $rootScope.cadastro.idsituacao = '';
				                $rootScope.cadastro.maquina = '';
				            	$rootScope.cadastro.oleo = '';
							});
						}, 
						function(error) {				
							var alertPopup = $ionicPopup.alert({
								title: 'Informa&#231;&#227;o',
								template: 'Erro ao salvar registro!'
							});	
						}
					);
					}
				}
			}
		}
	}
})

.controller('ConsPrmProcesso', function($scope, $rootScope, $cordovaSQLite, $state, $ionicPopup, $timeout) {	
	
    // $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS parametrosprocesso (id INTEGER PRIMARY KEY AUTOINCREMENT, 
	// vlconcentracaoMax INTEGER, vlconcentracaoMin INTEGER, vlph INTEGER, idsituacao TEXT, idmaquina INTEGER, idoleo INTEGER )');
	
	// $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS maquina (id INTEGER PRIMARY KEY AUTOINCREMENT,cdMaquina INTEGER, descricao TEXT, tipomaquina TEXT, vltanque INTEGER)');
	// $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS oleo (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, dstipo TEXT)');
	var query = "SELECT pp.id " +
			     "     , pp.descricao, pp.vlConcentracaoMax, pp.vlConcentracaoMin, pp.vlPh " +
				 "     , pp.idsituacao, m.descricao dsMaquina, o.descricao dsOleo " +
	             "     , m.id idMaquina, o.id idOleo" +
	 			 " FROM parametrosprocesso pp, maquina m, oleo o " + 
				 " WHERE pp.idmaquina = m.id AND pp.idoleo = o.id ORDER BY pp.id";
    $scope.selectedItem = null;
  	var list = [];
	$scope.shouldShowDelete = false;
	$scope.listCanSwipe = true;
	$rootScope.cadastro = {};
  
    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, query).then(
        function(result) {
			if(result.rows.length > 0) {
				for(var i = 0; i < result.rows.length; i++) {
					list.push( { id: result.rows.item(i).id 
							   , descricao :  result.rows.item(i).descricao
							   , vlConcentracaoMax:  result.rows.item(i).vlconcentracaoMax
							   , vlConcentracaoMin: result.rows.item(i).vlconcentracaoMin
							   , vlPh: result.rows.item(i).vlph
							   , idsituacao: result.rows.item(i).idsituacao
							   , idmaquina : result.rows.item(i).idMaquina
							   , maquina: result.rows.item(i).dsMaquina
							   , oleo: result.rows.item(i).dsOleo
						       , idoleo : result.rows.item(i).idOleo});
				}
				
				$scope.list = list;
		
			} 
			else {
				var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'N&#227;o foi encontrado nenhuma informa&#231;&#227;o!'
				});
				alertPopup.then(function(res) {
					$state.go('tabs.cadprmprocesso');
				});
			}				
		},
        function(error) {
         console.log("Error on loading: " + error.Error);
        }
    );	
	
   $scope.onItemDelete = function(item) {
	var query = "DELETE FROM parametrosprocesso WHERE id = ?";
        $cordovaSQLite.execute(db, query, [item.id])
            .then(
				function(result) {
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Registro exclu&#237;do com sucesso!'
					});		
					alertPopup.then(function(res) {
						$scope.list.splice($scope.list.indexOf(item), 1);
				    });
					
				}, 
				function(error) {				
					var alertPopup = $ionicPopup.alert({
						title: 'Informa&#231;&#227;o',
						template: 'Erro ao excluir registro!'
					});	
				}
			); 	
   };
   
   $scope.edit = function(item) {
	   $rootScope.cadastro.vlConcentracaoMax = item.vlConcentracaoMax;
	   $rootScope.cadastro.vlConcentracaoMin = item.vlConcentracaoMin;
	   $rootScope.cadastro.descricao = item.descricao;
	   $rootScope.cadastro.vlPh = item.vlPh;
	   $rootScope.cadastro.idsituacao = item.idsituacao;
	   $rootScope.cadastro.maquina = item.idmaquina;
	   $rootScope.cadastro.oleo = item.idoleo;
       $rootScope.cadastro.id = item.id;
	   $state.go('tabs.cadprmprocesso');
   };  
	
})


.controller('CadastroCtrl', function($scope) {

	

});