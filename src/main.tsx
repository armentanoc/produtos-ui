import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Apresentacao } from './apresentacao/Apresentacao'
import { Catalogo } from './Catalogo'
import './estilos.css'

function App() {
  const [tela, setTela] = useState<'catalogo' | 'apresentacao'>('catalogo')

  return (
    <>
      <div className={tela === 'catalogo' ? undefined : 'oculto'}>
        <Catalogo aoAbrirApresentacao={() => setTela('apresentacao')} />
      </div>
      {tela === 'apresentacao' && <Apresentacao aoVoltar={() => setTela('catalogo')} />}
    </>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
