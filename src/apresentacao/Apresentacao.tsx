import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'

type Slide = {
  selo: string
  titulo: string
  capa?: boolean
  compacto?: boolean
  poster?: boolean
  tempo: string
  notas: string[]
  corpo: ReactNode
}

type StatusHttp = {
  codigo: number
  grupo: string
  texto: string
}

const statusHttp: StatusHttp[] = [
  { codigo: 200, grupo: 'Success', texto: 'O raro momento em que tudo funciona.' },
  { codigo: 201, grupo: 'Success', texto: 'Criado. E voc\u00ea jurando que n\u00e3o ia dar certo.' },
  { codigo: 204, grupo: 'Success', texto: 'OK, mas sem resposta... tipo ghosting.' },
  { codigo: 301, grupo: 'Redirect', texto: 'Mudou de endere\u00e7o, mas te avisa.' },
  { codigo: 302, grupo: 'Redirect', texto: 'Mudou temporariamente (vida de n\u00f4made).' },
  { codigo: 400, grupo: 'Client Error', texto: 'A culpa \u00e9 do usu\u00e1rio. Sempre.' },
  { codigo: 401, grupo: 'Client Error', texto: 'Sem credencial, sem entrada.' },
  { codigo: 403, grupo: 'Client Error', texto: 'Mesmo com permiss\u00e3o, n\u00e3o entra.' },
  { codigo: 404, grupo: 'Client Error', texto: 'O cl\u00e1ssico: s\u00f3 existe em produ\u00e7\u00e3o.' },
  { codigo: 500, grupo: 'Server Error', texto: 'Hora de culpar a infra.' },
  { codigo: 501, grupo: 'Server Error', texto: '\u201cAinda n\u00e3o implementado\u201d (e talvez nunca seja).' },
  { codigo: 502, grupo: 'Server Error', texto: 'O servidor surtou, tente mais tarde.' },
  { codigo: 503, grupo: 'Server Error', texto: 'O servi\u00e7o decidiu tirar f\u00e9rias.' },
  { codigo: 504, grupo: 'Server Error', texto: 'O servidor est\u00e1 te ignorando.' },
]

function MastheadPoster() {
  return (
    <header className="poster-masthead">
      <br></br>
      <br></br>
      <p className="poster-http">HTTP Status Code</p>
      <p className="poster-tagline">{'(para pessoas desenvolvedoras de verdade)'}</p>
      <br></br>
      <br></br>
      <br></br>
    </header>
  )
}

function ListaPoster({ itens, comCabecalho }: { itens: StatusHttp[]; comCabecalho?: boolean }) {
  return (
    <div className="poster-conteudo">
      {comCabecalho && <MastheadPoster />}
      <div className="poster-lista">
        {itens.map(item => (
          <p key={item.codigo} className="poster-linha">
            <span className="poster-meta">({item.codigo}) {item.grupo}</span>
            {' '}
            {item.texto}
          </p>
        ))}
      </div>
    </div>
  )
}

const faixa = 'PrograMaria e Grupo Botic\u00e1rio'

const slides: Slide[] = [
  {
    selo: 'Cat\u00e1logo',
    titulo: 'Como os sistemas conversam?',
    capa: true,
    tempo: 'Setas para avan\u00e7ar',
    notas: [
      'At\u00e9 1 minuto. Ideias, status HTTP, depois a demo.',
      'N mostra estas notas. Esc volta ao cat\u00e1logo.',
    ],
    corpo: (
      <>
        <p className="sub">{'O que voc\u00ea precisa saber sobre APIs no come\u00e7o da transi\u00e7\u00e3o de carreira'}</p>
        <div className="apresentadora">
          <img src="/profile-square.png" alt="Carolina Armentano" />
          <div>
            <p className="apresentadora-nome">Carolina Armentano</p>
            <p className="apresentadora-cargo">Pessoa Desenvolvedora Sênior</p>
            <p className="apresentadora-cargo">no Grupo Boticário</p>
          </div>
        </div>
      </>
    ),
  },
  {
    selo: 'Apresenta\u00e7\u00e3o',
    titulo: 'A transi\u00e7\u00e3o come\u00e7a numa conversa',
    tempo: '2 min',
    notas: [
      'Conte a sua hist\u00f3ria em um minuto. N\u00e3o leia o slide.',
      'Feche assim: o resto desta meia hora \u00e9 um pedido de perfume.',
    ],
    corpo: (
      <ul>
        <li>{'Voc\u00ea n\u00e3o precisa decorar sigla.'}</li>
        <li>{'No GB, a tela quase nunca \u00e9 o sistema inteiro.'}</li>
        <li>{'Hoje a conversa \u00e9 um pedido de perfume.'}</li>
      </ul>
    ),
  },
  {
    selo: 'Como os sistemas se falam',
    titulo: 'Cliente pede. Servidor responde.',
    tempo: '2 min',
    notas: [
      'S\u00edncrono \u00e9 o balc\u00e3o: pede o perfume e espera o tem ou o n\u00e3o tem.',
      'Ass\u00edncrono \u00e9 deixar o recado e seguir. Uma frase. Sem desenhar fila.',
    ],
    corpo: (
      <div className="par">
        <article>
          <h3>{'S\u00edncrono'}</h3>
          <p>{'Pede e espera a resposta. \u00c9 um telefonema. A demo \u00e9 assim.'}</p>
        </article>
        <article>
          <h3>{'Ass\u00edncrono'}</h3>
          <p>{'Manda o recado e segue. Fila ou evento. Aqui a gente n\u00e3o vai falar sobre isso.'}</p>
        </article>
      </div>
    ),
  },
  {
    selo: 'O que \u00e9 uma API',
    titulo: 'O contrato da conversa',
    tempo: '3 min',
    notas: [
      'API \u00e9 o combinado: verbo, caminho, corpo e resposta.',
      'O JSON \u00e9 o produto da demo: id, nome, descri\u00e7\u00e3o, ativo e imagem. A resposta real tamb\u00e9m traz as datas.',
      'Se perguntarem PATCH: esta API atualiza com PUT.',
    ],
    corpo: (
      <>
        <div className="verbos">
          <span><b>GET</b> {'l\u00ea'}</span>
          <span><b>POST</b> cria</span>
          <span><b>PUT</b> atualiza</span>
          <span><b>PATCH</b> atualiza parte</span>
          <span><b>DELETE</b> apaga</span>
        </div>
        <pre>{`{
  "id": 1,
  "nome": "Lily Eau de Parfum 75ml",
  "descricao": "Eau de parfum floral da linha Lily.",
  "estaAtivo": true,
  "imagens": [
    { "id": 1, "produtoId": 1, "url": "https://cdn.gbmedia.com.br/lily.jpg" }
  ]
}`}</pre>
        <p className="fecha">JSON de GET /api/produtos/1. O Swagger mostra o resto.</p>
      </>
    ),
  },
  {
    selo: 'IA no entendimento e no teste',
    titulo: 'A IA explica. Voc\u00ea confere.',
    tempo: '2 min',
    notas: [
      'Portugu\u00eas s\u00f3 se o ingl\u00eas do contrato travar algu\u00e9m.',
      'A instru\u00e7\u00e3o cita verbo, caminho e um campo. O status confirma.',
      'Senha, token e dado de cliente ficam fora do chat.',
    ],
    corpo: (
      <ul>
        <li>{'Portugu\u00eas, se o ingl\u00eas for obst\u00e1culo.'}</li>
        <li>{'Pe\u00e7a o passo, com detalhe.'}</li>
        <li>{'Um campo por vez.'}</li>
        <li>{'Leia o status antes do texto.'}</li>
        <li>{'Sem senha, token ou dado de cliente.'}</li>
      </ul>
    ),
  },
  {
    selo: '',
    titulo: 'HTTP Status Code',
    poster: true,
    compacto: true,
    tempo: '2 min',
    notas: [
      'O n\u00famero vem antes do JSON. Tom humor\u00edstico para fixar, n\u00e3o para decorar.',
      '200 \u00e9 o cat\u00e1logo carregado. 401 \u00e9 GET /api/produtos sem token.',
      '404 na demo costuma ser caminho errado. 500 \u00e9 API fora ou bug no servidor.',
      'Na vitrine, falha de rede tamb\u00e9m parece \u201cAPI fora\u201d \u2014 confira localhost:5080.',
    ],
    corpo: (
      <>
        <ListaPoster itens={statusHttp} comCabecalho />
        <p className="poster-dica">{'Dica: Leia os logs!'}</p>
      </>
    ),
  },
  {
    selo: 'Caso pr\u00e1tico',
    titulo: 'Um pedido de perfumaria',
    tempo: 'demo, 15 min',
    notas: [
      'GET /api/saude. Aberto. 200. JSON pequeno. S\u00edncrono.',
      'GET /api/produtos sem token. 401. Autoriza\u00e7\u00e3o.',
      'POST /api/autenticacao. admin / admin@123. Autentica\u00e7\u00e3o. No Swagger, cole o token no Authorize, sem a palavra Bearer.',
      'GET /api/produtos com token. Na vitrine, o c\u00f3digo faz isso sozinho (aba Rede). Aponte o Lily.',
      'POST de um perfume curto. 201. O verbo criou. Se sobrar tempo, PUT ou DELETE.',
    ],
    corpo: (
      <>
        <ol className="passos">
          <li><em>01</em> {'Autentica\u00e7\u00e3o: POST /api/autenticacao diz quem \u00e9 o cliente.'}</li>
          <li><em>02</em> {'Autoriza\u00e7\u00e3o: GET /api/produtos leva o token no cabe\u00e7alho.'}</li>
          <li><em>03</em> {'Sem token, a lista responde 401.'}</li>
        </ol>
        <p className="agora">Agora a gente faz essa conversa.</p>
      </>
    ),
  },
]

export function Apresentacao({ aoVoltar }: { aoVoltar: () => void }) {
  const [indice, setIndice] = useState(0)
  const [notasAbertas, setNotasAbertas] = useState(false)
  const slide = slides[indice]

  useEffect(() => {
    const tituloAnterior = document.title
    const overflowAnterior = document.body.style.overflow
    document.title = 'Como os sistemas conversam?'
    document.body.style.overflow = 'hidden'
    document.body.classList.add('em-apresentacao')
    return () => {
      document.title = tituloAnterior
      document.body.style.overflow = overflowAnterior
      document.body.classList.remove('em-apresentacao', 'com-notas')
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('com-notas', notasAbertas)
    const palco = document.querySelector<HTMLElement>('.palco')
    if (!palco) return

    const encaixar = () => {
      const reserva = notasAbertas ? 168 : 0
      const escala = Math.min(window.innerWidth / 1280, (window.innerHeight - reserva) / 720)
      palco.style.top = `${(window.innerHeight - reserva) / 2}px`
      palco.style.transform = `translate(-50%, -50%) scale(${escala})`
    }

    encaixar()
    window.addEventListener('resize', encaixar)
    return () => window.removeEventListener('resize', encaixar)
  }, [notasAbertas])

  useEffect(() => {
    const aoTeclar = (evento: KeyboardEvent) => {
      const emBotao = evento.target instanceof HTMLElement && evento.target.closest('button')
      if (evento.key === 'ArrowRight' || evento.key === 'PageDown' || (evento.key === ' ' && !emBotao)) {
        evento.preventDefault()
        setIndice(atual => Math.min(atual + 1, slides.length - 1))
      } else if (evento.key === 'ArrowLeft' || evento.key === 'PageUp') {
        evento.preventDefault()
        setIndice(atual => Math.max(atual - 1, 0))
      } else if (evento.key === 'Home') {
        setIndice(0)
      } else if (evento.key === 'End') {
        setIndice(slides.length - 1)
      } else if (evento.key === 'n' || evento.key === 'N') {
        setNotasAbertas(abertas => !abertas)
      } else if (evento.key === 'Escape') {
        aoVoltar()
      }
    }

    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aoVoltar])

  const aoClicar = (evento: MouseEvent<HTMLElement>) => {
    if ((evento.target as HTMLElement).closest('button, .notas')) return
    setIndice(atual => evento.clientX > window.innerWidth / 2
      ? Math.min(atual + 1, slides.length - 1)
      : Math.max(atual - 1, 0))
  }

  return (
    <>
    <div className="palco" onClick={aoClicar}>
      <section className="slide ativa" aria-label={slide.titulo}>
        <p className="faixa">{faixa}</p>
        <div className={[
          'miolo',
          slide.compacto ? 'miolo-compacto' : '',
          slide.poster ? 'miolo-poster' : '',
        ].filter(Boolean).join(' ')}>
          {!slide.poster && (slide.capa ? (
            <div className="cabeca">
              <Marca />
              <p className="selo">{slide.selo}</p>
            </div>
          ) : (
            <p className="selo">{slide.selo}</p>
          ))}
          {!slide.poster && (slide.capa ? <h1>{slide.titulo}</h1> : <h2>{slide.titulo}</h2>)}
          {slide.corpo}
        </div>
        <footer className="rodape">
          <button type="button" onClick={aoVoltar}>{'Voltar ao cat\u00e1logo'}</button>
          <span>{slide.capa ? slide.tempo : `${indice + 1} / ${slides.length}`}</span>
        </footer>
      </section>
    </div>
      <div className={notasAbertas ? 'notas ativa' : 'notas'}>
        {slide.notas.map(nota => <p key={nota}>{nota}</p>)}
        <p>{slide.tempo}</p>
      </div>
    </>
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
