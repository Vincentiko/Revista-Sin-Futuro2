import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'
import { RevistaApp } from './RevistaApp'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RevistaApp />
  </StrictMode>,
)
