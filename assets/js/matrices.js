var isCreated = false;

        function listeners(){
            const selectElement = document.getElementById('num1');

            selectElement.addEventListener('change', (event) => {
                var num3 = document.getElementById('num3');
                var num1 = document.getElementById('num1');
                num3.value = num1.value;
            });

            const selectElement1 = document.getElementById('num2');

            selectElement1.addEventListener('change', (event) => {
                var num4 = document.getElementById('num4');
                var num2 = document.getElementById('num2');
                num4.value = num2.value;
            });
        }

        function crearMatriz1(){
            var filas = document.getElementById('num1');
            var columnas = document.getElementById('num2');
            var filas1 = document.getElementById('num3');
            var columnas1 = document.getElementById('num4');
            var id = 1;

            if(isCreated){
                alert('Recarga la página para generar una nueva matriz');
            }else if(columnas.value<=0 || filas.value<=0){
                alert('Ingresa un número válido de filas y columnas');
            }else{
                const matriz1 = document.getElementById('matriz1');
                const matriz2 = document.getElementById('matriz2');


                var contenedor2 = document.getElementById('contenedor2');
                contenedor2.setAttribute('class','contenedor');

                for(var j=0; j<filas.value; j++){
                    var span = document.createElement('span');
                    for(var i=0; i<columnas.value; i++){
                        var input = document.createElement('input'); 
                        input.setAttribute('type','number');
                        input.setAttribute('id','valor'+id);
                        id++;
                        span.appendChild(input);
                    }
                    matriz1.appendChild(span); 
                }

                id=1;
                for(var j=0; j<filas1.value; j++){
                    var span = document.createElement('span');
                    for(var i=0; i<columnas1.value; i++){
                        var input = document.createElement('input'); 
                        input.setAttribute('type','number');
                        input.setAttribute('id','val'+id);
                        id++;
                        span.appendChild(input);
                    }
                    matriz2.appendChild(span); 
                }

                matriz1.appendChild(document.createElement('br'));

                var sumar = document.createElement('button');
                var restar = document.createElement('button');
                var multiplicar = document.createElement('button');
                sumar.setAttribute('onClick', 'sumarMatrices()');
                sumar.textContent = "Sumar";

                restar.textContent = "Restar";
                restar.setAttribute('onClick', 'restarMatrices()');

                multiplicar.setAttribute('onClick','multiplicarMatrices()');
                multiplicar.textContent = "Multiplicar";

                matriz1.appendChild(sumar);
                matriz1.appendChild(restar);
                matriz1.appendChild(multiplicar);
                isCreated = true;
            }
        }


        function sumarMatrices(){
            var matriz1 = [];
            var matriz2 = [];
            const matrizResultado = document.getElementById('resultado');
            


            var filas = document.getElementById('num1');
            var columnas = document.getElementById('num2');
            var filas1 = document.getElementById('num3');
            var columnas1 = document.getElementById('num4');
            var id = 1;

            if(filas.value!=filas1.value || columnas.value!=columnas1.value){
                alert('La cantidad de filas y columnas es diferente');
            } else{
                var titulo = document.createElement('h3');
                titulo.textContent = "Suma Resultado";
                matrizResultado.appendChild(titulo);

                const contenedor3 = document.getElementById('contenedor3');
                contenedor3.setAttribute('class','contenedor');

                for(var j=0; j<filas.value; j++){
                    var fila = [];
                    for(var i=0; i<columnas.value; i++){
                        fila.push(document.getElementById('valor'+id).value);
                        id++;
                    }
                    matriz1.push(fila);
                }  

                id=1;
                for(var j=0; j<filas1.value; j++){
                    var fila = [];
                    for(var i=0; i<columnas1.value; i++){
                        fila.push(document.getElementById('val'+id).value);
                        id++;
                    }
                    matriz2.push(fila);
                }  

                for(var j=0; j<filas.value; j++){
                    var span = document.createElement('span');
                    for(var i=0; i<columnas.value; i++){
                        var input = document.createElement('input'); 
                        input.setAttribute('type','text');
                        input.setAttribute('readonly','');

                        input.value = parseInt(matriz1[j][i])+parseInt(matriz2[j][i]);
                        id++;
                        span.appendChild(input);
                    }
                    matrizResultado.appendChild(span); 
                }  
            }

            
        }

        function restarMatrices(){
            var matriz1 = [];
            var matriz2 = [];
            const matrizResultado = document.getElementById('restaResultado');
            
            var filas = document.getElementById('num1');
            var columnas = document.getElementById('num2');
            var filas1 = document.getElementById('num3');
            var columnas1 = document.getElementById('num4');
            var id = 1;


            if(filas.value!=filas1.value || columnas.value!=columnas1.value){
                alert('La cantidad de filas y columnas es diferente');
            }else{
                var titulo = document.createElement('h3');
                titulo.textContent = "Resta Resultado";
                matrizResultado.appendChild(titulo);

                const contenedor3 = document.getElementById('contenedor3');
                contenedor3.setAttribute('class','contenedor');

                for(var j=0; j<filas.value; j++){
                    var fila = [];
                    for(var i=0; i<columnas.value; i++){
                        fila.push(document.getElementById('valor'+id).value);
                        id++;
                    }
                    matriz1.push(fila);
                }  

                id=1;
                for(var j=0; j<filas1.value; j++){
                    var fila = [];
                    for(var i=0; i<columnas1.value; i++){
                        fila.push(document.getElementById('val'+id).value);
                        id++;
                    }
                    matriz2.push(fila);
                }  

                for(var j=0; j<filas.value; j++){
                    var span = document.createElement('span');
                    for(var i=0; i<columnas.value; i++){
                        var input = document.createElement('input'); 
                        input.setAttribute('type','text');
                        input.setAttribute('readonly','');

                        input.value = parseInt(matriz1[j][i])-parseInt(matriz2[j][i]);
                        id++;
                        span.appendChild(input);
                    }
                    matrizResultado.appendChild(span); 
                }  
            }
        }

        function multiplicarMatrices(){
            var filas = document.getElementById('num1');
            var columnas = document.getElementById('num2');
            var filas2 = document.getElementById('num3');
            var columnas2 = document.getElementById('num4');
            var multiResultado = document.getElementById('resultado');

            if(columnas.value!=filas2.value){
                alert('La cantidad de filas de la Matriz1 debe ser igual a la cantidad de columnas de la Matriz2');
            }else{
                var titulo = document.createElement('h3');
                titulo.textContent = "Multi Resultado";
                multiResultado.appendChild(titulo);

                const contenedor3 = document.getElementById('contenedor3');
                    contenedor3.setAttribute('class','contenedor');

                var respuestaMatriz = [];

                var matriz1 = [];
                var matriz2 = [];

                var id=1;
                for(var j=0; j<filas.value; j++){
                    var fila = [];
                    for(var i=0; i<columnas.value; i++){
                        fila.push(document.getElementById('valor'+id).value);
                        id++;
                    }
                    matriz1.push(fila);
                }  

                id=1;
                for(var j=0; j<filas2.value; j++){
                    var fila = [];
                    for(var i=0; i<columnas2.value; i++){
                        fila.push(document.getElementById('val'+id).value);
                        id++;
                    }
                    matriz2.push(fila);
                } 

                for(var i=0; i<filas.value; i++){
                    var fila = [];
                    for(var j=0; j<columnas2.value; j++){
                        var aux = 0 ;
                        fila.push(aux);
                    }
                    respuestaMatriz.push(fila);
                }

                for(var i=0; i< filas.value;i++){
                    var span = document.createElement('span');
                    for(var j=0; j< columnas2.value; j++){
                        respuestaMatriz[i][j]= 0;
                        for(var k=0; k<columnas.value; k++){
                            respuestaMatriz[i][j]+=matriz1[i][k]*matriz2[k][j];
                        }
                        var input = document.createElement('input'); 
                        input.setAttribute('type','text');
                        input.setAttribute('readonly','');
                        input.value = respuestaMatriz[i][j];
                        span.appendChild(input);
                    }
                    multiResultado.appendChild(span); 
                }
            }

           
        }
        window.addEventListener('load', listeners);