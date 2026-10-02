'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { guardarVentaServicio, type ResultadoGuardar } from './actions'
import { ESTADOS_SERVICIO, METODOS_PAGO, MONEDAS, type VentaServicio } from '@/lib/ventasServiciosTipos'

const ETIQUETA_METODO: Record<string, string> = {
  transferencia: 'Transferencia',
  paypal: 'PayPal',
  mercadopago: 'Mercado Pago',
  efectivo: 'Efectivo',
  otro: 'Otro',
}

const ETIQUETA_ESTADO: Record<string, string> = {
  pendiente: 'Pendiente de cobro',
  pagado: 'Pagado',
  cancelado: 'Cancelado',
}

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function BotonGuardar() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="adm-btn adm-btn-primario" disabled={pending}>
      {pending ? 'Guardando…' : 'Guardar'}
    </button>
  )
}

export default function VentaServicioForm({ venta }: { venta?: VentaServicio }) {
  const [estado, accion] = useActionState<ResultadoGuardar | null, FormData>(guardarVentaServicio, null)

  return (
    <form action={accion} className="adm-form">
      {venta && <input type="hidden" name="id" value={venta.id} />}
      {estado && !estado.ok && <p className="contact-error">{estado.motivo}</p>}

      <div className="adm-field-row">
        <div className="adm-field">
          <label htmlFor="cliente">Cliente</label>
          <input id="cliente" name="cliente" className="contact-input" defaultValue={venta?.cliente} required />
        </div>
        <div className="adm-field">
          <label htmlFor="vendedor">Vendedor</label>
          <input id="vendedor" name="vendedor" className="contact-input" defaultValue={venta?.vendedor} required />
        </div>
      </div>

      <div className="adm-field">
        <label htmlFor="servicio">Servicio / paquete</label>
        <input
          id="servicio"
          name="servicio"
          className="contact-input"
          defaultValue={venta?.servicio}
          placeholder="Ej. Te Ven — sitio web"
          required
        />
      </div>

      <div className="adm-field-row">
        <div className="adm-field">
          <label htmlFor="importe">Importe</label>
          <input
            id="importe"
            name="importe"
            type="number"
            min="0.01"
            step="0.01"
            className="contact-input"
            defaultValue={venta ? (venta.importe_cents / 100).toFixed(2) : ''}
            required
          />
        </div>
        <div className="adm-field">
          <label htmlFor="moneda">Moneda</label>
          <select id="moneda" name="moneda" className="contact-input" defaultValue={venta?.moneda ?? 'USD'}>
            {MONEDAS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="adm-field-row">
        <div className="adm-field">
          <label htmlFor="metodo_pago">Método de pago</label>
          <select
            id="metodo_pago"
            name="metodo_pago"
            className="contact-input"
            defaultValue={venta?.metodo_pago ?? 'transferencia'}
          >
            {METODOS_PAGO.map((m) => (
              <option key={m} value={m}>
                {ETIQUETA_METODO[m]}
              </option>
            ))}
          </select>
        </div>
        <div className="adm-field">
          <label htmlFor="estado_venta">Estado</label>
          <select id="estado_venta" name="estado" className="contact-input" defaultValue={venta?.estado ?? 'pendiente'}>
            {ESTADOS_SERVICIO.map((e) => (
              <option key={e} value={e}>
                {ETIQUETA_ESTADO[e]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="adm-field">
        <label htmlFor="fecha_venta">Fecha</label>
        <input
          id="fecha_venta"
          name="fecha_venta"
          type="date"
          className="contact-input"
          defaultValue={venta?.fecha_venta ?? hoyISO()}
          required
        />
      </div>

      <div className="adm-field">
        <label htmlFor="notas">Notas (opcional)</label>
        <textarea id="notas" name="notas" className="contact-input" rows={3} defaultValue={venta?.notas ?? ''} />
      </div>

      <div>
        <BotonGuardar />
      </div>
    </form>
  )
}
