import TarjetaJuego from './TarjetaJuego'

function ListaJuegos({ juegos, cargando, error, eliminar }) {
  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger">No se pudo cargar el catálogo, intenta más tarde.</div>
  }

  if (juegos.length === 0) {
    return <p className="text-muted">No hay juegos para mostrar.</p>
  }

  return (
    <div className="row g-4">
      {juegos.map((juego) => (
        <div className="col-sm-6 col-lg-4 col-xl-3" key={juego.id}>
          <TarjetaJuego juego={juego} eliminar={eliminar} />
        </div>
      ))}
    </div>
  )
}

export default ListaJuegos
