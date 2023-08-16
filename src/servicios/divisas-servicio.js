import { 
  obtenerDivisas as obtenerDivisasDeApi, 
  obtenerCambios as obtenerCambiosDeApi
} from "../api/api.js";
import { mapearDivisas, mapearCambios } from "../mapeadores/mapeadores.js";

export async function obtenerDivisas() {
  return mapearDivisas(await obtenerDivisasDeApi());
}

export async function obtenerCambios(fecha,base, monto) {
  return mapearCambios(await obtenerCambiosDeApi(fecha,base,monto));
}
