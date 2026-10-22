# Variáveis de ambiente (`.env`)

Arquivos `.env` do Vite usam linhas `NOME=valor`. Comentários com `#` são permitidos **aqui**, não no `appsettings.json` da API.

Leia o **Alerta de segredos** no [README da UI](README.md#alerta-de-segredos).

| Variável | Uso |
| --- | --- |
| `VITE_URL_DA_API` | URL da API, sem barra no final |
| `VITE_LOGIN_API` | Login para `POST /api/autenticacao` |
| `VITE_SENHA_API` | Senha do mesmo usuário |

Tudo que começa com `VITE_` é embutido no JavaScript do navegador no build.
