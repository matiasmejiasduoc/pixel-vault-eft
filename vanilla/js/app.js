const listaJuegos = document.getElementById('lista-juegos')
const filtros = document.getElementById('filtros')
const contador = document.getElementById('contador')
const formulario = document.getElementById('formulario-contacto')
const mensajeEnviado = document.getElementById('mensaje-enviado')

let categoriaActual = 'Todos'

function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-CL')
}

// arma la tarjeta de un juego con createElement
function crearTarjeta(juego) {
  const columna = document.createElement('div')
  columna.className = 'col-sm-6 col-lg-4 col-xl-3'

  const tarjeta = document.createElement('article')
  tarjeta.className = 'card h-100 tarjeta-juego'

  const imagen = document.createElement('img')
  imagen.src = juego.imagen
  imagen.alt = 'Portada de ' + juego.nombre
  imagen.className = 'card-img-top'
  imagen.loading = 'lazy'

  const cuerpo = document.createElement('div')
  cuerpo.className = 'card-body'

  const categoria = document.createElement('span')
  categoria.className = 'badge text-bg-secondary mb-2'
  categoria.textContent = juego.categoria

  const titulo = document.createElement('h3')
  titulo.className = 'card-title h5'
  titulo.textContent = juego.nombre

  const descripcion = document.createElement('p')
  descripcion.className = 'card-text'
  descripcion.textContent = juego.descripcion

  cuerpo.append(categoria, titulo, descripcion)

  const pie = document.createElement('div')
  pie.className = 'card-footer'

  const precio = document.createElement('span')
  precio.className = 'precio'
  precio.textContent = formatearPrecio(juego.precio)

  const boton = document.createElement('button')
  boton.type = 'button'
  boton.className = 'btn btn-sm btn-outline-primary'
  boton.textContent = 'Comprar'

  pie.append(precio, boton)
  tarjeta.append(imagen, cuerpo, pie)
  columna.appendChild(tarjeta)

  return columna
}

function mostrarJuegos() {
  let lista = juegos
  if (categoriaActual !== 'Todos') {
    lista = juegos.filter((juego) => juego.categoria === categoriaActual)
  }

  // se limpia antes de volver a dibujar
  listaJuegos.innerHTML = ''

  if (lista.length === 0) {
    const vacio = document.createElement('p')
    vacio.className = 'text-muted'
    vacio.textContent = 'No hay juegos en esta categoría.'
    listaJuegos.appendChild(vacio)
  }

  lista.forEach((juego) => {
    listaJuegos.appendChild(crearTarjeta(juego))
  })

  contador.textContent = lista.length + (lista.length === 1 ? ' juego' : ' juegos')
}

// los botones salen de las categorías que existen en el catálogo
function crearFiltros() {
  const categorias = ['Todos']
  juegos.forEach((juego) => {
    if (!categorias.includes(juego.categoria)) {
      categorias.push(juego.categoria)
    }
  })

  categorias.forEach((categoria) => {
    const boton = document.createElement('button')
    boton.type = 'button'
    boton.className = 'btn btn-outline-dark'
    boton.textContent = categoria
    boton.dataset.categoria = categoria

    if (categoria === categoriaActual) {
      boton.classList.add('active')
    }

    filtros.appendChild(boton)
  })

  filtros.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button')
    if (!boton) return

    categoriaActual = boton.dataset.categoria

    filtros.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('active', b === boton)
    })

    mostrarJuegos()
  })
}

// validación del formulario de contacto
function marcarCampo(campo, error) {
  const mensaje = document.getElementById('error-' + campo.id)

  if (error) {
    campo.classList.add('is-invalid')
    campo.classList.remove('is-valid')
    mensaje.textContent = error
    return false
  }

  campo.classList.remove('is-invalid')
  campo.classList.add('is-valid')
  mensaje.textContent = ''
  return true
}

function validarNombre(campo) {
  const valor = campo.value.trim()
  if (valor === '') return marcarCampo(campo, 'Ingresa tu nombre.')
  if (valor.length < 3) return marcarCampo(campo, 'El nombre debe tener al menos 3 caracteres.')
  return marcarCampo(campo, '')
}

function validarEmail(campo) {
  const valor = campo.value.trim()
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (valor === '') return marcarCampo(campo, 'Ingresa tu email.')
  if (!formato.test(valor)) return marcarCampo(campo, 'El email no tiene un formato válido.')
  return marcarCampo(campo, '')
}

function validarMensaje(campo) {
  const valor = campo.value.trim()
  if (valor === '') return marcarCampo(campo, 'Escribe tu mensaje.')
  if (valor.length < 10) return marcarCampo(campo, 'El mensaje debe tener al menos 10 caracteres.')
  return marcarCampo(campo, '')
}

const validaciones = {
  nombre: validarNombre,
  email: validarEmail,
  mensaje: validarMensaje
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()
  mensajeEnviado.classList.add('d-none')

  let valido = true
  Object.keys(validaciones).forEach((id) => {
    const campo = document.getElementById(id)
    if (!validaciones[id](campo)) valido = false
  })

  if (!valido) return

  const nombre = document.getElementById('nombre').value.trim()
  mensajeEnviado.textContent = '¡Gracias ' + nombre + '! Recibimos tu mensaje y te responderemos pronto.'
  mensajeEnviado.classList.remove('d-none')

  formulario.reset()
  formulario.querySelectorAll('.is-valid').forEach((campo) => campo.classList.remove('is-valid'))
})

// cuando un campo ya tiene error se revisa de nuevo mientras escribe
formulario.addEventListener('input', (evento) => {
  const campo = evento.target
  if (campo.classList.contains('is-invalid')) {
    validaciones[campo.id](campo)
  }
})

crearFiltros()
mostrarJuegos()
