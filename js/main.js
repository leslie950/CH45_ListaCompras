let btnAgregar = document.getElementById("btnAgregar");
let bntClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");
//bandera, al ser true, permite agregar los datos a la tabla
let isValid = true;
let contador = 0;
let precio = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = new Array();

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }//lenght==0

    if(isNaN(txtNumber.value)){
        return false;
    }//isNan

    if(Number(txtNumber.value)<=0){
        return false;
    }
        return true;
}
function getPrecio(){
    return Math.round((Math.random()*10000))/100;
} //getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    isValid = true;

//Validar el nombre del producto    
    if(txtNombre.value.length<3){
        txtNombre.style.border="solid red medium";
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto.<br/>";
        alertValidaciones.style.display="block";
        isValid = false;
    }//if length<3

//Validar la cantidad
    if(! validarCantidad()){
            txtNumber.style.border="solid red medium";
            alertValidacionesTexto.innerHTML+="La <strong>Cantidad</strong> no es correcta.<br/>";
            alertValidaciones.style.display="block";
            isValid = false;
        }//!validarCantidad

        if(isValid){
            contador++;
            precio = getPrecio();
            let row = `<tr>
                        <td>${contador}</td>
                        <td>${txtNombre.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
            </tr>`;

            let elemento = {"contador": contador,
                            "nombre": txtNombre.value,
                            "cantidad": txtNumber.value,
                            "precio": precio};
            datos.push(elemento);
            localStorage.setItem("datos", JSON.stringify(datos));

            cuerpoTabla.insertAdjacentHTML("beforeend", row);
            costoTotal += precio * Number(txtNumber.value);
            totalEnProductos += Number(txtNumber.value);
            contadorProductos.innerText = contador;
            productosTotal.innerText=totalEnProductos;
            precioTotal.innerText="$ " + costoTotal.toFixed(2);
            localStorage.setItem("contador", contador);
            localStorage.setItem("totalEnProductos", totalEnProductos);
            localStorage.setItem("costoTotal", costoTotal);
            
            txtNombre.value="";
            txtNumber.value="";
            txtNombre.focus();
        }//isValid

});//btnAgregar.addEventListener

bntClear.addEventListener("click", function(event){
    event.preventDefault();
    //Limpiar el valor de los campos
    txtNombre.value="";
    txtNumber.value="";
    //Limpiar local storage
    //Elimina por cada llave/clave un solo elemento
    // localStorage.rmeoveItem("contador");
    // localStorage.rmeoveItem("costoTotal");
    // localStorage.rmeoveItem("totalEnProductos");
    //Elimina todo el contenido del localStorage
    localStorage.clear();
    //Limpiar la tabla
    cuerpoTabla.innerHTML="";
    //Reiniciar las variables: contador, costooTotal, totalEnProductos
    contador = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    //Asignar las variables a los divs
    contadorProductos.innerText = contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText= "$ " + costoTotal.toFixed(2); 
    //ocultar la alerta
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    //quitar los bordes
    txtNombre.style.border="";
    txtNumber.style.border="";
});

//evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur",function(event){
    txtNombre.value = txtNombre.value.trim();
});//txtNombre.addEventListener

txtNumber.addEventListener("blur",function(event){
    txtNombre.value=txtNumber.value.trim();
}); //txtNumber.addEventListener

//Load de la página
window.addEventListener("load", function(){
    if (this.localStorage.getItem("contador") != null){
        contador = Number(this.localStorage.getItem("contador"));
    }//!null
    if (this.localStorage.getItem("totalEnProductos") != null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }//!null
    if (this.localStorage.getItem("costoTotal") != null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }//!null   
    contadorProductos.innerText = contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText= "$ " + costoTotal.toFixed(2); 

    if (this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//!null   
    datos.forEach(r =>{
        let row = `<tr>
                    <td>${r.contador}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });
});//window load