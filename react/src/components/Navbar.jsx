import { useState } from 'react'

function Navbar({ totalJuegos }) {
  const [abierto, setAbierto] = useState(false)

  const enlaces = [
    { href: '#inicio', texto: 'Inicio' },
    { href: '#catalogo', texto: 'Catálogo' },
    { href: '#administrar', texto: 'Agregar juego' },
    { href: '#contacto', texto: 'Contacto' },
  ]

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#inicio">
            Pixel Vault <span className="badge text-bg-warning ms-1">{totalJuegos}</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menu"
            aria-expanded={abierto}
            aria-label="Abrir menú"
            onClick={() => setAbierto(!abierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* en celular el menú se abre y cierra con el estado */}
          <div className={'collapse navbar-collapse' + (abierto ? ' show' : '')} id="menu">
            <ul className="navbar-nav ms-auto">
              {enlaces.map((enlace) => (
                <li className="nav-item" key={enlace.href}>
                  <a className="nav-link" href={enlace.href} onClick={() => setAbierto(false)}>
                    {enlace.texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
