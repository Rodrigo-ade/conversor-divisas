import { Divisa, Cambio, Cambios } from "../entidades/entidades.js";

export function mapearDivisas(apiDatos){
  const simbolos = apiDatos.symbols;
  const divisas = [];

  for(let key in simbolos ){
    const {
      description: descripcion,
      code: codigo,
    } = simbolos[key];

    divisas.push(new Divisa(descripcion, codigo));
  }

  return divisas;
}

export function mapearCambios(apiDatos){
  const base = apiDatos.base;
  const fecha = apiDatos.date;
  const cambios = [];

  for(let key in apiDatos.rates){
    const simbolo = key;
    const precio = apiDatos.rates[key];

    cambios.push(new Cambio(simbolo,precio));
  }

  return new Cambios(base, fecha, cambios);
}
