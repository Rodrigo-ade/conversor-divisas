const FECHA_ACTUAL = new Date().toISOString().split('T')[0];
document.querySelector("#fecha").value = FECHA_ACTUAL;

function obtenerSimbolosBase(){
    const URL_SIMBOLOS = "https://api.exchangerate.host/symbols";
    fetch(URL_SIMBOLOS)
    .then(respuesta => respuesta.json())
    .then(respuesta => respuesta.symbols)
    .then(simbolos=>{
        Object.values(simbolos).forEach(simbolo => {
            agregarNuevaBase(simbolo.code,simbolo.description);
        });
    });
}

obtenerSimbolosBase();

function agregarNuevaBase(codigo,descripcion){
    const BASE = document.createElement("option");
    BASE.value = codigo;
    BASE.textContent = descripcion;

    document.querySelector("#bases").appendChild(BASE);
}

document.querySelector("#convertir").onclick = obtenerCambios;

function obtenerCambios(){
    const CAMPO_MONTO = document.querySelector("#monto");
    const CAMPO_FECHA = document.querySelector("#fecha");
    const CAMPO_BASE  = document.querySelector("#bases");

    let monto = Number(CAMPO_MONTO.value) || 1;
    let fecha = CAMPO_FECHA.value;
    let base = CAMPO_BASE.value;

    let hayErrores = base === "";

    if(!hayErrores){
        ocultarResultados();
        cargandoResultados();
        manejarErroresBase(CAMPO_BASE);
        actualizarTextoBusqueda(monto,base,fecha);
        eliminarDivisasAnteriores();
        
        let URL_CAMBIOS  = `https://api.exchangerate.host/${fecha}?base=${base}&amount=${monto}`;
        fetch(URL_CAMBIOS)
        .then(respuesta => respuesta.json())
        .then(respuesta => respuesta.rates)
        .then(divisas => {
           Object.keys(divisas).forEach(divisa => {
            crearCambio(divisa,divisas[divisa]);
           });
           cargandoResultados(false);
           mostrarResultados();
        })
        .catch(e =>{
            console.log("Error: " + e);
        });

    }else{
        ocultarResultados();
        manejarErroresBase(CAMPO_BASE,false);
        cargandoResultados(false);
    };
}

function cargandoResultados(cargando = true){
    let contenedorCargando = document.querySelector("#cargando");
    if(cargando){
        contenedorCargando.classList.remove("oculto");
    }else{
        contenedorCargando.classList.add("oculto");
    };
}

function mostrarResultados(){
    document.querySelector("#resultados").classList.remove("oculto");
}

function ocultarResultados(){
    document.querySelector("#resultados").classList.add("oculto");
}

function eliminarDivisasAnteriores(){
    let contenedorDivisas = document.querySelector("#lista-conversiones");
    while(contenedorDivisas.firstChild){
        contenedorDivisas.removeChild(contenedorDivisas.lastChild);
    };
}

function crearCambio(divisa,monto){
    const CONTENEDOR = document.createElement("tr");
    const DIVISA = document.createElement("td");
    const MONTO = document.createElement("td");
    DIVISA.textContent = divisa;
    MONTO.textContent = monto;

    CONTENEDOR.appendChild(DIVISA);
    CONTENEDOR.appendChild(MONTO);
    document.querySelector("#lista-conversiones").appendChild(CONTENEDOR);
}

function manejarErroresBase(campo,valido = true){
    if(!valido){
        campo.classList.add("is-invalid");
        document.querySelector("#error-base").classList.remove("oculto");
    }else{
        campo.classList.remove("is-invalid");
        document.querySelector("#error-base").classList.add("oculto");
    };
}

function actualizarTextoBusqueda(monto,base,fecha){
    document.querySelector("#texto-resultado").textContent = `Los cambios de ${monto} ${base}, para el día ${fecha} son:`;
}
