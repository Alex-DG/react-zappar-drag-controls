import { useState } from 'react'

import Scene from '../components/Scene'
import Button from '../components/Button'

import { ZapparPermissionRquest } from '../utils/zappar'

const App = () => {
  const [granted, setGranted] = useState(false)

  const handlePermission = () => ZapparPermissionRquest(setGranted)

  if (granted) return <Scene />

  return (
    <div className="app">
      <Button onClick={handlePermission}>Allow Camera</Button>

      <a
        href="https://www.zappar.com/"
        target="_blank"
        rel="noreferrer"
        className="link"
      >
        Zappar: Augmented, Virtual & Mixed Reality Solution
      </a>
    </div>
  )
}
export default App
