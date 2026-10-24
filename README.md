# GameHub — Projeto Integrador

O GameHub é um protótipo acadêmico que reúne Desenvolvimento Móvel e Data Science. A aplicação se apresenta como um portal de jogos, com notícias, lançamentos, categorias e avaliações. Dentro dessa interface, existe uma funcionalidade disfarçada que permite acessar uma área de apoio voltada ao enfrentamento da violência contra a mulher.

O objetivo é desenvolver uma interface de acesso discreto a canais de ajuda e, nas próximas etapas, integrar informações obtidas na análise de dados públicos sobre o tema.

## Funcionalidades do GameHub

- **Início:** notícias sobre jogos, categorias e jogos populares.
- **Lançamentos:** lista de jogos com filtro por categoria.
- **Detalhes:** informações sobre cada jogo, notas e avaliações, além da leitura das notícias.
- **Avaliações:** consulta às avaliações de demonstração e formulário de nova avaliação.
- **Meus Jogos:** campo para informar quantos jogos a pessoa já jogou.
- **Menu lateral:** acesso ao portal, às categorias e à tela sobre o GameHub.

Os jogos, as notícias e as avaliações vêm de dados locais de demonstração em `src/dados/mockData.js`. O formulário de nova avaliação ainda não salva registros: ao confirmar, informa que o cadastro será conectado à API nas próximas entregas.

## Funcionalidade disfarçada

A entrada da área de apoio fica na aba **Meus Jogos**, no campo com a pergunta **“Quantos jogos você já jogou?”**.

Para ativá-la:

1. Abra a aba **Meus Jogos**.
2. Digite **999** no campo de quantidade de jogos.
3. Toque em **Salvar** ou confirme a entrada pelo teclado.

Ao reconhecer o código, a aplicação limpa o campo e troca a navegação do portal de jogos pela **Área de Apoio**. O número 999 não é salvo como quantidade de jogos nesse fluxo.

Para outros valores, o campo aceita números inteiros não negativos e atualiza a contagem exibida na tela. Esse estado é mantido em memória pelo Redux; não há persistência em banco ou armazenamento local implementada nesse fluxo.

O código de ativação está definido em `src/config/codigoSecreto.js`, e a verificação ocorre em `src/screens/meusjogos/MeusJogosScreen.js`.

### O que aparece na Área de Apoio

A tela apresenta:

- **180 — Central de Atendimento à Mulher**, com botão “Ligar para o 180”.
- **190 — Polícia Militar**, com botão “Ligar para o 190”.
- **Aviso de protótipo acadêmico**, informando que o aplicativo não substitui atendimento policial, jurídico, psicológico ou de saúde.
- **Saída rápida**, que retorna à interface de jogos.

Os botões de ligação solicitam a abertura do discador do dispositivo com o número escolhido. Não realizam uma chamada automática. Caso o discador não possa ser aberto, a aplicação exibe uma mensagem orientando a discagem direta.

A saída rápida altera o modo da aplicação e volta ao GameHub. Seu comportamento implementado é o retorno à interface de jogos; não há envio de alertas ou mecanismo de limpeza de histórico associado a esse botão.

## Data Science e integração planejada

A pasta [`dataScience/`](dataScience/README.md) contém o estudo realizado com dados públicos do **Atlas da Violência**, do Ipea, produzido em parceria com o Fórum Brasileiro de Segurança Pública, com registros de mortalidade originados do SIM/Ministério da Saúde.

A análise utiliza as séries de [quantidade de homicídios de mulheres](https://www.ipea.gov.br/atlasviolencia/dados-series/40/) e de [taxa por 100 mil mulheres](https://www.ipea.gov.br/atlasviolencia/dados-series/52/).

O CSV tratado reúne **120 registros**, correspondentes às cinco grandes regiões brasileiras entre **2000 e 2023**, com as colunas:

| Coluna | Informação |
|---|---|
| `ano` | Ano de referência |
| `regiao` | Grande região brasileira |
| `homicidios_mulheres` | Quantidade registrada de homicídios de mulheres |
| `taxa_por_100_mil_mulheres` | Taxa publicada pela fonte |

As taxas de 2023 foram mantidas em branco porque a série de taxas baixada termina em 2022. Os dados brutos, o notebook e a documentação da análise também estão incluídos na pasta de Data Science.

**Pretendemos utilizar os dados levantados para integrar informações à Área de Apoio da aplicação**, como estatísticas por região, comparações entre períodos e conteúdos educativos sobre a violência contra a mulher. A intenção é apresentar essas informações de forma simples, identificando a fonte e o período dos dados.

Essa integração ainda será desenvolvida. Atualmente, a Área de Apoio apresenta os canais de ajuda e a saída rápida; ela não lê o CSV, não consulta uma API de indicadores e não mostra os gráficos ou resultados do notebook.

Os dados são agregados por região e ano. Eles podem contextualizar o tema, mas não permitem prever o risco individual de uma pessoa. Homicídios de mulheres também não equivalem necessariamente a casos classificados como feminicídio. As limitações e os termos de uso das fontes estão descritos na [documentação de Data Science](dataScience/README.md).

## Tecnologias utilizadas

- JavaScript, React e React Native.
- Expo, com versão `~58.0.16` declarada no projeto.
- React Navigation, com navegação por abas, menu lateral e pilhas de telas.
- Redux Toolkit e React Redux para o estado da aplicação.
- Expo Vector Icons para os ícones da interface.
- Python, pandas, NumPy, Matplotlib e Jupyter Notebook na análise de dados.

## Organização do projeto

```text
Projeto-Integrador/
├── App.js                 # Inicialização dos provedores e da navegação
├── index.js               # Registro da aplicação
├── app.json               # Configuração do Expo
├── package.json           # Dependências e comandos
├── assets/gamehub/        # Imagens do portal de jogos
├── src/
│   ├── componentes/       # Cards e botão do menu
│   ├── config/            # Código de ativação da área de apoio
│   ├── dados/             # Conteúdo de demonstração do GameHub
│   ├── navigation/        # Navegadores da fachada e da área de apoio
│   ├── redux/             # Estado e ações de troca de modo
│   ├── screens/           # Telas de jogos e de apoio
│   └── tema/              # Cores e estilos compartilhados
├── dataScience/
│   ├── README.md
│   └── data-science/
│       ├── notebook.ipynb
│       ├── requirements.txt
│       └── dados/          # CSV tratado, fontes brutas e manifesto
├── android/               # Projeto nativo Android
└── ios/                   # Projeto nativo iOS
```

## Execução

Com Node.js e npm instalados, abra um terminal na raiz do projeto e instale as dependências:

```bash
npm ci
```

Os comandos abaixo estão definidos no `package.json`:

| Comando | Ação configurada |
|---|---|
| `npm start` | Inicia o servidor Expo com `--dev-client` |
| `npm run android` | Executa `expo run:android` |
| `npm run ios` | Executa `expo run:ios` |
| `npm run web` | Executa `expo start --web` |

A execução nativa depende do ambiente de desenvolvimento da plataforma: Android SDK para Android e macOS com Xcode para iOS. A abertura do discador depende do dispositivo e da plataforma utilizada.

Para a análise de dados, consulte as instruções em [`dataScience/README.md`](dataScience/README.md) e abra o notebook com a pasta de dados disponível.

## Estado atual

O projeto possui a interface GameHub, o acesso disfarçado por 999, os canais de apoio, a saída rápida e a análise de dados em notebook. A integração dos indicadores na tela de apoio e o cadastro de avaliações por API são etapas futuras. Não há modelo preditivo integrado à aplicação.

**Aviso acadêmico:** este projeto é um protótipo em desenvolvimento e não substitui atendimento profissional ou serviços oficiais de assistência.
