import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthForm from './components/AuthForm.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthForm />
  </StrictMode>,
)
