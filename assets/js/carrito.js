const indexedDB = window.indexedDB;

function iniciar(){
    var botones = document.querySelectorAll('.btnPrecio');
    for(var i=0; i<botones.length; i++){
        botones[i].addEventListener('click', crearDatos);
    }
    readData();
}
 
function crearDatos(evento){
    var datos = {
        titulo: evento.path[1].childNodes[1].textContent,
        precio: evento.path[0].textContent,
        imagen: evento.path[2].childNodes[5].outerHTML
    }
    
    isCreated(datos);
}

    var db;
    const request = indexedDB.open('Productos',1);
    
    request.onsuccess = (e) =>{
        db = request.result;
        console.log('OPEN', db);
    };


    request.onupgradeneeded = () =>{
        db = request.result;
        console.log('Create', db);
        const objectStore = db.createObjectStore
        ('Productos',{
            keyPath:'titulo'
        });
    };

    request.onerror = () =>{
        db = request.result;
        console.log('Error', error);
    }

    const addData = (data) => {
        const transaction = db.transaction(['Productos'],'readwrite');
        const objectStore = transaction.objectStore('Productos');
        const request = objectStore.add(data);
        readData();
    }


    function isCreated(data){
        const transaction = db.transaction(['Productos'],'readwrite');
        const objectStore = transaction.objectStore('Productos');
        const request = objectStore.openCursor();

        request.onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor){
                if(data['titulo']==cursor.key){
                    const updateData = cursor.value;
                    updateData['cantidad'] = cursor.value['cantidad'] + 1;
                    cursor.update(updateData);
                    console.log(cursor.value);
                }
                cursor.continue();
            }else{
                data['cantidad'] = 1;
                addData(data);
                alert('Producto agregado al carrito');
            }
        }
    }

    const readData  = () => {
        const transaction = db.transaction(['Productos'],'readonly');
        const objectStore = transaction.objectStore('Productos');
        const request = objectStore.openCursor();
        const fragment = document.createDocumentFragment();
        request.onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor){
                //console.log(cursor.key);
                cursor.continue();
            }else{
            }
        }
    }

    
    const getData = (key, data) => {
        const transaction = db.transaction(['Productos'],'readwrite');
        const objectStore = transaction.objectStore('Productos');
        const request = objectStore.get(key);
        request.onsuccess = () => {
            var cant = request.result['cantidad'];
            cant = cant + 1;

            data['cantidad'] = cant;
            console.log(data);
            addData(data);
        }
        readData();
    }

window.addEventListener('load',iniciar);