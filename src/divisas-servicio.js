export async function obtenerDivisas() {
  return fetch('https://api.exchangerate.host/symbols')
    .then((respuesta) => respuesta.json())
    .then((respuestaJson) => respuestaJson.symbols);
}

export async function obtenerCambios(fecha, base, monto = '1') {
  return fetch(`https://api.exchangerate.host/${fecha}?base=${base}&amount=${monto}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => respuesta.rates);
}
