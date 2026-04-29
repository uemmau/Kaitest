import { useState, useRef } from 'react'
import './ReportForm.css'

const SITUATION_TYPES = [
  { value: 'mascotismo', label: '🏠 Mascotismo',   desc: 'Tenencia ilegal como mascota' },
  { value: 'atropellado', label: '🚗 Atropellado', desc: 'Herido o muerto en ruta' },
  { value: 'riesgo',      label: '⚠️ En riesgo',   desc: 'Situación de peligro' },
]

const PROVINCES = [
  'Buenos Aires','Catamarca','Chaco','Chubut','Córdoba','Corrientes',
  'Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza',
  'Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis',
  'Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán',
]

export default function ReportForm() {
  const [form, setForm] = useState({
    tipo: '',
    nombre: '',
    email: '',
    telefono: '',
    provincia: '',
    localidad: '',
    descripcion: '',
  })
  const [photo, setPhoto]         = useState(null)
  const [preview, setPreview]     = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [errors, setErrors]       = useState({})
  const fileRef = useRef()
  const cameraRef = useRef()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handlePhoto = e => {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
    if (errors.photo) setErrors(er => ({ ...er, photo: '' }))
  }

  const handleDrop = e => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setPhoto(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const validate = () => {
    const errs = {}
    if (!form.tipo)       errs.tipo      = 'Seleccioná el tipo de situación'
    if (!form.nombre)     errs.nombre    = 'Ingresá tu nombre'
    if (!form.email)      errs.email     = 'Ingresá tu email'
    if (!form.provincia)  errs.provincia = 'Seleccioná la provincia'
    if (!form.localidad)  errs.localidad = 'Ingresá la localidad'
    if (!photo)           errs.photo     = 'Subí una foto del animal'
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setSubmitted(true)
  }

  const reset = () => {
    setForm({ tipo:'', nombre:'', email:'', telefono:'', provincia:'', localidad:'', descripcion:'' })
    setPhoto(null); setPreview(null); setSubmitted(false); setErrors({})
  }

  if (submitted) {
    return (
      <section className="report-section" id="denuncia">
        <div className="success-screen">
          <div className="success-icon">✅</div>
          <h2>¡DENUNCIA ENVIADA!</h2>
          <p>
            Tu reporte fue recibido. El equipo de conservación de Pumakawa lo revisará
            en las próximas horas y tomará acción inmediata.
          </p>
          <p className="success-sub">
            Recibirás una confirmación en <strong>{form.email}</strong>
          </p>
          <button className="btn-reset" onClick={reset}>Hacer otra denuncia</button>
        </div>
      </section>
    )
  }

  return (
    <section className="report-section" id="denuncia">
      <div className="report-inner">
        <div className="section-head">
          <span className="section-tag">FORMULARIO DE DENUNCIA</span>
          <h2 className="section-title">Reportar situación de puma</h2>
          <p className="section-sub">
            Todos los campos marcados con <span className="req-mark">*</span> son obligatorios.
            Tu información es confidencial.
          </p>
        </div>

        <form className="report-form" onSubmit={handleSubmit} noValidate>

          {/* TIPO */}
          <div className="form-group">
            <label className="form-label">
              Tipo de situación <span className="req-mark">*</span>
            </label>
            <div className="tipo-grid">
              {SITUATION_TYPES.map(opt => (
                <label
                  key={opt.value}
                  className={`tipo-option ${form.tipo === opt.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="tipo"
                    value={opt.value}
                    checked={form.tipo === opt.value}
                    onChange={handleChange}
                  />
                  <span className="tipo-label">{opt.label}</span>
                  <span className="tipo-desc">{opt.desc}</span>
                </label>
              ))}
            </div>
            {errors.tipo && <span className="form-error">{errors.tipo}</span>}
          </div>

          {/* FOTO */}
          <div className="form-group">
            <label className="form-label">
              Foto del animal <span className="req-mark">*</span>
            </label>
            <div
              className={`upload-zone ${preview ? 'has-preview' : ''} ${errors.photo ? 'upload-error' : ''}`}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
            >
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="photo-preview" />
                  <div className="upload-overlay">
                    <button type="button" className="overlay-btn" onClick={() => fileRef.current.click()}>
                      📷 Cambiar
                    </button>
                    <button type="button" className="overlay-btn remove" onClick={() => { setPhoto(null); setPreview(null); }}>
                      🗑️ Quitar
                    </button>
                  </div>
                </>
              ) : (
                <div className="upload-placeholder">
                  <div className="photo-options">
                    <div 
                      className="photo-option-card" 
                      onClick={() => fileRef.current.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && fileRef.current.click()}
                    >
                      <span className="photo-option-icon">📁</span>
                      <strong>Cargar foto</strong>
                      <span>Desde tu galería</span>
                    </div>

                    <div 
                      className="photo-option-card highlight" 
                      onClick={() => cameraRef.current.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && cameraRef.current.click()}
                    >
                      <span className="photo-option-icon">📸</span>
                      <strong>Sacar foto</strong>
                      <span>Usar cámara</span>
                    </div>
                  </div>
                  <span className="upload-hint">JPG, PNG, WEBP · máx. 100 MB</span>
                </div>
              )}
              
              {/* Hidden inputs */}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                style={{ display: 'none' }}
                id="photo-upload"
              />
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhoto}
                style={{ display: 'none' }}
                id="photo-camera"
              />
            </div>
            {errors.photo && <span className="form-error">{errors.photo}</span>}
          </div>

          {/* DATOS PERSONALES */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="nombre">
                Nombre completo <span className="req-mark">*</span>
              </label>
              <input
                id="nombre"
                className={`form-input ${errors.nombre ? 'input-error' : ''}`}
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre y apellido"
              />
              {errors.nombre && <span className="form-error">{errors.nombre}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email <span className="req-mark">*</span>
              </label>
              <input
                id="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="telefono">
                Teléfono <span className="form-optional">(opcional)</span>
              </label>
              <input
                id="telefono"
                className="form-input"
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+54 11 ..."
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="provincia">
                Provincia <span className="req-mark">*</span>
              </label>
              <select
                id="provincia"
                className={`form-input form-select ${errors.provincia ? 'input-error' : ''}`}
                name="provincia"
                value={form.provincia}
                onChange={handleChange}
              >
                <option value="">Seleccioná...</option>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.provincia && <span className="form-error">{errors.provincia}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="localidad">
              Localidad / Dirección <span className="req-mark">*</span>
            </label>
            <input
              id="localidad"
              className={`form-input ${errors.localidad ? 'input-error' : ''}`}
              type="text"
              name="localidad"
              value={form.localidad}
              onChange={handleChange}
              placeholder="Ej: Ruta 40 km 23, cerca de Malargüe"
            />
            {errors.localidad && <span className="form-error">{errors.localidad}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="descripcion">
              Descripción de la situación <span className="form-optional">(opcional)</span>
            </label>
            <textarea
              id="descripcion"
              className="form-input form-textarea"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Describí lo que observaste: estado del animal, comportamiento, cantidad de personas involucradas, etc."
            />
          </div>

          <div className="form-disclaimer">
            🔒 Tu información personal es confidencial y sólo será utilizada para gestionar la denuncia.
          </div>

          <button
            type="submit"
            id="submit-report-btn"
            className={`btn-submit ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading
              ? <><span className="spinner" />Enviando denuncia...</>
              : '🚨 Enviar denuncia ahora'}
          </button>
        </form>
      </div>
    </section>
  )
}
