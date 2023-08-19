/* eslint-disable no-use-before-define */
import { obtenerCambios as servicioObtenerCambios } from './servicios/divisas-servicio.js';

export function mostrarDivisas(divisas) {
  divisas.forEach((divisa) => {
    const BASE = document.createElement('option');
    BASE.value = divisa.codigo;
    BASE.textContent = divisa.descripcion;

    document.querySelector('#bases').appendChild(BASE);
  });
}

export function mostrarFechaActual() {
  const FECHA_ACTUAL = new Date().toISOString().split('T')[0];
  document.querySelector('#fecha').value = FECHA_ACTUAL;
}

async function pedirCambios() {
  const CAMPO_MONTO = document.querySelector('#monto');
  const CAMPO_FECHA = document.querySelector('#fecha');
  const CAMPO_BASE = document.querySelector('#bases');
  const monto = Number(CAMPO_MONTO.value) || 1;
  const fecha = CAMPO_FECHA.value;
  const base = CAMPO_BASE.value;
  const hayErrores = base === '';

  if (!hayErrores) {
    obtenerCambios(monto, base, fecha);
  } else {
    manejarErrores();
  }
}

export function permitirObtenerCambios() {
  document.querySelector('#convertir').addEventListener('click', pedirCambios);
}

function manejarErrores() {
  ocultarResultados();
  manejarErrorBase(false);
  cargandoResultados(false);
}

async function obtenerCambios(monto, base, fecha) {
  ocultarResultados();
  cargandoResultados();
  manejarErrorBase();
  actualizarTextoBusqueda(monto, base, fecha);
  eliminarDivisasAnteriores();
  mostrarCambios(await servicioObtenerCambios(fecha, base, monto));
  cargandoResultados(false);
  mostrarResultados();
}

function cargandoResultados(cargando = true) {
  const CONTENEDOR_CARGANDO = document.querySelector('#cargando');
  if (cargando) {
    CONTENEDOR_CARGANDO.classList.remove('oculto');
  } else {
    CONTENEDOR_CARGANDO.classList.add('oculto');
  }
}

function mostrarResultados() {
  document.querySelector('#resultados').classList.remove('oculto');
}

function ocultarResultados() {
  document.querySelector('#resultados').classList.add('oculto');
}

function eliminarDivisasAnteriores() {
  const CONTENEDOR_DIVISAS = document.querySelector('#lista-conversiones');
  while (CONTENEDOR_DIVISAS.firstChild) {
    CONTENEDOR_DIVISAS.removeChild(CONTENEDOR_DIVISAS.lastChild);
  }
}

function mostrarCambios(cambios) {
  cambios.cambios.forEach((cambio) => {
    crearCambio(cambio.simbolo , cambio.precio);
  });
}

function crearCambio(divisa, monto) {
  const CONTENEDOR = document.createElement('tr');
  const DIVISA = document.createElement('td');
  const MONTO = document.createElement('td');
  DIVISA.textContent = divisa;
  MONTO.textContent = monto;

  CONTENEDOR.appendChild(DIVISA);
  CONTENEDOR.appendChild(MONTO);
  document.querySelector('#lista-conversiones').appendChild(CONTENEDOR);
}

function manejarErrorBase(valido = true) {
  const CAMPO_BASE = document.querySelector('#bases');
  const CAMPO_ERROR_BASE = document.querySelector('#error-base');
  if (!valido) {
    CAMPO_BASE.classList.add('is-invalid');
    CAMPO_ERROR_BASE.classList.remove('oculto');
  } else {
    CAMPO_BASE.classList.remove('is-invalid');
    CAMPO_ERROR_BASE.classList.add('oculto');
  }
}

function actualizarTextoBusqueda(monto, base, fecha) {
  document.querySelector('#texto-resultado').textContent = `Los cambios de ${monto} ${base}, para el día ${fecha} son:`;
}
