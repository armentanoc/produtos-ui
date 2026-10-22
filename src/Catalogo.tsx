import { useEffect, useState, type MouseEvent } from 'react'
import { buscarConfiguracao, buscarProdutos, enderecoDaApi } from './api'
import type { Produto } from './tipos'

const tituloPadrao = 'Cat\u00e1logo de Produtos'
const subtituloPadrao = 'PrograMaria e Grupo Botic\u00e1rio'

export function Catalogo({ aoAbrirApresentacao }: { aoAbrirApresentacao: () => void }) {
  const [titulo, setTitulo] = useState(tituloPadrao)
  const [subtitulo, setSubtitulo] = useState(subtituloPadrao)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [aberto, setAberto] = useState<Produto | null>(null)

  useEffect(() => {
    document.title = titulo
  }, [titulo])

  useEffect(() => {
    let ativo = true

    Promise.all([
      buscarConfiguracao().catch(() => null),
      buscarProdutos(),
    ])
      .then(([configuracao, lista]) => {
        if (!ativo) return
        if (configuracao?.titulo) setTitulo(configuracao.titulo)
        if (configuracao?.subtitulo) setSubtitulo(configuracao.subtitulo)
        setProdutos(lista)
      })
      .catch(() => {
        if (!ativo) return
        setErro(`N\u00e3o consegui carregar os produtos. Confira se a API est\u00e1 no ar em ${enderecoDaApi()}.`)
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  useEffect(() => {
    if (!aberto) return
    const fechar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setAberto(null)
    }
    window.addEventListener('keydown', fechar)
    return () => window.removeEventListener('keydown', fechar)
  }, [aberto])

  return (
    <>
      <p className="alerta" role="note">
        Esta aplicação é somente ilustrativa e voltada para o aprendizado.<br /> Ela não reflete ofertas nem a possibilidade de compra de produtos reais do Grupo Boticário.
      </p>  

      <header className="topo">
        <p className="faixa">{subtitulo}</p>
        <div className="barra">
          <Marca /> 
          <div>
            <p className="selo">{'Cat\u00e1logo'}</p>
            <h1>{titulo}</h1>
          </div>
        </div>
      </header>

      <main className="vitrine">
        {carregando && <p className="aviso">{'Carregando o cat\u00e1logo\u2026'}</p>}
        {erro && <p className="aviso erro" role="alert">{erro}</p>}
        {!carregando && !erro && produtos.length === 0 && (
          <p className="aviso">{'Nenhum produto ativo no cat\u00e1logo.'}</p>
        )}
        {!carregando && !erro && produtos.length > 0 && (
          <>
            <p className="contagem">{produtos.length} {produtos.length === 1 ? 'produto' : 'produtos'}</p>
            <section className="grade" aria-label="Produtos">
              {produtos.map(produto => (
                <Cartao key={produto.id} produto={produto} aoAbrir={setAberto} />
              ))}
            </section>
          </>
        )}
      </main>

      <footer className="rodape">
        <div className="rodape-miolo">
          <p className="autora">Carolina Armentano</p>
          <button type="button" className="apresentacao" onClick={aoAbrirApresentacao}>{"Apresenta\u00e7\u00e3o"}</button>
          <nav className="redes" aria-label="Redes">
            <a href="https://github.com/armentanoc" target="_blank" rel="noreferrer" aria-label="GitHub de Carolina Armentano">
              <IconeGitHub />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/armentanocarolina/" target="_blank" rel="noreferrer" aria-label="LinkedIn de Carolina Armentano">
              <IconeLinkedIn />
              LinkedIn
            </a>
          </nav>
          <p className="ano">2026</p>
        </div>
      </footer>

      {aberto && <Painel produto={aberto} aoFechar={() => setAberto(null)} />}
    </>
  )
}

function Cartao({ produto, aoAbrir }: { produto: Produto; aoAbrir: (produto: Produto) => void }) {
  const [indice, setIndice] = useState(0)
  const total = produto.imagens.length
  const atual = produto.imagens[indice]

  function mudar(evento: MouseEvent<HTMLButtonElement>, passo: number) {
    evento.stopPropagation()
    setIndice(valor => (valor + passo + total) % total)
  }

  return (
    <article className="cartao">
      <div className="moldura">
        <Foto key={atual?.url ?? "sem"} url={atual?.url} nome={produto.nome} />
        {total > 1 && (
          <div className="setas">
            <button type="button" onClick={evento => mudar(evento, -1)} aria-label="Foto anterior">{'\u2039'}</button>
            <button type="button" onClick={evento => mudar(evento, 1)} aria-label="Pr\u00f3xima foto">{'\u203a'}</button>
          </div>
        )}
      </div>
      <div className="texto">
        <h2>{produto.nome}</h2>
        <p>{produto.descricao}</p>
        <button type="button" className="detalhes" onClick={() => aoAbrir(produto)}>
          Ver detalhes
        </button>
      </div>
    </article>
  )
}

function Painel({ produto, aoFechar }: { produto: Produto; aoFechar: () => void }) {
  const [indice, setIndice] = useState(0)
  const atual = produto.imagens[indice]

  return (
    <div className="cortina" onClick={aoFechar}>
      <article
        className="painel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-produto"
        onClick={evento => evento.stopPropagation()}
      >
        <button type="button" className="fechar" onClick={aoFechar} aria-label="Fechar">{'\u00d7'}</button>
        <div className="painel-foto">
          <div className="moldura grande">
            <Foto key={atual?.url ?? "sem"} url={atual?.url} nome={produto.nome} />
          </div>
          {produto.imagens.length > 1 && (
            <div className="miniaturas">
              {produto.imagens.map((imagem, posicao) => (
                <button
                  key={imagem.id}
                  type="button"
                  className={posicao === indice ? 'mini ativa' : 'mini'}
                  onClick={() => setIndice(posicao)}
                  aria-label={`Foto ${posicao + 1} de ${produto.nome}`}
                >
                  <Foto url={imagem.url} nome="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="painel-texto">
          <p className="selo">Produto</p>
          <h2 id="titulo-produto">{produto.nome}</h2>
          <p className="descricao">{produto.descricao}</p>
        </div>
      </article>
    </div>
  )
}

function Foto({ url, nome }: { url?: string; nome: string }) {
  const [falhou, setFalhou] = useState(false)
  if (!url || falhou) return <div className="sem-foto">Sem foto</div>
  return (
    <img
      src={url}
      alt={nome}
      referrerPolicy="no-referrer"
      onError={() => setFalhou(true)}
    />
  )
}

function IconeGitHub() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function IconeLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  )
}

function Marca() {
  return (
    <svg className="marca" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="6" fill="#0f6b45" />
      <circle cx="24" cy="10" r="7" fill="#1f8a55" />
      <circle cx="24" cy="38" r="7" fill="#1f8a55" />
      <circle cx="10" cy="24" r="7" fill="#176b40" />
      <circle cx="38" cy="24" r="7" fill="#176b40" />
    </svg>
  )
}
