const categoria=[]
const stock=[]
const deposito=[]

IVA = 1.21
total = 0



class Mercaderia{
 
  constructor(id,nombre,categoria,ubicacion,costo,ganancia,campoCantidad){
    this.id=id
    this.nombre=nombre
    this.categoria=categoria
    this.ubicacion = ubicacion
    this.costo = parseFloat(costo)
    this.iva = this.precioConIVA()
    this.cantidad = parseInt(campoCantidad)
    this.ganancia = (parseFloat(ganancia)/100).toFixed(2)
    this.ppublico = this.precioPublico()
    this.precioLote = this.precioStock()
  }
  
  precioConIVA = function(){
    return this.costo * IVA
  }

  precioPublico=function(){
    return  ((this.iva * parseFloat(this.ganancia) ) + this.iva).toFixed(2)
  }

  precioStock=function(){
    return this.costo * this.cantidad
  }
  
}


class Categoria{
  constructor(id,nombre){
    this.id=id
    this.nombre=nombre
  }
}


class Ubicaciones{
  constructor(id,nombre){
    this.id=id
    this.nombre=nombre
  }
  
}




