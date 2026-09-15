import { useOverlay } from '../../features/ui/overlay-context'
import { WhatsAppIcon } from '../ui/Icons'

export function WhatsAppButton() {
  const { showInfo } = useOverlay()

  return (
    <button
      className="whatsapp"
      type="button"
      data-component="WhatsAppButton"
      aria-label="Hubungi Rahmawati melalui WhatsApp"
      data-info="contact"
      onClick={() => showInfo('contact')}
    >
      <WhatsAppIcon />
    </button>
  )
}
