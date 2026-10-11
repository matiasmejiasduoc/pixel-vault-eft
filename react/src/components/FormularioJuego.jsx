import { useState } from 'react'

const vacio = { nombre: '', categoria: '', precio: '', descripcion: '' }

function FormularioJuego({ categorias, agregar }) {
  const [datos, setDatos] = useState(vacio)
  const [errores, setErrores] = useState({})
  const [agregado, setAgregado] = useState('')

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function validar() {
    const nuevos = {}
    if (datos.nombre.trim() === '') nuevos.nombre = 'Ingresa el nombre del juego.'
    if (datos.categoria.trim() === '') nuevos.categoria = 'Ingresa una categoría.'
    if (datos.precio === '' || Number(datos.precio) <= 0) nuevos.precio = 'El precio debe ser mayor a 0.'
    if (datos.descripcion.trim().length < 10) nuevos.descripcion = 'La descripción debe tener al menos 10 caracteres.'
    return nuevos
  }

  function enviar(e) {
    e.preventDefault()
    const nuevos = validar()
    setErrores(nuevos)
    setAgregado('')

    if (Object.keys(nuevos).length > 0) return

    agregar({
      nombre: datos.nombre.trim(),
      categoria: datos.categoria.trim(),
      precio: Number(datos.precio),
      descripcion: datos.descripcion.trim(),
      imagen: 'img/sin-portada.svg',
    })
    setAgregado(datos.nombre.trim())
    setDatos(vacio)
  }

  function clase(campo) {
    return 'form-control' + (errores[campo] ? ' is-invalid' : '')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">
        <h2>Agregar juego</h2>
        <p className="text-muted">El juego nuevo aparece al final del catálogo.</p>

        <form onSubmit={enviar} noValidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="juego-nombre" className="form-label">Nombre</label>
              <input id="juego-nombre" name="nombre" className={clase('nombre')} value={datos.nombre} onChange={cambiar} />
              <div className="invalid-feedback">{errores.nombre}</div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="juego-categoria" className="form-label">Categoría</label>
              <input
                id="juego-categoria"
                name="categoria"
                list="lista-categorias"
                className={clase('categoria')}
                value={datos.categoria}
                onChange={cambiar}
              />
              {/* sugiere las categorías que ya existen, pero se puede escribir una nueva */}
              <datalist id="lista-categorias">
                {categorias.map((c) => <option key={c} value={c} />)}
              </datalist>
              <div className="invalid-feedback">{errores.categoria}</div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="juego-precio" className="form-label">Precio (CLP)</label>
            <input
              id="juego-precio"
              name="precio"
              type="number"
              min="1"
              className={clase('precio')}
              value={datos.precio}
              onChange={cambiar}
            />
            <div className="invalid-feedback">{errores.precio}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="juego-descripcion" className="form-label">Descripción</label>
            <textarea
              id="juego-descripcion"
              name="descripcion"
              rows="3"
              className={clase('descripcion')}
              value={datos.descripcion}
              onChange={cambiar}
            ></textarea>
            <div className="invalid-feedback">{errores.descripcion}</div>
          </div>
          <button type="submit" className="btn btn-success">Agregar al catálogo</button>
        </form>

        {agregado && (
          <div className="alert alert-success mt-3" role="alert">
            Se agregó "{agregado}" al catálogo.
          </div>
        )}
      </div>
    </div>
  )
}

export default FormularioJuego
