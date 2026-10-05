<img width="1871" height="906" alt="image" src="https://github.com/user-attachments/assets/d4393472-5ade-4ee3-b223-ae4f07347bd5" />


# Projeto Integrador — GameHub

## 1. Visão geral do projeto

O projeto consiste no desenvolvimento de um aplicativo mobile chamado **GameHub**, que, à primeira vista, funcionará como um aplicativo comum relacionado ao universo dos jogos eletrônicos. O aplicativo terá uma aparência de blog/portal de games, apresentando conteúdos como notícias, curiosidades, avaliações e informações sobre jogos.

Porém, essa interface funcionará como uma **fachada**, seguindo a proposta do Projeto Integrador de desenvolver um aplicativo aparentemente comum e inofensivo, mas que possua uma forma discreta de acesso a uma área de apoio destinada a mulheres em situação de violência.

A ideia é que uma pessoa que veja o aplicativo normalmente não perceba que existe uma segunda finalidade por trás da aplicação.

---

## 2. Funcionamento da fachada

Ao abrir o aplicativo, o usuário será direcionado para a página principal do GameHub.

Essa página terá uma aparência semelhante à de um blog de jogos, podendo apresentar:

- Notícias sobre jogos;
- Jogos populares;
- Curiosidades;
- Avaliações;
- Categorias de jogos;
- Informações sobre lançamentos;
- Um campo interativo relacionado à quantidade de jogos já jogados.

A intenção é que toda essa primeira experiência seja coerente com um aplicativo de entretenimento, sem apresentar imediatamente qualquer referência à finalidade de segurança.

Essa abordagem segue o conceito de **mecanismo de disfarce** apresentado no projeto, no qual o aplicativo deve parecer, à primeira vista, um aplicativo comum e inofensivo. O documento apresenta como exemplos uma calculadora, uma lista de compras, um gesto secreto ou outro mecanismo que somente uma pessoa que conhece o funcionamento consiga utilizar.

---

## 3. Mecanismo secreto de acesso

Dentro da fachada do GameHub haverá uma funcionalidade aparentemente normal:

**"Quantos jogos você já jogou?"**

O usuário poderá informar um número nesse campo.

Por exemplo:

> Quantos jogos você já jogou?
>
> `[ 42 ]`

Ao utilizar um determinado valor previamente definido pelo grupo, o aplicativo reconhecerá esse número como um **código secreto**.

Quando o código correto for informado, em vez de simplesmente executar a função normal da página, o aplicativo abrirá discretamente a **Área de Apoio**.

O número utilizado será definido pelo grupo e fará parte do mecanismo de disfarce do aplicativo.

Essa ideia é semelhante ao exemplo apresentado no próprio documento, em que uma calculadora aparentemente comum pode receber um código específico e, após uma determinada ação, abrir a área de apoio.

---

## 4. Área de Apoio

Após a utilização do código secreto, o usuário terá acesso a uma área diferente da fachada do aplicativo.

Essa área será destinada a fornecer acesso rápido aos principais canais oficiais de ajuda.

A tela poderá apresentar, de maneira simples e direta:

### Central de Atendimento à Mulher

**180 — Ligue para o 180**

O botão poderá abrir a função de ligação do próprio celular, permitindo que o usuário realize a chamada para o número de atendimento.

### Polícia Militar

**190 — Ligue para o 190**

Da mesma maneira, o aplicativo poderá disponibilizar um botão que abra a função de ligação do celular para o número de emergência.

Dessa forma, o aplicativo não tentará substituir os serviços oficiais de atendimento. Ele funcionará como um meio discreto de facilitar o acesso a esses canais.

O projeto orienta que os números **180 e 190 estejam visíveis dentro do aplicativo e também na documentação**, e deixa claro que o sistema desenvolvido é um protótipo acadêmico e não substitui atendimento policial, jurídico, psicológico ou de saúde.

---

## 5. Saída rápida

A Área de Apoio também contará com uma funcionalidade de **saída rápida (Quick Exit)**.

Ao utilizar essa opção, o aplicativo deverá retornar rapidamente para a aparência normal do GameHub.

A intenção é evitar que a área de apoio permaneça aberta na tela caso outra pessoa tenha acesso ao celular.

O mecanismo de saída rápida faz parte dos requisitos apresentados no projeto, que determina que o aplicativo tenha tanto a navegação entre a fachada e a área real quanto uma forma de saída rápida.

---

## 6. Desenvolvimento Mobile

O aplicativo será desenvolvido utilizando **React Native com Expo**, conforme os requisitos técnicos apresentados no documento.

O aplicativo deverá possuir:

- Tela inicial do GameHub;
- Navegação entre as telas;
- Interface da fachada;
- Campo para utilização do código secreto;
- Área de apoio;
- Botões de ligação para os canais oficiais;
- Mecanismo de saída rápida;
- Integração com o back-end;
- Funcionamento completo durante a apresentação.

O projeto exige que o aplicativo tenha uma navegação completa entre o disfarce e a área real, além do consumo real da API.

---

## 7. Back-end e API

O GameHub também possuirá um back-end próprio.

A tecnologia indicada pelo projeto é **Node.js + Express**, ou outra solução previamente aprovada.

O back-end será responsável por disponibilizar a API utilizada pelo aplicativo e armazenar os dados das entidades escolhidas pelo grupo.

As rotas deverão seguir o padrão RESTful, permitindo operações de:

- Criar;
- Consultar;
- Atualizar;
- Excluir.

O projeto exige que cada integrante do grupo seja responsável por um CRUD completo, incluindo a modelagem da entidade, rotas da API, telas do aplicativo, integração real com a API e relacionamento com outra entidade.

Portanto, embora a parte visual do aplicativo seja apresentada como um blog de jogos, o sistema terá uma estrutura de back-end real para atender aos requisitos acadêmicos.

---

## 8. Possíveis entidades e CRUDs

As entidades definitivas deverão ser escolhidas pelo grupo de acordo com a quantidade de integrantes.

O documento apresenta como exemplos:

- Perfil da usuária;
- Rede de apoio;
- Diário de ocorrências;
- Pontos de apoio;
- Alertas/SOS;
- Autoavaliação de risco.

O próprio projeto permite que os grupos adaptem, renomeiem ou proponham outras entidades.

Uma possibilidade é utilizar entidades relacionadas à própria área de apoio, mantendo a fachada do GameHub apenas como mecanismo de disfarce.

Por exemplo, uma entidade poderia armazenar informações de uma rede de apoio, enquanto outra poderia representar registros de acionamentos ou outras informações necessárias ao funcionamento da área protegida.

Essas entidades deverão estar integradas ao restante do sistema, pois o projeto determina que CRUDs isolados, que não se comunicam com o restante da aplicação, não sejam considerados completos.

---

## 9. Data Science

Para os integrantes que estiverem cursando Data Science, o projeto também contará com um componente de análise de dados.

O documento prevê uma funcionalidade de **Autoavaliação de Risco**, que poderá alimentar um indicador de risco.

A equipe de Data Science deverá trabalhar com uma base pública e legítima, realizando as etapas previstas no projeto, como:

- Análise exploratória dos dados;
- Tratamento e qualidade dos dados;
- Modelagem;
- Avaliação do modelo;
- Métricas;
- Validação cruzada;
- Integração do modelo ao aplicativo.

O projeto também permite que, caso o modelo de Data Science ainda não esteja pronto, o aplicativo utilize temporariamente um valor simulado para o indicador de risco, sem prejudicar o funcionamento do Mobile.

Nenhum dado real de vítimas deverá ser utilizado. Os dados de teste precisam ser fictícios, conforme as diretrizes éticas do projeto.

---

## 10. Integração geral

O objetivo não será desenvolver várias partes independentes.

O GameHub deverá funcionar como um único sistema.

O fluxo principal será:

**1. Usuário abre o GameHub**

↓  

**2. Visualiza o blog/aplicativo de jogos**

↓  

**3. Utiliza a funcionalidade "Quantos jogos você já jogou?"**

↓  

**4. Informa o código secreto definido pelo grupo**

↓  

**5. O aplicativo identifica o código**

↓  

**6. A Área de Apoio é aberta**

↓  

**7. O usuário pode acessar os canais 180 e 190**

↓  

**8. O usuário pode utilizar a saída rápida**

↓  

**9. O aplicativo retorna à fachada do GameHub**

Esse fluxo permitirá demonstrar claramente o conceito de disfarce solicitado pelo projeto.

---

## 11. Tecnologias

A estrutura prevista para o projeto será composta principalmente por:

### Aplicativo Mobile
- React Native;
- Expo.

### Back-end
- Node.js;
- Express;
- API RESTful;
- Banco de dados para armazenamento das entidades.

### Data Science
- Python;
- Notebook ou script;
- Base pública e legítima;
- Modelo de análise;
- Métricas e validação.

Essas tecnologias estão alinhadas aos requisitos técnicos apresentados no documento.

---

## 12. Organização do grupo

O projeto será desenvolvido em grupo, com cada integrante possuindo uma responsabilidade individual.

Cada integrante deverá possuir seu próprio CRUD completo e realizar seus próprios commits no GitHub.

O projeto deverá utilizar um repositório compartilhado, com commits individuais, frequentes e descritivos.

Também deverá ser utilizado um quadro Kanban, podendo ser Trello, GitHub Projects, Notion ou ferramenta semelhante, organizando as tarefas em etapas como:

- A Fazer;
- Em Andamento;
- Em Revisão;
- Concluído.

Esses elementos fazem parte das regras de organização e avaliação do projeto.

---

## 13. Uso de Inteligência Artificial

A utilização de Inteligência Artificial será permitida e incentivada pelo projeto, desde que seja documentada e compreendida pelos integrantes.

O grupo deverá criar um arquivo chamado **USO_IA.md**, registrando quais ferramentas de IA foram utilizadas, onde foram utilizadas e como os resultados foram revisados.

Durante a apresentação, qualquer integrante poderá ser questionado sobre um trecho de código produzido com auxílio de IA.

---

## 14. Objetivo final

O objetivo do GameHub será unir os requisitos técnicos do Projeto Integrador com um mecanismo criativo de disfarce.

O aplicativo parecerá inicialmente um simples portal de jogos, mas possuirá uma funcionalidade secreta que permitirá acessar rapidamente uma área de apoio.

A proposta não é criar um serviço real de segurança, mas desenvolver um **protótipo acadêmico funcional**, utilizando tecnologia para demonstrar como um aplicativo aparentemente comum pode oferecer acesso discreto a recursos de apoio.

Dessa forma, o projeto combinará:

**Blog de jogos + mecanismo secreto + área de apoio + canais oficiais de ajuda + saída rápida + API + CRUDs + integração com Data Science.**

O resultado final deverá ser um aplicativo mobile funcional, integrado e capaz de demonstrar todo esse fluxo durante a apresentação.
