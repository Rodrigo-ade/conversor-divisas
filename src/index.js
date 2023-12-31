import * as servicio from './servicios/divisas-servicio.js';
import {mostrarDivisas, mostrarFechaActual, permitirObtenerCambios} from './ui.js';

async function iniciar() {
  mostrarFechaActual();
  mostrarDivisas(await servicio.obtenerDivisas());
  permitirObtenerCambios();
}

iniciar();
