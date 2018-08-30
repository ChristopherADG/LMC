window.onload = function(){ //Cargar 100 inputs
    'user strict';
    var i, j;
    var cont = 0;
    var form1 = document.getElementById("frm1");
    console.log(form1);
    for (i = 0; i < 10; i++) {
        var row = document.createElement('div')
        row.className = "row mail";
        var colum1 = document.createElement('div')
        colum1.className = "col-sm-1";
        row.appendChild(colum1)
        for (let j = 0; j < 10; j++) {
            var colum = document.createElement('div')
            colum.className = "col-sm-1";
            var p = document.createElement('p')
            p.className = "mail";
            p.textContent = inputCero(cont);
            cont++;
            var inp = document.createElement('input')
            inp.className = "mail";
            inp.type = "text";
            inp.placeholder = "000";
            inp.onblur = function ceros(){ 
                if(this.value != "")
                this.value = agregarCeros(this.value)
            };
            inp.onkeyup =  function validarInp(){
                validar(this);
            };
            inp.maxLength = 3;
            colum.appendChild(p);
            colum.appendChild(inp)
            row.appendChild(colum);
        }
        form1.appendChild(row);
    }
    x = document.getElementById("frm1");
    flags();
};

function validar(el){
    var regex = /[a-z]/gi;
    el.value = el.value.replace(regex,"");

    if(el.value[0] == "-"){
        el.maxLength = 4;
    }else{
        el.maxLength = 3;
    }
};


function inputCero(numero){
    var largo = numero.toString().length;
    var agregar = "";
    if(largo == 1){
        agregar = "0";
        var text = agregar + numero;
        return text;
    }else if(largo == 2){
        var text = agregar + numero;
        return text;
    }
}

var x;
var contador = 0;
var out = "";

function siguientePaso() {
    if(document.getElementById("checkbox").checked == true){ //Checa Interupt
        if(document.getElementById("d_inte").value == ""){
            document.getElementById("mensaje").innerHTML = "Ingrese un valor en el interruptor";
            return;
        }
        guardar();
        document.getElementById("checkbox").checked =false;
        document.getElementById("mensaje").innerHTML = "Se ha echo un interrupt";
    }

    var instruccion = obtenerInstruccion(contador);
    
    if(instruccion==1){  //SUMAR
        var valorCalc= parseInt(document.getElementById("calculadora").innerHTML);
        var casilla = parseInt(obtenerCasilla(contador));
        var valorCasilla= parseInt(x.elements[casilla].value);
        var res= valorCalc + valorCasilla;
        document.getElementById("calculadora").innerHTML= agregarCeros(res);
        document.getElementById("mensaje").innerHTML = "Suma el valor de la casilla " + casilla + " a la calculadora";
    }else if(instruccion==2){ //RESTAR
        var valorCalc= parseInt(document.getElementById("calculadora").innerHTML);
        var casilla = parseInt(obtenerCasilla(contador));
        var valorCasilla= parseInt(x.elements[casilla].value);
        var res=valorCalc -valorCasilla;
        document.getElementById("calculadora").innerHTML= agregarCeros(res);
        document.getElementById("mensaje").innerHTML = "Resta el valor de la casilla " + casilla + " a la calculadora";
    }else if(instruccion==3){ //GUARDAR
        var valorCalc= parseInt(document.getElementById("calculadora").innerHTML);
        var casilla = parseInt(obtenerCasilla(contador));
        x[casilla].value = agregarCeros(valorCalc);
        document.getElementById("mensaje").innerHTML = "Guarda el valor de la calculadora en la casilla  " + casilla;
    }else if(instruccion==5){
        var casilla = parseInt(obtenerCasilla(contador));
        var valorCasilla= parseInt(x.elements[casilla].value);
        document.getElementById("calculadora").innerHTML = agregarCeros(valorCasilla);
        document.getElementById("mensaje").innerHTML = "Carga el valor de la casilla " + casilla + " a la calculadora";
    }else if(instruccion == 6){
        var casilla = parseInt(obtenerCasilla(contador));
        contador = casilla;
        document.getElementById("mensaje").innerHTML = "El contador se pone en " + casilla;
    }else if(instruccion == 7){
        if((parseInt(document.getElementById("calculadora").innerHTML)) == 0){
            var casilla = parseInt(obtenerCasilla(contador));
            contador = casilla;
            document.getElementById("mensaje").innerHTML = "Al ser cero el contador se pone en " + casilla;
        }else{
            document.getElementById("mensaje").innerHTML = "La instruccion es ignorada al no ser cero";
            contador++;
        } 
    }else if(instruccion == 8){
        if((parseInt(document.getElementById("calculadora").innerHTML)) >= 0){
            var casilla = parseInt(obtenerCasilla(contador));
            contador = casilla;
            document.getElementById("mensaje").innerHTML = "Al ser positivo el contador se pone en " + casilla;
        }else{
            document.getElementById("mensaje").innerHTML = "La instruccion es ignorada al no ser positivo";
            contador++;
        } 
    }else if(x.elements[contador].value == 902){  //OUTPUT
        out += agregarCeros(document.getElementById("calculadora").innerHTML) + "<br>";
        document.getElementById("mensaje").innerHTML = "Se imprime el valor de la calculadora";
        document.getElementById("output").innerHTML = out;
          
    }else if(x.elements[contador].value == 901){ //INPUT
        if(document.getElementById("input").disabled  == true){
            document.getElementById("input").disabled = false;
            document.getElementById("mensaje").innerHTML = "Ingresa un input";
            return ;
        }
        if(document.getElementById("input").value == ""){
            document.getElementById("mensaje").innerHTML = "El campo esta vacio porfavor ingresa un input";
            return;
        }
        document.getElementById("calculadora").innerHTML = agregarCeros(document.getElementById("input").value);  
        document.getElementById("input").value = "";
        document.getElementById("input").disabled = true;
        document.getElementById("mensaje").innerHTML = "Se ingreso un input en la calculadora";
          
    }else if(x.elements[contador].value == 999){   
        restaurar();
        contador--;
        document.getElementById("mensaje").innerHTML = "El interrupt ha terminado";
    }else if(x.elements[contador].value == "" || x.elements[contador].value == 000){   
        document.getElementById("mensaje").innerHTML = "Fin del programa";
        document.getElementById("sig").disabled = true;
        document.getElementById("todo").disabled = true;
        return;
    }
    
    if (instruccion == 6 || instruccion == 7 || instruccion == 8){
        document.getElementById("cont").innerHTML= inputCero(contador);
    }else{
        contador++;
        document.getElementById("cont").innerHTML= contador;
    }

    flags();
}

function todo(){
    var y = document.getElementById("frm1");
    x = y;
    var bandera=true;
    while(bandera){
        if(x.elements[contador].value == 901 && document.getElementById("input").value == ""){
            bandera = !bandera;
            siguientePaso();
        }else if(x.elements[contador].value == 000 || x.elements[contador].value == ""){
            siguientePaso();
            return;
        }else{
            siguientePaso();   
        }
    }
    flags();
}

function reset(){
    contador=0;
    document.getElementById("cont").innerHTML=inputCero(contador);
    document.getElementById("sig").disabled = false;
    document.getElementById("todo").disabled = false;
    document.getElementById("mensaje").innerHTML = "-";
}

var contadorA, calculadoraA, outputA, inputA;

function guardar(){
    contadorA = contador;
    calculadoraA = document.getElementById("calculadora").innerHTML;
    outputA = document.getElementById("output").innerHTML;
    inputA = document.getElementById("input").value;


    contador = document.getElementById("d_inte").value;
    document.getElementById("cont").innerHTML= contador;
    document.getElementById("calculadora").innerHTML="000";
    document.getElementById("output").innerHTML="000";
    document.getElementById("input").value=null;
}

function restaurar(){
    contador=contadorA;
    document.getElementById("calculadora").innerHTML=calculadoraA;
    document.getElementById("cont").innerHTML=contador;
    document.getElementById("output").innerHTML=outputA;
    document.getElementById("input").value=inputA;
}

function flags(){
    var cal = parseInt(document.getElementById("calculadora").innerHTML);
    if(cal >= 0){
        document.getElementById("pos").style.backgroundColor = "green";
    }else{
        document.getElementById("pos").style.backgroundColor = "red";
    }
    if(cal == 0){
        document.getElementById("zero").style.backgroundColor = "green";
    }else{
        document.getElementById("zero").style.backgroundColor = "red";
    }
}

function agregarCeros(numero){
    var largo = numero.toString().length;
    var agregar = "";
    if(numero < 0){
        numero *= -1;
        if(largo == 2){
            agregar = "-00";
            var text = agregar + numero;
            return text;
        }else if(largo == 3){
            agregar = "-0"
            var text = agregar + numero;
            return text;
        }else if(largo == 4){
            agregar = "-"
            var text = agregar + numero;
            return text;
        }
    }
    if(largo == 1){
        agregar = "00";
        var text = agregar + numero;
        return text;
    }else if(largo == 2){
        agregar = "0";
        var text = agregar + numero;
        return text;
    }else if(largo == 3){
        var text = agregar + numero;
        return text;
    }
}

function obtenerInstruccion(mailBox){
    console.log(x[mailBox].value[0]);
    return x[mailBox].value[0];
}

function obtenerCasilla(mailBox){
    var casilla="";
    for(var i=1;i<=2;i++){
        casilla+=x[mailBox].value[i]
    }
    return casilla;
}

function toggleCheckbox(element){
    if(element.checked == true){
        document.getElementById("d_inte").disabled = false;
    }else{
        document.getElementById("d_inte").disabled = true;
        document.getElementById("d_inte").value = "";
    }
 }