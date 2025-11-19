console.log("Hola Mundo");
alert("Hola Mundo, esto es un alert") 

function triste(){
    document.getElementById('carita').src='images/sad.png';
    alert("Po que ta triste mano");
}
function feliz(){
    document.getElementById('carita').src='images/happy.png';
}
function cambiarColor(){
    document.getElementById('menu').style.color='#eed33aff';

}
function cambiarLogo(){
    document.getElementById('logo').src='IMAGENES/logo2.jpg';
}
function cambiarFondo(){
     document.getElementById('menu').style.background='#524604';
}
function cambiodeTexto(){
    document.getElementById('Subtitulo').textContent="YA LE SE AL JS";
}