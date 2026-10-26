import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'

type Slide = {
  selo: string
  titulo: string
  capa?: boolean
  compacto?: boolean
  centralizado?: boolean
  tempo: string
  notas: string[]
  corpo: ReactNode
}

const faixa = 'PrograMaria e Grupo Botic\u00e1rio'

const slides: Slide[] = [
  {
    selo: 'APIs',
    titulo: 'Como os sistemas conversam?',
    capa: true,
    tempo: 'Setas para avan\u00e7ar',
    notas: [
      'Agrade\u00e7a ao PrograMaria pelo convite.',
      'Pergunte: quem aqui j\u00e1 usa IA no trabalho? E quem sente que o trabalho do time mudou de verdade?',
    ],
    corpo: (
      <>
        <p className="sub">{'O que voc\u00ea precisa saber sobre APIs no come\u00e7o da transi\u00e7\u00e3o de carreira'}</p>
        <div className="apresentadora">
          <img src="/profile-square.png" alt="Carolina Armentano" />
          <div>
            <p className="apresentadora-nome">Carolina Armentano</p>
            <p className="apresentadora-cargo">Pessoa Desenvolvedora Sênior</p>
            <p className="apresentadora-cargo">Venda Direta Backoffice · Grupo Boticário</p>
            <p className="apresentadora-canais">
              <a href="https://www.instagram.com/armentanocarolina/" target="_blank" rel="noreferrer">@armentanocarolina</a>
              {' \u00b7 '}
              <a href="https://github.com/armentanoc" target="_blank" rel="noreferrer">@armentanoc</a>
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    selo: 'Minha trajet\u00f3ria',
    titulo: 'Minhas transi\u00e7\u00f5es de carreira',
    compacto: true,
    centralizado: true,
    tempo: '2 min',
    notas: [
      'Conte a sua hist\u00f3ria sem ler o slide: de Direito e Neg\u00f3cios para Produto e Desenvolvimento.',
      'Apresente as mudan\u00e7as como caminhos poss\u00edveis, n\u00e3o como uma receita \u00fanica.',
    ],
    corpo: (
      <ol className="trajetoria">
        <li><span>01</span>Estagiária de Direito</li>
        <li><span>02</span>Advogada</li>
        <li><span>03</span>Analista de Negócios</li>
        <li><span>04</span>Gerente de Produto</li>
        <li><span>05</span>Estagiária de Desenvolvimento</li>
        <li><span>06</span>Desenvolvedora Backend</li>
      </ol>
    ),
  },
  {
    selo: 'Transi\u00e7\u00e3o de carreira',
    titulo: 'A transi\u00e7\u00e3o come\u00e7a numa conversa.',
    tempo: '3 min',
    notas: [
      'Reforce que a transi\u00e7\u00e3o come\u00e7a entendendo o que faz sentido para cada pessoa.',
      'Retome as respostas da abertura: a diferen\u00e7a entre usar IA e perceber uma mudan\u00e7a real no trabalho do time \u00e9 o tema de hoje.',
    ],
    corpo: (
      <ul className="ideias">
        <li>Entenda o que faz sentido para você.</li>
        <li>Existem muitos caminhos entre as coisas de que você gosta e o trabalho que quer fazer.</li>
        <li>A tela quase nunca é o sistema inteiro.</li>
      </ul>
    ),
  },
  {
    selo: 'Como os sistemas se falam',
    titulo: 'Cliente pede. Servidor responde.',
    tempo: '2 min',
    notas: [
      'S\u00edncrono \u00e9 pedir e esperar a resposta, como em um telefonema. A demonstra\u00e7\u00e3o funciona assim.',
      'Ass\u00edncrono \u00e9 mandar o recado e seguir; pode envolver fila ou evento. N\u00e3o vamos focar nisso hoje.',
    ],
    corpo: (
      <div className="par">
        <article>
          <h3>SÍNCRONO</h3>
          <p>Pede e espera a resposta. É um telefonema. A demonstração é assim.</p>
        </article>
        <article>
          <h3>ASSÍNCRONO</h3>
          <p>Manda o recado e segue. Pode ser fila ou evento; não vamos focar nisso hoje.</p>
        </article>
      </div>
    ),
  },
  {
    selo: 'Como falar com uma API',
    titulo: 'Verbo, caminho e dados da requisi\u00e7\u00e3o',
    compacto: true,
    centralizado: true,
    tempo: '4 min',
    notas: [
      'Explique os verbos HTTP e os lugares em que uma requisi\u00e7\u00e3o pode levar dados.',
      'Em dois minutos: SDD \u00e9 um modelo em que uma especifica\u00e7\u00e3o rica em contexto real (decis\u00f5es, regras de neg\u00f3cio e restri\u00e7\u00f5es) guia os agentes de IA.',
      'Passe rapidamente pelas etapas. Constitution, Specify e Clarify acontecem antes do c\u00f3digo: \u00e9 quando Produto, Design e Engenharia constroem juntos e decidem grande parte do resultado.',
    ],
    corpo: (
      <>
        <div className="verbos">
          <span><b>GET</b>Leia</span>
          <span><b>POST</b>Crie</span>
          <span><b>PUT</b>Atualize tudo</span>
          <span><b>PATCH*</b>Atualize em parte</span>
          <span><b>OPTIONS*</b>Me informe</span>
          <span><b>DELETE</b>Apague</span>
        </div>
        <p className="nota-metodos">* Em um sistema funcional, é comum encontrar GET, POST, PUT e DELETE.</p>
        <div className="anatomia">
          <h3>Onde vão os dados?</h3>
          <p><b>Corpo / Payload</b> Conteúdo da requisição</p>
          <p><b>Query parameter</b> Filtro na URL</p>
          <p><b>Path parameter</b> Parte do caminho</p>
          <p><b>Headers</b> Metadados, como autenticação</p>
        </div>
      </>
    ),
  },
  {
    selo: 'C\u00f3digos de resposta HTTP',
    titulo: 'E como a API fala comigo?',
    compacto: true,
    centralizado: true,
    tempo: '3 min',
    notas: [
      'Diga para ler os logs. Conte com calma os grupos e seus exemplos.',
      'No experimento com IA, a velocidade melhorou, mas o gargalo foi para a homologa\u00e7\u00e3o e a revis\u00e3o de c\u00f3digo ficou mais pesada.',
      'A percep\u00e7\u00e3o do time se inverteu: nos pilotos, houve mais clareza de produto e menos confian\u00e7a t\u00e9cnica; nos controles, o contr\u00e1rio.',
    ],
    corpo: (
      <div className="status-lista">
        <article><b>2xx</b><h3>Tudo certo!</h3><p>201 Criado · 200 OK</p></article>
        <article><b>3xx</b><h3>Alguma coisa mudou</h3><p>301 Redirecionado · 302 Movido temporariamente</p></article>
        <article><b>4xx</b><h3>Erro do seu lado</h3><p>400 Requisição ruim · 401 Não autorizado</p></article>
        <article><b>5xx</b><h3>Erro do meu lado</h3><p>501 Não implementado · 503 Serviço indisponível</p></article>
        <p className="dica-logs">Dica: Leia os logs!</p>
      </div>
    ),
  },
  {
    selo: 'IA e desenvolvimento',
    titulo: 'A IA explica. Voc\u00ea confere.',
    compacto: true,
    centralizado: true,
    tempo: '4 min',
    notas: [
      'Idioma: a constru\u00e7\u00e3o de software costuma ser padronizada em ingl\u00eas; a IA pode ajudar com a tradu\u00e7\u00e3o.',
      'Entendimento: ela pode ajudar a montar uma chamada completa ou entender uma resposta.',
      'Documenta\u00e7\u00e3o: use a IA como apoio para documentar chamadas, por exemplo no Swagger.',
      'Ambiente: alguns sistemas exigem ferramentas e depend\u00eancias instaladas na sua m\u00e1quina.',
      'Seguran\u00e7a: nunca envie senhas, tokens ou dados de clientes.',
      'A IA pode acelerar novas funcionalidades, testes e corre\u00e7\u00f5es. Seja honesta sobre limites e aprendizados: isso gera confian\u00e7a.',
      'Feche com a s\u00edntese do experimento: nenhum desses pontos anula o m\u00e9todo; o SDD mostra que a esteira inteira precisa evoluir junto.',
    ],
    corpo: (
      <>
        <div className="apoios-ia">
          <article><b>01</b><h3>Idioma</h3><p>O inglês é comum no código; a IA pode ajudar na tradução.</p></article>
          <article><b>02</b><h3>Entendimento</h3><p>Monte uma chamada e interprete a resposta.</p></article>
          <article><b>03</b><h3>Documentação</h3><p>Documente chamadas, por exemplo no Swagger.</p></article>
          <article><b>04</b><h3>Ambiente</h3><p>Prepare as ferramentas e dependências necessárias.</p></article>
          <article><b>05</b><h3>Segurança</h3><p>Nunca envie senhas, tokens ou dados de clientes.</p></article>
        </div>
        <p className="fecho-ia">Nenhum desses pontos anula o método: o SDD exige que a esteira inteira evolua junto.</p>
      </>
    ),
  },
  {
    selo: 'M\u00e3os \u00e0 obra',
    titulo: 'Vamos praticar?',
    tempo: 'Pr\u00e1tica',
    notas: [
      'Abra a aplica\u00e7\u00e3o e o Swagger da API.',
      'Reposit\u00f3rio da interface: https://github.com/armentanoc/produtos-ui',
      'Reposit\u00f3rio da API: https://github.com/armentanoc/produtos-api',
    ],
    corpo: (
      <div className="pratica">
        <a href="https://produtos-gb-programaria-ui.vercel.app/" target="_blank" rel="noreferrer">
          <span>Interface</span>produtos-gb-programaria-ui.vercel.app
        </a>
        <a href="https://github.com/armentanoc/produtos-ui" target="_blank" rel="noreferrer">
          <span>Código da interface</span>github.com/armentanoc/produtos-ui
        </a>
        <a href="https://produtos-gb-programaria-api.vercel.app/swagger" target="_blank" rel="noreferrer">
          <span>API · Swagger</span>produtos-gb-programaria-api.vercel.app/swagger
        </a>
        <a href="https://github.com/armentanoc/produtos-api" target="_blank" rel="noreferrer">
          <span>Código da API</span>github.com/armentanoc/produtos-api
        </a>
      </div>
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
    if ((evento.target as HTMLElement).closest('a, button, .notas')) return
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
          slide.centralizado ? 'miolo-centralizado' : '',
        ].filter(Boolean).join(' ')}>
          {slide.capa ? (
            <div className="cabeca">
              <Marca />
              <p className="selo">{slide.selo}</p>
            </div>
          ) : (
            <p className="selo">{slide.selo}</p>
          )}
          {slide.capa ? <h1>{slide.titulo}</h1> : <h2>{slide.titulo}</h2>}
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
