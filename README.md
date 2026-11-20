# GameHub — Projeto Integrador

O GameHub é um protótipo acadêmico que reúne Desenvolvimento Móvel e Data Science. A aplicação apresenta um portal de jogos, com notícias, lançamentos, categorias e avaliações, e oferece uma entrada discreta para uma área de apoio voltada ao enfrentamento da violência contra a mulher.

Na Entrega 4, o aplicativo consome uma API REST em Node.js/Express, com persistência em SQLite, autenticação e permissões por perfil. Os resultados da modelagem de Data Science são disponibilizados pela API e exibidos na Área de Apoio.

**Aviso acadêmico:** o aplicativo e suas estimativas não substituem atendimento policial, jurídico, psicológico ou de saúde. Os indicadores são agregados por região e não representam o risco individual de uma pessoa.

## Funcionalidades e perfis

- **Login e cadastro:** o cadastro pelo aplicativo cria uma conta comum; o administrador é configurado na inicialização da API.
- **Início:** consulta de notícias, categorias e jogos, com leitura dos detalhes.
- **Lançamentos:** consulta de jogos com filtro por categoria.
- **Categorias, jogos e notícias:** criação, consulta, edição e exclusão disponíveis ao administrador; as consultas também são acessíveis às contas comuns.
- **Avaliações:** contas comuns podem cadastrar avaliações de jogos e editar ou excluir as próprias avaliações. As permissões são verificadas pela API.
- **Meus Jogos:** contagem mantida em memória pelo Redux e campo de entrada disfarçada para a Área de Apoio.
- **Área de Apoio:** canais oficiais, indicadores regionais e saída rápida.
- **Minha Rede de Apoio:** contas comuns podem cadastrar, listar, editar e excluir seus contatos de confiança. Os contatos são vinculados à conta autenticada, com acesso restrito pela API.

Os dados das entidades são consultados e alterados pela API. As tabelas de categorias, jogos, notícias e avaliações recebem registros iniciais de demonstração no banco. Esses registros podem ser consultados pelo fluxo real de requisições e persistência. O arquivo legado `src/dados/mockData.js` permanece no projeto, mas não é importado pelas telas.

A sessão e a contagem de jogos são mantidas em memória; fechar ou recarregar o aplicativo exige novo login e reinicia essa contagem.

## Arquitetura

```text
Aplicativo Expo / React Native
    -> serviços HTTP com token Bearer
    -> API Node.js / Express
    -> banco SQLite

Notebook de modelagem
    -> indicadores_regionais.json
    -> api/dados/indicadores.json
    -> tabela indicadores / GET /indicadores
    -> Área de Apoio
```

A API valida os relacionamentos entre jogos e categorias, avaliações e jogos, avaliações e usuárias, e contatos de apoio e usuárias. A exclusão de categorias ou jogos com registros dependentes é bloqueada. A API responde com códigos HTTP como `201`, `400`, `401`, `403`, `404` e `409`, conforme a operação e o erro.

## Como executar

### 1. Preparar e iniciar a API

Instale Node.js e npm. A API declara Node.js `>=20`; o ambiente também precisa atender aos requisitos das dependências instaladas, incluindo `better-sqlite3`.

Abra um terminal PowerShell na raiz do repositório:

```powershell
cd api
npm install
$env:GAMEHUB_ADMIN_EMAIL="admin@gamehub.com"
$env:GAMEHUB_ADMIN_PASSWORD="DefinaUmaSenhaDeDemonstracao123"
$env:AUTH_SECRET="DefinaUmaChaveLongaEUnicaParaEsteAmbiente"
npm start
```

As credenciais acima são exemplos para demonstração local. Utilize o e-mail e a senha configurados para entrar como administrador. Mantenha as variáveis no terminal que inicia a API; o servidor não carrega arquivos `.env` automaticamente.

A conta administradora é criada no primeiro início com essas variáveis. Se o e-mail já existir, a conta recebe o perfil de administrador, mas a senha existente é mantida. Para criar uma conta comum, use o cadastro do aplicativo.

Por padrão, a API escuta em `http://localhost:3333`, aceita conexões pelas interfaces de rede do computador e cria o banco em `api/dados/gamehub.db`. O banco local é ignorado pelo Git e não acompanha um clone novo.

| Variável do servidor | Uso |
| --- | --- |
| `PORT` | Porta da API; padrão `3333` |
| `DB_ARQUIVO` | Caminho alternativo para o banco SQLite |
| `GAMEHUB_ADMIN_EMAIL` | E-mail usado para criar ou promover a conta administradora |
| `GAMEHUB_ADMIN_PASSWORD` | Senha da nova conta administradora; mínimo de 8 caracteres |
| `AUTH_SECRET` | Chave usada para assinar os tokens de autenticação |

Para conferir se o servidor está ativo, abra `http://localhost:3333/` no navegador. A resposta deve informar `status: "ok"`. Mantenha esse terminal aberto enquanto usa o aplicativo.

### 2. Configurar o endereço da API no aplicativo

Edite `src/config/api.js` antes de iniciar o Expo:

```javascript
export const URL_API = "http://localhost:3333";
```

Use o endereço correspondente ao ambiente:

| Ambiente | Endereço da API |
| --- | --- |
| Navegador no mesmo computador da API | `http://localhost:3333` |
| Emulador Android padrão do Android Studio | `http://10.0.2.2:3333` |
| Celular físico | `http://IP_LOCAL_DO_COMPUTADOR:3333` |
| API hospedada | URL pública da API |

No celular físico, conecte o aparelho e o computador à mesma rede e permita conexões na porta da API no firewall. O `localhost` do celular aponta para o próprio aparelho. No Windows, o comando `ipconfig` ajuda a localizar o IPv4 da conexão usada pelo computador.

O arquivo `.env.example` sugere `EXPO_PUBLIC_API_URL`, mas a versão atual do código usa a constante em `src/config/api.js`; copiar esse arquivo para `.env.local` não altera o endereço por si só.

### 3. Iniciar o aplicativo

Em outro terminal, na raiz do repositório:

```powershell
npm install
npx expo start
```

Use a opção de abertura compatível com o ambiente escolhido. Para executar no navegador, também existe `npm run web`.

| Comando na raiz | Ação configurada |
| --- | --- |
| `npx expo start` | Inicia o servidor de desenvolvimento Expo |
| `npm start` | Executa `expo start --dev-client`, direcionado a um development build instalado |
| `npm run android` | Executa `expo run:android`; requer ambiente nativo Android configurado |
| `npm run ios` | Executa `expo run:ios`; requer macOS e ambiente iOS configurado |
| `npm run web` | Executa `expo start --web` |

Após abrir o app, cadastre uma conta comum para demonstrar avaliações e contatos de apoio. Para gerenciar categorias, jogos e notícias, entre com a conta administradora configurada na API.

## Rotas principais da API

As rotas de escrita administrativa exigem token de administrador. Avaliações exigem conta comum para criação e conferência de autoria para edição e exclusão. Toda a Rede de Apoio exige uma conta comum autenticada.

| Recurso | Rotas implementadas |
| --- | --- |
| Categorias | `GET /categorias`, `GET /categorias/:id`, `POST /categorias`, `PUT /categorias/:id`, `DELETE /categorias/:id` |
| Jogos | `GET /jogos`, `GET /jogos/:id`, `POST /jogos`, `PUT /jogos/:id`, `DELETE /jogos/:id` |
| Notícias | `GET /noticias`, `GET /noticias/:id`, `POST /noticias`, `PUT /noticias/:id`, `DELETE /noticias/:id` |
| Avaliações | `GET /avaliacoes`, `GET /avaliacoes/:id`, `POST /avaliacoes`, `PUT /avaliacoes/:id`, `DELETE /avaliacoes/:id` |
| Rede de Apoio | `GET /rede-apoio`, `POST /rede-apoio`, `PUT /rede-apoio/:id`, `DELETE /rede-apoio/:id` |
| Indicadores | `GET /indicadores`, `GET /indicadores/:id`; somente leitura |
| Autenticação | `POST /usuarios/cadastro`, `POST /usuarios/login`, `GET /usuarios/me` |

O login e o cadastro retornam um token. O aplicativo o envia no cabeçalho `Authorization: Bearer <token>` nas requisições seguintes.

## Entrada disfarçada e saída rápida

Após entrar no aplicativo:

1. Abra a aba **Meus Jogos**.
2. Digite **999** no campo “Quantos jogos você já jogou?”.
3. Toque em **Salvar** ou confirme pelo teclado.

O app limpa o campo e abre a Área de Apoio. O código de ativação está em `src/config/codigoSecreto.js` e não é salvo como contagem de jogos. Outros números inteiros não negativos atualizam apenas o estado em memória.

A Área de Apoio apresenta os canais 180 e 190, o aviso de protótipo acadêmico e os indicadores regionais. Contas comuns também podem abrir **Minha Rede de Apoio**. Os botões de ligação solicitam a abertura do discador e dependem do dispositivo.

A **Saída rápida** existe nas duas telas de apoio e retorna à interface de jogos sem confirmação. Esse mecanismo muda a navegação; não envia mensagens, não realiza chamadas e não apaga o histórico do dispositivo. Na Área de Apoio, o botão está no conteúdo rolável, abaixo dos canais de ajuda.

## Data Science e integração

A pasta [dataScience/](dataScience/README.md) contém a análise de dados públicos do Atlas da Violência/Ipea e a modelagem. O CSV tratado reúne 120 registros das cinco grandes regiões brasileiras entre 2000 e 2023, com ano, região, quantidade de homicídios de mulheres e taxa por 100 mil mulheres. As cinco taxas de 2023 foram mantidas ausentes porque a série de taxas obtida termina em 2022.

- [notebook.ipynb](dataScience/data-science/notebook.ipynb): tratamento, análise exploratória, tabelas e gráficos.
- [notebook_modelagem.ipynb](dataScience/data-science/notebook_modelagem.ipynb): comparação de modelos, validação e exportação dos indicadores.
- `dataScience/data-science/dados/indicadores_regionais.json`: resultados exportados pela modelagem.
- `api/dados/indicadores.json`: cópia carregada pela API na inicialização.

A modelagem compara a repetição do último valor, a tendência linear dos últimos cinco anos e regressão Ridge. Usa validação cruzada temporal com janela expansiva, quatro folds entre 2012 e 2019 e teste final separado em 2020–2023. As métricas são MAE, RMSE e MAPE, com resultados gerais e por região.

A tendência linear teve o menor MAE médio na validação cruzada e foi escolhida para estimar 2024. Sua vantagem foi pequena e não se confirmou no teste final. Essa limitação está registrada no notebook e no aplicativo; não há evidência de superioridade confiável sobre repetir o último valor observado.

A Área de Apoio consulta `GET /indicadores` e apresenta o valor observado de 2023, a estimativa de 2024 e uma margem correspondente ao MAE regional da validação cruzada. Essa margem é uma medida de erro histórico, não um intervalo de confiança. O resultado é calculado no notebook e servido pela API; o servidor não treina o modelo a cada requisição. Após reexportar os indicadores, reinicie a API para carregar o arquivo atualizado.

Para executar os notebooks, instale as dependências de `dataScience/data-science/requirements.txt` e use `dataScience/data-science/` como diretório de trabalho. Os notebooks incluídos têm saídas e gráficos salvos.

Os dados são agregados, não permitem estimar risco individual e não estabelecem causas. Homicídios de mulheres não equivalem necessariamente a casos classificados como feminicídio. Fontes, tratamento e limitações estão na documentação de Data Science.

## Organização do projeto

```text
Projeto-Integrador/
├── App.js e index.js       # Inicialização da aplicação
├── app.json e package.json # Configuração e dependências do app
├── assets/gamehub/         # Imagens do portal
├── src/
│   ├── componentes/        # Componentes compartilhados
│   ├── config/             # Endereço da API e código de ativação
│   ├── dados/              # Capas locais e arquivo legado de demonstração
│   ├── navigation/         # Navegação por abas, menu lateral e pilhas
│   ├── redux/              # Sessão e estado da aplicação
│   ├── screens/            # Telas do portal, login e apoio
│   ├── servicos/           # Consumo da API e autenticação HTTP
│   └── tema/               # Cores e estilos compartilhados
├── api/
│   ├── server.js           # Inicialização do Express
│   ├── src/                # Banco, autenticação e rotas
│   ├── dados/              # SQLite local e indicadores exportados
│   └── testes/             # Testes automatizados da API
├── dataScience/
│   ├── README.md
│   └── data-science/       # Notebooks, dependências e dados
├── docs/                   # Kanban e matriz de responsabilidades
├── android/ e ios/         # Projetos nativos
└── USO_IA.md               # Registro do apoio de IA
```

## Testes e pendências da Entrega 4

Para executar a suíte da API:

```powershell
cd api
npm test
```

Na revisão local de 19/11/2026, foram verificadas 38 requisições com banco em memória e autenticação: criação, listagem, edição e exclusão funcionaram nos cinco módulos; consulta por ID funcionou em categorias, jogos, notícias e avaliações. Foram confirmados bloqueios de relacionamento e permissões com respostas `400`, `401`, `403` e `409`.

A suíte automatizada ainda precisa de ajuste: o auxiliar de testes não autentica as requisições nem interpreta os perfis passados pelos testes novos. Na execução com `node --test --test-isolation=none testes/categorias-avaliacoes.test.js testes/jogos-noticias.test.js testes/rede-apoio-autenticacao.test.js`, passaram 8 de 29 testes. Essa execução foi usada porque o ambiente de revisão bloqueou a criação de processos do comando padrão.

Pendências conhecidas:

- Implementar `GET /rede-apoio/:id` com controle de acesso por conta.
- Corrigir o auxiliar e as expectativas dos testes automatizados.
- Validar no celular o fluxo completo de login, CRUDs, entrada disfarçada e saída rápida.
- Preencher a [matriz de responsabilidades](docs/RESPONSABILIDADES.md) com a divisão real do grupo e atualizar o [Kanban](docs/KANBAN.md) para corresponder ao código e aos testes.
- Versionar os documentos e demais arquivos de entrega ainda não rastreados e conferir os colaboradores no GitHub.

Para envio no Blackboard, prepare uma cópia do projeto sem diretórios `node_modules`, o Kanban em PDF ou imagem, uma cópia de [USO_IA.md](USO_IA.md), os notebooks executados e os links solicitados. A presença desses arquivos no repositório não substitui o envio na tarefa da disciplina.
