const campoNombre = document.querySelector(".form-control.nombre")
const campoCategoria = document.querySelector("select.form-select.categoria")
const campoUbicacion = document.querySelector("select.form-select.ubicacion")
const campoCosto = document.querySelector(".form-control.costo")
const campoIva = document.querySelector(".form-control.iva")
const campoGanancia = document.querySelector(".form-control.ganancia")
const campoCantidad = document.querySelector(".form-control.cantidad")
const campoPrecioPubico = document.querySelector(".form-control.precio-publico")
const formularioNewProduct = document.querySelector(".form-nuevoProducto")
const btnGuardar = document.querySelector("button.btn.btn-outline-personal")
const productosTabla = document.querySelector(".tablaProductos")
const mensajeToast = document.querySelector("div.toast-body.texto-alerta")
const btnNewCategoria = document.querySelector("button.btn.btn-primary.nuevaCategoria")
const opClat = document.querySelector("option.opcat")
const optionDeposito = document.querySelector("option.opUb")
const campoNuevaCategoria = document.querySelector("input.form-control.nombreCategoria")
const nuevaUbicacion = document.querySelector("input.nombreUbicacion")
const btnAgregarCat = document.querySelector("button.btn.btn-primary.btncat")
const tablaVacia = document.querySelector("div.notificacion-tabla.text-center")
const totalDeposito = document.querySelector("span.total_valor")
const btnUb = document.querySelector("button.btnubicaion")
const totalProCount = document.querySelector("li.list-group-item.totalProducto")
// toast
const toastLiveExample = document.getElementById('liveToast')
// toast
btnGuardar.addEventListener("click", cargar)
btnAgregarCat.addEventListener("click", agregarCategoriaModal)
btnUb.addEventListener("click", agregarUbModal)



function cargar(e) {
    e.preventDefault()
    ingresoNewMercaderia()
    limpiarForm()

}

function agregarCategoriaModal(e) {
    e.preventDefault()
    nuevaCategoria()
}

function agregarUbModal(e) {
    e.preventDefault()
    ubicacionN()
}


function ingresoNewMercaderia() {
    genId = Date.now()
    const mercaderia = new Mercaderia(id = genId, campoNombre.value, campoCategoria.value, campoUbicacion.value, parseFloat(campoCosto.value), parseFloat(campoGanancia.value), parseInt(campoCantidad.value))
    np = campoNombre.value
    stock.push(mercaderia)
    localStorage.setItem("mercaderia", JSON.stringify(stock))
    // console.log(stock) BORRAR SOLO TEST
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
    notifi(np)
    cargadorTabla()


}



function limpiarForm() {
    campoNombre.value = ""
    campoCategoria.value = ""
    campoUbicacion.value = ""
    campoCosto.value = ""
    campoGanancia.value = ""
    campoCantidad.value = ""
    id = ""
}


// funcion agregar categoria
function nuevaCategoria() {
    genId = Date.now()
    const cat = new Categoria(id = genId, campoNuevaCategoria.value)
    categoria.push(cat)
    localStorage.setItem("categoria", JSON.stringify(categoria))
    campoNuevaCategoria.value = ""

}
// funcion para carga de selectores

function cargarSelect(selector, array) {
    array.forEach(elemento => (selector.innerHTML += ` <option value="${elemento.nombre}">${elemento.nombre}</option>`
    ))
}

cargarSelect(campoUbicacion, deposito)


// funcion para cargar la tabla
function cargadorTabla() {

    if (stock.length > 0) {
        tablaVacia.remove();

        while (productosTabla.firstChild) {
            productosTabla.removeChild(productosTabla.firstChild);
        }
        stock.forEach(producto => {
            const elementoTabla = document.createElement('tr');
            elementoTabla.innerHTML = `
          <th scope="row">${producto.id}</th>
          <td>${producto.cantidad}</td>
          <td>${producto.nombre}</td>
          <td>${producto.costo}</td>
          <td>${producto.ppublico}</td>
          <td>${producto.precioLote}</td>
        `;
            productosTabla.appendChild(elementoTabla);
        });
        totalProCount.innerHTML = ` Total Productos <span> <strong>${stock.length}</strong> </span>`
        totalDeposito.textContent = costoLote()
    }
}




// mostrar mensaje nuevo producto
const notifi = (np) => { mensajeToast.innerHTML = `<p>producto <strong>${np} </strong> agregado correctamente</p>` }


// cargar categorias de localstorage en el array
const lsCat = () => {
    const cat = JSON.parse(localStorage.getItem("categoria"))
    cat && categoria.push(...cat)
}
lsCat()


// cargar categorias en el select
function cargadorCategoria() {

    if (categoria < 1) {
        opClat.remove()
        campoCategoria.innerHTML = `<option selected disabled>no hay categoria cargada</option>`
        btnNewCategoria.classList.remove('desactivado')

    } else {
        categoria.forEach(cat => (
            campoCategoria.innerHTML += `<option value="${cat.nombre}">${cat.nombre}</option>`))
        btnNewCategoria.classList.add('desactivado')
    }
}
cargadorCategoria()





// cargar ubicciones de localstorage en el array
const listUbicaciones = () => {
    const ub = JSON.parse(localStorage.getItem("depositos"))
    ub && deposito.push(...ub)
}
listUbicaciones()


// cargar ubicaiones en el select
function cargdorUbicaciones() {
    if (deposito < 1) {
        optionDeposito.remove()
        campoUbicacion.innerHTML = `<option selected disabled>no hay ubicaciones cargadas</option>`
    } else {
        deposito.forEach(ubicacion => (
            campoUbicacion.innerHTML += `<option value="${ubicacion.nombre}">${ubicacion.nombre}</option>`))
    }
}
cargdorUbicaciones()


// guardar nueva Ubicacion
function ubicacionN() {
    genId = Date.now()
    const depositos = new Ubicaciones(id = genId, nuevaUbicacion.value)
    deposito.push(depositos)
    localStorage.setItem("depositos", JSON.stringify(deposito))
    nuevaUbicacion.value = ""
}




// calculo del costo del lote de mercaderia
function costoLote() {
    let costoTotal = stock.reduce((acc, mercaderia) => acc + mercaderia.precioLote, 0)
    return costoTotal
}



const lsProductos = () => {
    const productosEnMemoria = JSON.parse(localStorage.getItem("mercaderia"))
    if (productosEnMemoria != null) {
        stock.push(...productosEnMemoria)
        cargadorTabla()
    } else {
        tablaVacia.innerHTML = ` <p class="notificacion-temporal">Sin Productos Cargados</p>`
        totalProCount.innerHTML = ` Total Productos <span> <strong>0</strong> </span>`
        totalDeposito.innerHTML = `  <span> <strong>0</strong> </span>`
    }
}
lsProductos()
