export type Imagem = {
  id: number
  produtoId: number
  url: string
  dataCadastro: string
}

export type Produto = {
  id: number
  nome: string
  descricao: string
  dataCadastro: string
  dataAtualizacao: string
  estaAtivo: boolean
  imagens: Imagem[]
}

export type Configuracao = {
  titulo: string
  subtitulo: string
}

export type TokenResposta = {
  token: string
  tipo: string
  expiraEm: string
}
