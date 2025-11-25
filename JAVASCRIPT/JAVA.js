console.log("Hola Mundo");
alert("Hola Mundo, esto es un alert") 

function triste(){
    document.getElementById('carita').src='IMAGENES/triste.jpg';
    alert("Po que ta triste mano");
}
function feliz(){
    document.getElementById('carita').src='IMAGENES/happy.jpg';
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
function msj1(){
   alert ("Este es el primer mensaje nuevo ");
}
function msj2(){
   alert ("Hoy estás aprendiendo más JavaScript ");
}
function msj3(){
   alert ("Recuerda guardar tus cambios ");
}
function msj4(){
   alert ("La web es totalmente interactiva ");
}
function msj5(){
   alert ("Practicar JS te hará más fuerte ");
}
function msj6(){
   alert ("Gracias por presionar el botón ");
}
function agrandarcarita(){
    document.getElementById('carita').style.width="250px";
    alert("imagen agrandada")
}
function achicarcarita(){
    document.getElementById('carita').style.width="80px";
    alert("imagen reducida")
}
function girarcarita(){
    document.getElementById('carita').style.transform="rotate(45deg)";
    alert("imagen girada")
}
function cambiarfooter(){
    document.getElementById('footer').style.background='rgba(8, 163, 67, 0.27)'
    alert('fondo del footer cambiado exitosamente')
}
function blanconegrocarita(){
    document.getElementById('logo').style.filter="grayscale(100%)";
    alert("imagen en blanco y negro")
}
function colornormalcarita(){
    let c = document.getElementById('logo');
    c.style.filter = "none";
    c.style.transform = "none";
    c.style.width = "200px";
    alert("imagen restaurada")
}
function nuevotitulo(){
    document.querySelector('title').textContent = "JavaScript Avanzado aplicado";
    alert("titulo cambiado correctamente")
}
function nuevosubtitulo(){
    document.querySelector("header h1").textContent = "manipulacion visual interactiva";
    alert("subtitulo actualizado")
}