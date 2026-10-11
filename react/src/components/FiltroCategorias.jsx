function FiltroCategorias({ categorias, categoriaActual, cambiarCategoria }) {
  const opciones = ['Todos', ...categorias]

  return (
    <div className="filtros mb-4" role="group" aria-label="Filtrar por categoría">
      {opciones.map((opcion) => (
        <button
          key={opcion}
          type="button"
          className={'btn btn-outline-dark' + (opcion === categoriaActual ? ' active' : '')}
          onClick={() => cambiarCategoria(opcion)}
        >
          {opcion}
        </button>
      ))}
    </div>
  )
}

export default FiltroCategorias
