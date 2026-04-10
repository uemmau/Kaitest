import './HowItWorks.css'

const STEPS = [
  {
    number: '01',
    icon: '📸',
    title: 'Fotografiá al animal',
    desc: 'Mantené distancia segura. Capturá la imagen con tu celular asegurandote de que se vea claramente la situación del puma.',
  },
  {
    number: '02',
    icon: '📋',
    title: 'Completá el formulario',
    desc: 'Seleccioná el tipo de situación (mascotismo, atropellado, en riesgo), agregá tu ubicación y subí la foto.',
  },
  {
    number: '03',
    icon: '🚨',
    title: 'El equipo actúa',
    desc: 'Tu reporte llega en tiempo real a guardaparques y organismos de conservación. Te informaremos del resultado.',
  },
]

const TYPES = [
  {
    icon: '🏠',
    label: 'Mascotismo',
    color: '#E8630A',
    desc: 'Puma en cautiverio ilegal como animal doméstico.',
  },
  {
    icon: '🚗',
    label: 'Atropellado',
    color: '#D94040',
    desc: 'Animal herido o muerto por accidente vial.',
  },
  {
    icon: '⚠️',
    label: 'En riesgo',
    color: '#F5A623',
    desc: 'Animal en situación de peligro inminente.',
  },
]

export default function HowItWorks() {
  return (
    <section className="how" id="como">
      <div className="how-inner">
        <div className="section-head">
          <span className="section-tag">PROCESO DE DENUNCIA</span>
          <h2 className="section-title">Tres pasos para <em>salvar una vida</em></h2>
        </div>

        <div className="steps-grid">
          {STEPS.map(step => (
            <div className="step-card" key={step.number}>
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="section-head" style={{ marginTop: '5rem' }}>
          <span className="section-tag">TIPOS DE SITUACIÓN</span>
          <h2 className="section-title">¿Qué situación observás?</h2>
        </div>

        <div className="types-grid">
          {TYPES.map(type => (
            <div className="type-card" key={type.label} style={{ '--accent': type.color }}>
              <span className="type-icon">{type.icon}</span>
              <h3>{type.label}</h3>
              <p>{type.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
