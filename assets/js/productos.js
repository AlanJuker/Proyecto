var musica = document.getElementById('Musica');
var vinyl = document.getElementById('Vinyl');
var merch = document.getElementById('Merch');

function iniciar(){
     musica = document.getElementById('Musica');
    vinyl = document.getElementById('Vinyl');
    merch = document.getElementById('Merch');

    vinyl.style.display = "none";
    merch.style.display = "none";
    musica.style.display = "inline-block";


    var btnMusica1 = document.getElementById('btnMusica');
    var btnVinyl1 = document.getElementById('btnVinyl');
    var btnMerch1 = document.getElementById('btnMerch');

    btnMusica1.addEventListener('click',btnMusica);
    btnVinyl1.addEventListener('click',btnVinyl);
    btnMerch1.addEventListener('click',btnMerch);
}

function btnMusica(){
    if (musica.style.display === "none") {
        musica.style.display = "inline-block";
        vinyl.style.display = "none";
        merch.style.display = "none";
    } 
}

function btnVinyl(){
    if (vinyl.style.display === "none") {
        musica.style.display = "none";
        vinyl.style.display = "inline-block";
        merch.style.display = "none";
    } 
}

function btnMerch(){
    if (merch.style.display === "none") {
        musica.style.display = "none";
        vinyl.style.display = "none";
        merch.style.display = "inline-block";
    } 
}

window.addEventListener('load', iniciar);