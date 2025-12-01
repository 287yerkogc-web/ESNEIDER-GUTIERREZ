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
   alert ("LA IA APRENDE ANALIZANDO PATRONES DENTRO DE MUCHOS DATOS");
}
function msj2(){
   alert ("UN ALGORITMO RESUELVE PROBLEMAS SIGUIENDO PASOS LOGICOS DEFINIDOS");
}
function msj3(){
   alert ("LOS MODELOS MEJORAN AJUSTANDO PARAMETROS SEGUN INFORMACION PREVIA");
}
function msj4(){
   alert ("EL APRENDIZAJE SUPERVISADO USA EJEMPLOS CORRECTOS PARA ENTRENAR");
}
function msj5(){
   alert ("LA COMPLEJIDAD DEFINE CUAN EFICIENTE ES UN ALGORITMO");
}
function msj6(){
   alert ("LA IA COMBINA DATOS, LOGICA Y ANALISIS PARA DECIDIR");
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
    let footer = document.querySelector("footer").style.background='rgba(8, 163, 67, 0.27)'
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
    document.querySelector('title').textContent = "JAVASCRIPT AVANZADO APLICADO";
    alert("titulo cambiado correctamente")
}
function nuevosubtitulo(){
    document.querySelector("header h1").textContent = "MANIPULACION VISUAL INTERACTIVA";
    alert("subtitulo actualizado")
}