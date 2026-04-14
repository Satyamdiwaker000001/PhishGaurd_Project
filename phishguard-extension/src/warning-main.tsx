import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import WarningPage from './warning/WarningPage'

ReactDOM.createRoot(document.getElementById('warning-root')!).render(
  <React.StrictMode>
    <WarningPage />
  </React.StrictMode>,
)
