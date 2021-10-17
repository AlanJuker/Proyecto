const indexedDB = window.indexedDB;
var sumaTotal = 0;

function iniciar(){
    var botones = document.querySelectorAll('.btnPrecio');
    for(var i=0; i<botones.length; i++){
        botones[i].addEventListener('click', crearDatos);
    }
}

    var db;
    const request = indexedDB.open('Productos',1);
    
    request.onsuccess = (e) =>{
        db = request.result;
        console.log('OPEN', db);
        isEmpty();
        readData();
    };

    function isEmpty(){
        const transaction = db.transaction(['Productos'],'readwrite');
        const objectStore = transaction.objectStore('Productos');
        const request = objectStore.count();

        request.onsuccess = function() {
            var mensaje = document.getElementById('mensaje');
            if(request.result == 0){
                mensaje.style.display = 'block';
                mensaje.textContent = "No tiene productos en su carrito de compras, agregue elementos desde la sección 'Productos'";
            }else{
                mensaje.style.display = 'none';
            }          
        }
    }

    request.onerror = () =>{
        db = request.result;
        console.log('Error', error);
    }

    const readData  = () => {
        const transaction = db.transaction(['Productos'],'readonly');
        const objectStore = transaction.objectStore('Productos');
        const request = objectStore.openCursor();
        const fragment = document.createDocumentFragment();
        request.onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor){
                getData(cursor.key);
                cursor.continue();
            }else{
            }
        }
        
    }

    
    const getData = (key) => {
        const transaction = db.transaction(['Productos'],'readwrite');
        const objectStore = transaction.objectStore('Productos');
        const request = objectStore.get(key);
        request.onsuccess = () => {
            var totalHTML = document.getElementById('total');
            var tabla = document.getElementById('tabla');
            var element = document.createElement('tr');
            element.innerHTML += '<td>'+request.result['imagen']+'</td>';
            element.innerHTML += '<td>'+request.result['titulo']+'</td>';
            element.innerHTML += '<td><input class="cantidades" type="number" min="1" value="'+request.result['cantidad']+'"/></td>';
            element.innerHTML += '<td>'+request.result['precio']+'</td>';

            var aux = request.result['precio'];
            aux= aux.replace('$','');
            total = parseFloat(aux);
            sumaTotal += total*request.result['cantidad'] ;

            totalHTML.textContent = "$"+sumaTotal;
            tabla.appendChild(element);
            cantidades();
        }
    }

    function totalPagar(){
        var sum = 0;
        var tabla = document.getElementById('tabla');
        var filas = tabla.querySelectorAll('tr');
        for(var i=2; i<filas.length; i++){
            var nombres = filas[i].querySelectorAll('td');
            
            var aux = nombres[3].innerHTML;
            aux= aux.replace('$','');
            var total = parseFloat(aux);
            var cantidad = nombres[2].querySelector('input').value;
            cantidad = parseFloat(cantidad);
            sum+= cantidad*total;
        }
        var totalHTML = document.getElementById('total');
        totalHTML.textContent = "$"+sum;

        
    }

    function cantidades(){
        var cantidades = document.querySelectorAll('.cantidades');
        for(var i=0; i<cantidades.length; i++){
            
            var product = cantidades[i].parentNode.parentNode;
            var nombres = product.querySelectorAll('td');
            var input = nombres[2].querySelector('input');

            input.addEventListener('change',actualizarDatos);
        }
    }

    function actualizarDatos(evento){
        var nombres = evento.path[2].querySelectorAll('td');
        
            var datos = {
                titulo: nombres[1].innerHTML,
                precio: nombres[3].innerHTML,
                imagen: nombres[0].innerHTML,
                cantidad: nombres[2].querySelector('input').value
            }
            actualizarCantidad(datos);
            totalPagar()
    }

    function actualizarCantidad(data){
        const transaction = db.transaction(['Productos'],'readwrite');
        const objectStore = transaction.objectStore('Productos');
        const request = objectStore.openCursor();

        request.onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor){
                if(data['titulo']==cursor.key){
                    cursor.update(data);
                }
                cursor.continue();
            }
        }
    }

window.addEventListener('load',iniciar);