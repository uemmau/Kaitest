import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">PUMAKAWA</span>
          <span className="footer-tagline">Red de Protección del Puma · Argentina</span>
        </div>

        <div className="footer-links">
          <a href="#inicio">Inicio</a>
          <a href="#como">Cómo funciona</a>
          <a href="#denuncia">Hacer denuncia</a>
          <a href="mailto:contacto@pumakawa.org">Contacto</a>
        </div>

        <div className="footer-note">
          Las denuncias son recibidas por guardaparques certificados y organismos de conservación oficial.
          En caso de emergencia inmediata llamá al <strong>0800-555-FAUNA</strong>.
        </div>

        <div className="footer-divider" />
        <p className="footer-copy">
          © {new Date().getFullYear()} Pumakawa · Todos los derechos reservados ·{' '}
          <a href="#inicio">Política de privacidad</a>
        </p>
      </div>
    </footer>
  )
}
