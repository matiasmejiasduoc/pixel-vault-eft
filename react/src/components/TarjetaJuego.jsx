function TarjetaJuego({ juego, eliminar }) {
  return (
    <article className="card h-100 tarjeta-juego">
      <img
        src={juego.imagen}
        className="card-img-top"
        alt={'Portada de ' + juego.nombre}
        loading="lazy"
      />
      <div className="card-body">
        <span className="badge text-bg-secondary mb-2">{juego.categoria}</span>
        <h3 className="card-title h5">{juego.nombre}</h3>
        <p className="card-text">{juego.descripcion}</p>
      </div>
      <div className="card-footer">
        <span className="precio">${juego.precio.toLocaleString('es-CL')}</span>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => eliminar(juego.id)}
          aria-label={'Eliminar ' + juego.nombre}
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default TarjetaJuego
