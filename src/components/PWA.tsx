import Changelog from 'components/Changelog'
import React, { useEffect } from 'react'
import * as serviceWorker from 'serviceWorker'
import Popup from './Popup'
import { Text, Title } from './Title'

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
      <Text>Do you want to load it now ?</Text>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <Text m="1">
        If there is Breaking changes, you might take caution and make an export before loading it 😉
      </Text>
      <hr />
      <Title>Changelog</Title>
      <Changelog onlyUnseen />
    </Popup>
  )
}
