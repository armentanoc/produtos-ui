# Catálogo de Produtos

Vitrine em React e TypeScript. Ela só mostra os produtos da API `produtos-api`: nome, descrição e fotos. Não tem preço, sacola nem tela de login — no carregamento a página chama `POST /api/autenticacao` e usa o token no `GET /api/produtos`.

Um aviso no topo deixa claro que a aplicação é ilustrativa, para aprendizado, e não é oferta nem loja de produtos do Grupo Boticário.

O título e o subtítulo vêm de `GET /api/configuracao`. O visual é branco, com faixa escura e verde, no espírito de uma loja de beleza. Não é a loja oficial do Grupo Boticário.

## Alerta de segredos

Este é um **projeto de aprendizado**: o arquivo `.env` pode ir para o Git com `admin` / `admin@123` e URL local.

Em um **projeto real**: coloque `.env` no `.gitignore`, use secrets no CI/host e **nunca** coloque senhas de produção em variáveis `VITE_*` — elas viram código público no bundle do navegador. Na API, `Jwt:Chave` e o usuário inicial também devem ficar só no servidor (veja o alerta no README de `produtos-api`).

Detalhes das variáveis: [`env.md`](env.md).

## O que você precisa

- [Node.js 20 ou mais novo](https://nodejs.org/)
- A API no ar. O passo a passo está no README de `produtos-api`.

Confira com `node --version`.

## Rodar na sua máquina

Na pasta `produtos-ui`:

```bash
npm install
npm run dev
```

Abra http://localhost:5173

Sem `.env`, a página usa os padrões (`http://localhost:5080`, `admin` / `admin@123`). Para mudar, edite `.env` ou copie de `.env.example`:

```bash
VITE_URL_DA_API=http://localhost:5080
VITE_LOGIN_API=admin
VITE_SENHA_API=admin@123
```

`VITE_LOGIN_API` e `VITE_SENHA_API` precisam bater com `UsuarioInicial` na API. Variáveis `VITE_*` entram no JavaScript do navegador: use só credenciais de estudo, nunca senha de produção.

Se o navegador bloquear por CORS, coloque a origem da página (por exemplo `http://localhost:5173`) em `Cors:OrigensPermitidas` na API e suba a API de novo.

A grade muda com a tela: uma coluna no celular estreito, duas no celular comum, três no tablet e quatro no monitor. A descrição do produto aparece inteira no card. **Ver detalhes** abre as fotos daquele produto. Cadastrar ou apagar continua no Swagger da API.

**Apresentação** (botão no rodapé): slides em `src/apresentacao/`. A vitrine fica em `src/Catalogo.tsx`.

## Publicar na Vercel

1. Envie este repositório para o GitHub.
2. Na Vercel, **Add New Project** e importe `produtos-ui`. O `vercel.json` já define Vite, `npm run build` e a pasta `dist`.
3. Antes do deploy, crie `VITE_URL_DA_API` (URL da API, sem barra no final), `VITE_LOGIN_API` e `VITE_SENHA_API` com o mesmo usuário inicial da API.
4. Faça o deploy.

Variável que começa com `VITE_` entra no JavaScript na hora do build. Se a URL ou as credenciais mudarem, publique o front de novo.

## Como esta base foi feita

A primeira versão foi gerada no Cursor com o modelo Grok 4.7: uma vitrine que só lia a API e um backend simples em camadas. Depois refinamos em conversa o português dos textos, os oito produtos, o rodapé, os testes da API e este layout, sempre olhando a página no navegador antes de seguir. O caminho útil com IA é pedir um resultado pequeno, conferir o que apareceu e corrigir o que ainda falhou, em vez de aceitar a primeira resposta inteira.
