import React, { useEffect } from 'react'
import * as serviceWorker from 'serviceWorker'
import Popup from './Popup'

export default function PWA () {
  const [showReload, setShowReload] = React.useState(false)
  const [
    waitingWorker,
    setWaitingWorker,
  ] = React.useState<ServiceWorker | null>()

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true)
    setWaitingWorker(registration.waiting)
  }

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate })
  }, [])

  const reloadPage = () => {
    if (!waitingWorker) return
    waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    setShowReload(false)
    window.location.reload(true)
  }

  if (!showReload) return null

  return (
    <Popup
      title="An update of OPTC Box Manager is available !"
      onValidate={reloadPage}
      onCancel={() => setShowReload(false)}
    >
      Do you want to load it now ?<br />
    </Popup>
  )
}
