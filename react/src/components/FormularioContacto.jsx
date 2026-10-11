import { useState } from 'react'

const vacio = { nombre: '', email: '', mensaje: '' }

function FormularioContacto() {
  const [datos, setDatos] = useState(vacio)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState('')

  function validar(valores) {
    const nuevos = {}
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (valores.nombre.trim() === '') nuevos.nombre = 'Ingresa tu nombre.'
    else if (valores.nombre.trim().length < 3) nuevos.nombre = 'El nombre debe tener al menos 3 caracteres.'

    if (valores.email.trim() === '') nuevos.email = 'Ingresa tu email.'
    else if (!formatoEmail.test(valores.email.trim())) nuevos.email = 'El email no tiene un formato válido.'

    if (valores.mensaje.trim() === '') nuevos.mensaje = 'Escribe tu mensaje.'
    else if (valores.mensaje.trim().length < 10) nuevos.mensaje = 'El mensaje debe tener al menos 10 caracteres.'

    return nuevos
  }

  function cambiar(e) {
    const nuevosDatos = { ...datos, [e.target.name]: e.target.value }
    setDatos(nuevosDatos)

    // si el campo ya tenía error se vuelve a revisar mientras escribe
    if (errores[e.target.name]) {
      setErrores(validar(nuevosDatos))
    }
  }

  function enviar(e) {
    e.preventDefault()
    const nuevos = validar(datos)
    setErrores(nuevos)
    setEnviado('')

    if (Object.keys(nuevos).length > 0) return

    setEnviado(datos.nombre.trim())
    setDatos(vacio)
  }

  function clase(campo) {
    return 'form-control' + (errores[campo] ? ' is-invalid' : '')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">
        <h2>Contacto</h2>
        <p className="text-muted">¿Dudas con una compra? Escríbenos y te respondemos dentro de 24 horas.</p>

        <form onSubmit={enviar} noValidate>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input id="nombre" name="nombre" className={clase('nombre')} value={datos.nombre} onChange={cambiar} />
            <div className="invalid-feedback">{errores.nombre}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input id="email" name="email" type="email" className={clase('email')} value={datos.email} onChange={cambiar} />
            <div className="invalid-feedback">{errores.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea id="mensaje" name="mensaje" rows="4" className={clase('mensaje')} value={datos.mensaje} onChange={cambiar}></textarea>
            <div className="invalid-feedback">{errores.mensaje}</div>
          </div>
          <button type="submit" className="btn btn-primary">Enviar mensaje</button>
        </form>

        {enviado && (
          <div className="alert alert-success mt-3" role="alert">
            ¡Gracias {enviado}! Recibimos tu mensaje y te responderemos pronto.
          </div>
        )}
      </div>
    </div>
  )
}

export default FormularioContacto
