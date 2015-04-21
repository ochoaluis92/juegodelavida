 		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
        //Este Script Fue desarrollado por Luis Ochoa el 21-04-2015  										[ochoaluis92@gmail.com]//
        // Se realizo de la manera mas simple posible para una mejor explicacion y entendimineto (Todo el codigo esta comentado)   //
        // Se agradece el respeto a los derechos de autor, solo deja estas lineas comentadas                                       //
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        alert( "Comienza el Juego de la Vida (HTML,JAVASCRIPT,JQUERY) Creado por Luis Ochoa " );

        var x=15;				// x = longitud
        var y=15;				// y = altura
        var max=1;				// max = max random
        var min =0;				// min = min random
        var bgcolor;			// bgcolor color de fondo para los cuadros
        var repetidor;			// repetidor para el setInterval
       	var img;				// variable que contiene url de la imagen


        //creamos un array y un aux
        var matriz = new Array(x);
        var matrizAux= new Array(x);
        
        //Matriz Final Creada desde crearMatriz()
        var matrizCreada = crearMatriz();

        
        //////////////////////////////////////////////////////////////
        //funcion para crear la matriz que contiene todas las celdas//
        //////////////////////////////////////////////////////////////
        
        function crearMatriz(){

		//volvemos multidimensional el array matriz
		for (var i = 0; i <= y; i++) {
				matriz[i]=new Array(y);
				matrizAux[i]=new Array(y);
		}


		//recorremos celda por celda matriz para ir insertando los valores
		for (var i = 0; i <= x; i++) {		

			for (var j = 0; j <= y; j++) {
				//Insertamos variables random 1 y 0 crear celdas vivas o muertas
				var random=(Math.random() * (max - min + 1) | 0) + min;
				matriz[i][j]=random;
				
			};

		};

		return(matriz);//retornamos matriz

        }

        ////////////////////////////////////////////	
        //funcion que Muestra el juego en la vista//
        ////////////////////////////////////////////
		
		function vistaTablero(){

		$( "#tablero" ).empty();	//vaciamos la etiqueta con id tablero (asi no llenamos de mucho tableros la vista)


		//Armamos el tablero en HTML en el div tablero
		//creamos la tabla y la damos un div para q la proxima etiquita (<tr>) pueda insertarse dentro de ella
		$('#tablero').append(  '<table id=table border=1>' );
			for (var i = 0; i <= x; i++) {
			//creamos los tr con un id tr# para q la proxima etiqueta (<td>) pueda reconocerla y pueda insertarse dentro ella
			$('#table').append(  '<tr id=tr'+i+'>' );
	
				//creamos los td y dependiendo del valor de la celda colocaremos un color de fondo Verde viva Blanca muerta
				for (var j = 0; j <= y; j++) {
					if (matrizCreada[i][j]==0) {bgcolor='#fff'}else{bgcolor='green'};
					$('#tr'+i).append(  '<td width=15px bgcolor='+bgcolor+'>'+matrizCreada[i][j]+'</td>' )
					
					
				};
			$('#table').append(  '</tr>' );

			};
		$('#tablero').append(  '</table>' );
		};
 	
        //////////////////////////////////////////////////////	
        //funcion para borrar el tablero inicial de la vista//
        //////////////////////////////////////////////////////
	 	function borrarTablero(){
			
			$( "#tablero" ).empty();	


	 	}


        ////////////////////////////////////////////////////////////	
        //funcion para Imprimir un mensaje con inf de los vecinos,//
        //sirve de aux para verificar los vecinos (no es usada    //
        //puede ser eliminada)									  //
        ////////////////////////////////////////////////////////////
 		function calculoCelda(){
				
			for (var i = 0; i <= x; i++) {
			    for (var j = 0; j <= y; j++) {
			

			      var contadorCeldasVivas=calculoVecino(i,j);
			      

			      alert('celda enviada para verificacion '+i+','+j+' . Celdas Vivas alrededor'+contadorCeldasVivas);

			   
			    }
			}

 		}



        ////////////////////////////////////////////////////////////
        //funcion PRINCIPAL para rellenar el NuevoTablero 		  //
        //Esta seria como el cerebro, ella recibe los valore de   //
        //posicion del array original (matrizCreada) a comparar   //
        //y con ellos realiza una busqueda a sus alrededores para //
        //saber el nuevo estado que tendra la celda               //
        ////////////////////////////////////////////////////////////	
	 	function calculoVecino(matrizx,matrizy){
		
			var count=0-matrizCreada[matrizx][matrizy] ;			// Lo que hacemos aqui es decirle al contador que reste el valor que tiene 
																	// la matriz en la posicion enviada ya que ella misma no debe contar como
																	// viva o muerta.


			 for (var i = matrizx-1; i <= matrizx+1; i++) {			// Ej: tenemos el la matriz(0,0) para verificar sus alrededores debemos
			    for (var j = matrizy-1; j <= matrizy+1; j++) {		// Conocer los valores de las posiciones matriz(-1,-1),matriz(-1,-0)
			      	if( i>=0 && i<=x && j>=0 && j<=y ){				// matriz(-1,1),matriz(0,-1),matriz(0,0),matriz(0,1)...etc 
																	//(por eso el matrizx-1 y  matrizx+1)
				      	if (matrizCreada[i][j]==1) { 				// En este IF lo que hacemos es ir contado las celdas vivas
				      		 count++;
				      	};
			     	}
			      
			      
			    }
			 }
			return (count);											//retornamos count
	 	}

  
        ////////////////////////////////////////////////////
        //funcion PRINCIAL esta seria como las manos      //
        //Ella recorre el Array principal matrizCreada y  //
        //va reasignando los valores correspondientes a la//
        //misma matriz podriamos usar una matriz Auxiliar //
        //pero solo serviria para volver a un paso atras  //	
        ////////////////////////////////////////////////////


 	 	function nuevoTablero(){
	
		 	for (var i = 0; i <= x; i++) {
		    	for (var j = 0; j <= y; j++) {
		
		      		var contadorCeldasVivas=calculoVecino(i,j);		      

		      		  	//Si el valor de la celda es 1 y hay alrededor 2 o 3 celdas vivas la celda SOBREVIVE
				      if (matrizCreada[i][j]==1 && contadorCeldasVivas==2 || contadorCeldasVivas==3){matrizCreada[i][j]=1 }
				      	//Si la celda esta muerta y tiene 3 celdas vivas alrededor NACE/REVIVE
				      	else if (matrizCreada[i][j]==0 && contadorCeldasVivas==3){matrizCreada[i][j]=1}
				      		//Si no se cumplen ninguna de las condiciones MUERE
				      		else{matrizCreada[i][j]=0}
				}
  			}


		 $( "#tablero2" ).empty();	//vaciamos el div de id tablero2


		//Armamos el tablero en HTML en el div tablero
		//creamos la tabla y la damos un div para q la proxima etiquita (<tr>) pueda insertarse dentro de ella
		$('#tablero2').append(  '<table id=table2 border=1>' );
			for (var i = 0; i <= x; i++) {
			//creamos los tr con un id tr# para q la proxima etiqueta (<td>) pueda reconocerla y pueda insertarse dentro ella
			$('#table2').append(  '<tr id=tr2'+i+'>' );
	
				//creamos los td y dependiendo del valor de la celda colocaremos un color de fondo Verde viva Blanca muerta
				for (var j = 0; j <= y; j++) {
					if (matrizCreada[i][j]==0) {img='<img src=></img>'}else{img='<img src=img/celula.gif></img>'};
					$('#tr2'+i).append(  '<td width=20px height=21px>'+img+'</td>' )
					
					
				};
			$('#table2').append(  '</tr>' );

			};
		$('#tablero2').append(  '</table>' );
		



	 	};

        ///////////////////////////////////////////////////////////////	
        //funcion para Pausar la ejecucion de la funcion nuevoTablero//
        ///////////////////////////////////////////////////////////////
	 	function pararNuevoTablero() {		
	 		
	 		alert('Pausado');
	 		clearTimeout(repetidor); 
    		//
		}
	 	
        ////////////////////////////////////////////////////////////////	
        //funcion para Iniciar la ejecucion de la funcion nuevoTablero//
        ////////////////////////////////////////////////////////////////
	 	function continuarNuevoTablero() {		
	 		
    		repetidor = setInterval(nuevoTablero, 100);//100 es el tiempo milisegundo
    		//
		}
		