import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Portada from './components/Portada'
import FiltroCategorias from './components/FiltroCategorias'
import ListaJuegos from './components/ListaJuegos'
import FormularioJuego from './components/FormularioJuego'
import FormularioContacto from './components/FormularioContacto'
import Footer from './components/Footer'

function App() {
  const [juegos, setJuegos] = useState([])
  const [categoria, setCategoria] = useState('Todos')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  // los juegos se cargan desde el json al abrir la página
  useEffect(() => {
    fetch('data/juegos.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error ' + res.status)
        return res.json()
      })
      .then((data) => setJuegos(data))
      .catch((err) => {
        console.error(err)
        setError(true)
      })
      .finally(() => setCargando(false))
  }, [])

  function agregarJuego(juego) {
    const nuevoId = juegos.length > 0 ? Math.max(...juegos.map((j) => j.id)) + 1 : 1
    setJuegos([...juegos, { ...juego, id: nuevoId }])
  }

  function eliminarJuego(id) {
    const restantes = juegos.filter((j) => j.id !== id)
    setJuegos(restantes)

    // si se borra el último juego de la categoría elegida se vuelve a "Todos"
    if (!restantes.some((j) => j.categoria === categoria)) {
      setCategoria('Todos')
    }
  }

  // categorías sin repetir, sacadas de los juegos que hay en el estado
  const categorias = [...new Set(juegos.map((j) => j.categoria))]

  const juegosFiltrados = categoria === 'Todos'
    ? juegos
    : juegos.filter((j) => j.categoria === categoria)

  return (
    <>
      <Navbar totalJuegos={juegos.length} />

      <main>
        <Portada />

        <section id="catalogo" className="py-5">
          <div className="container">
            <div className="encabezado-catalogo mb-4">
              <h2 className="mb-0">Catálogo</h2>
              <p className="text-muted mb-0">
                {juegosFiltrados.length} {juegosFiltrados.length === 1 ? 'juego' : 'juegos'}
              </p>
            </div>

            <FiltroCategorias
              categorias={categorias}
              categoriaActual={categoria}
              cambiarCategoria={setCategoria}
            />

            <ListaJuegos
              juegos={juegosFiltrados}
              cargando={cargando}
              error={error}
              eliminar={eliminarJuego}
            />
          </div>
        </section>

        <section id="administrar" className="py-5 border-top">
          <div className="container">
            <FormularioJuego categorias={categorias} agregar={agregarJuego} />
          </div>
        </section>

        <section id="contacto" className="py-5 bg-light">
          <div className="container">
            <FormularioContacto />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
