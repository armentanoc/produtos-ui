import type { Configuracao, Produto, TokenResposta } from './tipos'

/**
 * APRENDIZADO: login/senha vêm do .env (VITE_*) e entram no bundle do navegador.
 * Em um projeto real, segredos ficam fora do front (BFF, vault) e o .env vai no .gitignore.
 *
 * O token JWT fica só na memória desta aba — não usamos localStorage/sessionStorage,
 * para não persistir o crachá onde um XSS poderia ler.
 */
const urlBase = (import.meta.env.VITE_URL_DA_API || 'http://localhost:5080').replace(/\/$/, '')

const margemRenovacaoMs = 60_000

let sessao: { token: string; expiraEm: number } | null = null
let renovacaoEmCurso: Promise<string> | null = null

export function enderecoDaApi() {
  return urlBase
}

export function buscarConfiguracao() {
  return ler<Configuracao>('/api/configuracao')
}

export function buscarProdutos() {
  return lerAutenticado<Produto[]>('/api/produtos')
}

function limparSessao() {
  sessao = null
  renovacaoEmCurso = null
}

async function lerAutenticado<T>(caminho: string): Promise<T> {
  let resposta = await fetchAutenticado(caminho)
  if (resposta.status === 401) {
    limparSessao()
    resposta = await fetchAutenticado(caminho)
  }
  return interpretar<T>(resposta)
}

async function fetchAutenticado(caminho: string) {
  const token = await obterToken()
  return fetch(`${urlBase}${caminho}`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` },
  })
}

async function obterToken(): Promise<string> {
  const agora = Date.now()
  if (sessao && sessao.expiraEm > agora + margemRenovacaoMs)
    return sessao.token

  if (!renovacaoEmCurso)
    renovacaoEmCurso = autenticar().finally(() => {
      renovacaoEmCurso = null
    })

  return renovacaoEmCurso
}

async function autenticar(): Promise<string> {
  const login = import.meta.env.VITE_LOGIN_API ?? 'admin'
  const senha = import.meta.env.VITE_SENHA_API ?? 'admin@123'

  const resposta = await fetch(`${urlBase}/api/autenticacao`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, senha }),
    cache: 'no-store',
  })

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null) as { mensagem?: string } | null
    throw new Error(corpo?.mensagem ?? 'N\u00e3o consegui autenticar na API.')
  }

  const dados = await resposta.json() as TokenResposta
  sessao = {
    token: dados.token,
    expiraEm: new Date(dados.expiraEm).getTime(),
  }
  return sessao.token
}

async function ler<T>(caminho: string): Promise<T> {
  const resposta = await fetch(`${urlBase}${caminho}`, { cache: 'no-store' })
  return interpretar<T>(resposta)
}

async function interpretar<T>(resposta: Response): Promise<T> {
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null) as { mensagem?: string } | null
    throw new Error(corpo?.mensagem ?? 'A API recusou a requisi\u00e7\u00e3o.')
  }
  return resposta.json() as Promise<T>
}
