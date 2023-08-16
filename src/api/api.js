const URL_BASE = 'https://api.exchangerate.host';

export async function obtenerDivisas(){
  const URL_SIMBOLOS = '/symbols';
  return fetch(URL_BASE + URL_SIMBOLOS)
    .then((respuesta) => respuesta.json());
}

export async function obtenerCambios(fecha, base, monto = '1'){
  const URL_CAMBIOS = `/${fecha}?base=${base}&amount=${monto}`;
  
  return fetch(URL_BASE + URL_CAMBIOS)
    .then((respuesta) => respuesta.json());
}
