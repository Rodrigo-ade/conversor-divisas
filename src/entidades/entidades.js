export class Divisa { 

  constructor(descripcion, codigo) {
    this.descripcion = descripcion;
    this.codigo = codigo;
  }
}

export class Cambio {
  
  constructor(simbolo,precio) {
    this.simbolo = simbolo,
    this.precio = precio
  }
}

export class Cambios {

  constructor(base, fecha, cambios) {
    this.base = base;
    this.fecha = fecha;
    this.cambios = cambios;
  }
}
