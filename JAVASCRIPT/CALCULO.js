console.log("Hola Mundo");
alert("CALCULO DEL AREA Y PERIMETRO DE UN TERRENO") 

document.getElementById("CalcularTerreno").addEventListener("click", function(){
    let largo = parseFloat(document.getElementById("largo").value);
    let ancho = parseFloat(document.getElementById("ancho").value);

    let areaTexto = document.getElementById("ResultadoArea");
    let perimetroTexto = document.getElementById("ResultadoPerimetro");

    if (isNaN(largo) || isNaN(ancho)){
        alert("POR FAVOR INGRESE VALORES EN AMBOS CAMPOS PARA CALCULAR");
        areaTexto.textContent= "INGRESE VALORES VALIDOS. ";
        perimetroTexto.textContent = "";
        return;
    }
    function CalcularTerreno(a, b){
        let area = a * b;
        let perimetro = 2 * a + 2 * b;
        return {area, perimetro};
    }
    let resultado = CalcularTerreno(largo, ancho);

    areaTexto.textContent = "EL AREA DEL TERRENO ES DE: "+ resultado.area;
    perimetroTexto.textContent = "EL PERIMETRO DEL TERRENO ES DE "+ resultado.perimetro;
});


