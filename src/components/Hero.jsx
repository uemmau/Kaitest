import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Sistema activo de denuncias · 24/7
        </div>

        <h1 className="hero-title">
          <span className="text-sos">SOS</span>
          <span className="text-puma">PUMA</span>
        </h1>

        <p className="hero-sub">
          Fotografiaste un puma en mascotismo, atropellado o en situación de riesgo?
          <strong> Denuncialo ahora.</strong> Tu reporte llega directo a los equipos
          de rescate y conservación.
        </p>

        <div className="hero-buttons">
          <a href="#denuncia" className="btn-primary">
            📷 Subir foto y denunciar
          </a>
          <a href="#como" className="btn-ghost">
            ¿Cómo funciona?
          </a>
        </div>

        <div className="hero-stats">
          <div className="hstat">
            <span className="hstat-num">847</span>
            <span className="hstat-label">Denuncias recibidas</span>
          </div>
          <div className="hstat-divider" />
          <div className="hstat">
            <span className="hstat-num">312</span>
            <span className="hstat-label">Pumas rescatados</span>
          </div>
          <div className="hstat-divider" />
          <div className="hstat">
            <span className="hstat-num">19</span>
            <span className="hstat-label">Provincias cubiertas</span>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
