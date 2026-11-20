Uso de Inteligência Artificial — Projeto Integrador GameHub
Este documento registra como ferramentas de inteligência artificial foram utilizadas como apoio durante o desenvolvimento do projeto. A IA foi usada como ferramenta auxiliar: as sugestões foram avaliadas pelo grupo, adaptadas ao contexto do aplicativo e verificadas sempre que possível. A responsabilidade pelo código final e pelas decisões de implementação permaneceu com os integrantes.
Ferramentas utilizadas
- ChatGPT (OpenAI): apoio para revisar trechos de código, investigar erros, sugerir correções, melhorar a organização dos componentes e auxiliar na estilização das telas.
- Ambiente de desenvolvimento e ferramentas de teste: utilizados pelo grupo para aplicar as alterações sugeridas e verificar o comportamento do aplicativo.
Ajuste esta seção caso o grupo tenha utilizado outras ferramentas de IA. Mantenham somente as ferramentas que realmente foram usadas.

Como a IA foi utilizada
-Luiz henrique
1. Estilização inicial e organização visual
No início do desenvolvimento, a IA foi utilizada como apoio para pensar e aprimorar a apresentação visual do aplicativo GameHub. Foram solicitadas sugestões para:
- organizar os elementos das telas e melhorar a hierarquia visual;
- ajustar espaçamentos, alinhamentos, cores, tamanhos de texto e disposição dos componentes;
- utilizar estilos do React Native e Flexbox para manter as telas mais consistentes;
- melhorar a apresentação de botões, campos de entrada, listas, cartões e demais componentes;
- manter uma identidade visual coerente entre as telas do aplicativo.
As sugestões foram adaptadas ao projeto e não substituíram a avaliação visual feita pelo grupo.
2. Revisão do código
-Luiz henrique e Bruno Henrique
A IA também foi utilizada para auxiliar na leitura e revisão de partes do código, com o objetivo de:
- compreender o funcionamento de componentes e trechos existentes;
- identificar possíveis erros, inconsistências ou pontos que poderiam ser simplificados;
- sugerir melhorias de legibilidade e organização;
- revisar a integração entre telas, componentes e navegação;
- esclarecer dúvidas sobre React Native, Expo e a estrutura do projeto.
3. Investigação e correção de bugs
-Luiz Henrique E bruno henrique
Durante o desenvolvimento, a IA serviu como apoio na investigação de problemas encontrados no aplicativo. O grupo utilizou sugestões para:
- analisar mensagens de erro e comportamentos inesperados;
- levantar possíveis causas de falhas;
- propor correções para serem testadas no código;
- verificar a lógica de interação entre os componentes e a navegação;
- revisar o comportamento do mecanismo de entrada da área de apoio.
As sugestões não foram consideradas corretas automaticamente: as alterações precisaram ser avaliadas e testadas no contexto do projeto.
4. Apoio à navegação e ao estado da aplicação
-Luiz Henrique E bruno Henrique
A IA foi utilizada para esclarecer dúvidas e revisar a implementação de recursos como:
- navegação entre telas com Stack, Tab e Drawer;
- organização do fluxo entre as telas principais e a área de apoio;
- gerenciamento de estado com Redux;
- comportamento de campos de entrada e interações do usuário.
5. Apoio à documentação e à compreensão dos requisitos
-Bruno Henrique
A IA também ajudou o grupo a interpretar os requisitos da entrega, organizar uma lista de verificação e identificar pontos que precisavam ser conferidos, sem substituir o documento orientador ou as instruções do professor.
Exemplos de prompts utilizados
Os exemplos abaixo representam os tipos de solicitações feitas durante o trabalho. Devem ser ajustados pelo grupo para refletir com precisão os prompts realmente utilizados.
1. Estilização inicial:
   “Analise esta tela do aplicativo e sugira melhorias de estilização, espaçamento, alinhamento, cores e organização dos componentes usando React Native e Flexbox.”
2. Revisão de código:
   “Revise este trecho de código React Native, explique como ele funciona e aponte possíveis erros ou melhorias de organização e legibilidade.”
3. Correção de bugs:
   “Estou encontrando este erro no aplicativo. Analise a mensagem e o código relacionado, indique causas possíveis e sugira uma correção que eu possa testar.”
4. Navegação:
   “Confira esta configuração de navegação e ajude a identificar problemas no fluxo entre Stack, Tab e Drawer, sem alterar partes não relacionadas.”
5. Redux e interações:
   “Revise esta lógica de estado e interação e explique como garantir que a mudança de tela ocorra quando a condição definida for atendida.”
6. Verificação dos requisitos:
   “Compare esta lista de funcionalidades com os requisitos da entrega e monte um checklist do que precisa ser testado ou confirmado.”
Cuidados adotados
===========================================================================================================================================================================



### USO DE IA NA ENTREGA 3 e 4 (API) 

### 1. Conferência geral (Luiz)

Prompt: consegue fazer um checklist do nosso projeto? ve se ta tudo certinho na parte da api […] ve certinho se não esquece de nada se ta igual do professor etc:
Resposta (resumo): a IA abriu o projeto, rodou a API e comparou com o checklist e os exemplos do professor. Apontou o que estava certo (CRUDs, relacionamentos, disfarce, notebook) e o que faltava: README desatualizado, testes da API falhando por falta de login, conta admin que não existe num clone novo, script npm start do Expo e arquivos que não deviam ir no zip. 

### 2. Entender o que é obrigatório (Luiz)

Prompt: sobre o teste da api ele falou q pode ser local host n? ou eu posso enviar os dados salvos tipo email a conta admim no github:
Resposta: localhost é aceito pelo enunciado. Não se deve subir o gamehub.db por conter contas reais. A sugestão foi criar uma conta admin de demonstração.

### 3. Entender onde os dados ficam (Luiz)

Prompt: nossas informaçoes ta sendo salve localhost certo mas tem um arquivo texto ou algo do tipo q fica salvo?
Resposta: os dados ficam num arquivo SQLite (api/dados/gamehub.db), criado pela API. É binário e pode ser visto pelo navegador pelas rotas ou com um programa de SQLite.

### 4. Entender um resultado do modelo (Luiz)

Prompt: (print da tela) “seria isso a estimativa esta igual a atual? é isso q ta errado? como arrumar
Resposta: a estimativa de 2024 era igual à de 2023 porque o modelo escolhido repetia o ano anterior. A IA testou outras 8 formas de estimar na validação cruzada e mostrou que só a tendência linear de 5 anos ganhava, por pouco. Explicou o que seria manipular o resultado e o que seria honesto.

### 5. Alteração no notebook (Luiz)

Prompt: faz isso incluir a tendência linear como candidata no notebook, mantendo a mesma regra de escolha (menor MAE na validação cruzada)
Resposta: a IA editou e reexecutou o notebook, atualizou o indicadores.json e a API. Reportou que a tendência linear venceu na validação cruzada (68,7 contra 70,9) mas foi pior no teste final (72,6 contra 50,8), e o grupo manteve a regra.

### 6. Separação de permissões entre administrador e usuário (Luiz)

Prompt:
consegue conferir a parte de permissões do nosso projeto? queria garantir que o administrador e o usuário comum tenham funções diferentes. o admin pode cadastrar, editar e excluir notícias, mas o usuário comum só pode visualizar. também não quero que o admin consiga mexer nas avaliações dos usuários. isso precisa ser protegido na api também né?

Resposta (resumo):
A IA analisou a separação de responsabilidades entre os perfis e explicou a necessidade de implementar controle de acesso baseado em funções (RBAC). A proposta foi utilizar a identificação do usuário autenticado e sua função (user ou admin) para validar cada operação diretamente no backend. As operações administrativas de notícias ficaram restritas ao administrador, enquanto as avaliações permaneceram independentes, sem permissão de gerenciamento pelo administrador.

### 7. Proteção das avaliações por usuário (Luiz)

Prompt:
uma dúvida sobre as avaliações, como fazemos para garantir que um usuário só consiga editar ou excluir as avaliações que ele mesmo cadastrou? não adianta esconder os botões no aplicativo se ele conseguir fazer isso direto pela api né?

Resposta (resumo):
A IA explicou que esconder funcionalidades na interface não representa uma proteção real. A validação precisa acontecer no backend, utilizando a identificação do usuário obtida pela autenticação. Dessa forma, antes de permitir uma alteração ou exclusão, a API deve verificar se o registro pertence ao usuário autenticado. Caso outro usuário tente acessar ou modificar uma avaliação que não pertence a ele, a operação deve ser bloqueada.

### 8. Integração das avaliações com os jogos cadastrados (Luiz)

Prompt:
consegue verificar como podemos fazer a parte de adicionar avaliação funcionar com os jogos de lançamentos? queria que o usuário selecionasse um jogo que já existe, colocasse uma nota e um comentário e depois essa avaliação aparecesse nos detalhes daquele jogo. como seria o relacionamento disso no banco?

Resposta (resumo):
A IA explicou a utilização de relacionamentos entre as entidades de jogos, usuários e avaliações. A proposta foi utilizar identificadores (IDs) para relacionar cada avaliação ao jogo correspondente e ao usuário que a cadastrou. Assim, ao consultar os detalhes de um lançamento, a aplicação pode buscar as avaliações vinculadas àquele jogo. Também foi destacada a necessidade de validar os dados recebidos pela API e garantir a integridade dos relacionamentos no banco de dados.

### 9. Comunicação entre o aplicativo e a API (Luiz)

Prompt:
sobre a integração do nosso aplicativo com a api, consegue conferir se as operações estão sendo feitas pelo backend mesmo? queria evitar deixar alguma informação salva só no aplicativo ou usando dados mocados, porque agora precisamos trabalhar com a api real. também verifica se as respostas estão sendo tratadas corretamente no react native.

Resposta (resumo):
A IA analisou o fluxo de comunicação entre o React Native e o backend, considerando o uso de requisições HTTP para consultar e enviar informações. Explicou a importância de utilizar os métodos adequados (GET, POST, PUT e DELETE), tratar respostas e códigos de status HTTP e apresentar mensagens de erro quando necessário. Também destacou que os dados persistentes devem ser armazenados no banco de dados por meio da API, evitando depender de informações temporárias ou exclusivamente locais no aplicativo.

### 1. Organização das informações na tela inicial (Bruno)

**Prompt:**  
consegue analisar nossa tela inicial do GameHub? queria deixar as informações mais organizadas, principalmente os lançamentos e as notícias. vê se a navegação está intuitiva e se faz sentido a maneira como estamos apresentando os conteúdos para o usuário. não queria encher a tela de informação desnecessária.

**Resposta (resumo):**  
A IA analisou a estrutura da tela inicial e sugeriu melhorias na hierarquia visual dos componentes, na distribuição dos conteúdos e na organização das informações. Também destacou a importância de manter uma navegação consistente entre as telas, priorizando os elementos mais relevantes para o usuário. As sugestões foram consideradas pelo grupo durante a revisão da interface.

### 2. Exibição dos detalhes de um jogo (Bruno)

**Prompt:**  
sobre a tela de detalhes dos jogos, como podemos organizar melhor as informações? queria que quando a pessoa clicasse em um jogo aparecesse uma tela com imagem, nome, descrição, data de lançamento e outras informações sem ficar tudo desorganizado. qual seria uma boa estrutura usando react native?

**Resposta (resumo):**  
A IA explicou como estruturar uma tela de detalhes utilizando componentes reutilizáveis do React Native. Sugeriu separar as informações em blocos visuais, utilizando componentes como `View`, `Text` e `Image`, além de organizar a navegação com os parâmetros recebidos da tela anterior. Também destacou a importância de tratar informações ausentes para evitar problemas na renderização.

### 3. Análise dos dados e escolha do modelo (Bruno)

**Prompt:**  
na parte de data science fiquei com uma dúvida, como sabemos se o modelo que escolhemos realmente é o melhor para fazer a previsão? não seria melhor testar mais de um modelo e comparar os resultados? consegue explicar como funciona essa comparação usando MAE e validação cruzada?

**Resposta (resumo):**  
A IA explicou o funcionamento da validação cruzada e sua utilização para comparar diferentes modelos de previsão. Demonstrou como o MAE (Erro Absoluto Médio) permite avaliar a diferença entre os valores previstos e os valores reais, sendo que resultados menores indicam menor erro médio. Também explicou que a escolha do modelo deve considerar seu desempenho em dados de validação, evitando selecionar um modelo apenas por apresentar um resultado favorável em um único teste.

### 4. Visualização e interpretação das previsões (Bruno)

**Prompt:**  
consegue me ajudar a entender como apresentar os resultados da nossa parte de data science? queria mostrar os dados históricos e as previsões de um jeito que fique fácil de entender, talvez usando um gráfico. também queria saber como explicar quando a previsão aumenta, diminui ou fica praticamente igual ao ano anterior.

**Resposta (resumo):**  
A IA explicou como utilizar gráficos para comparar os valores históricos com os valores estimados pelo modelo. Sugeriu diferenciar visualmente os dados observados das previsões e utilizar os resultados do arquivo de indicadores gerado pelo notebook. Também orientou sobre a interpretação das tendências, destacando que uma previsão representa uma estimativa baseada nos dados disponíveis e não uma garantia de que aquele resultado acontecerá.

- As respostas da IA foram tratadas como sugestões, não como garantia de que o código estava correto.
- O grupo precisou avaliar e testar as alterações antes de considerá-las concluídas.
- As sugestões foram adaptadas à estrutura e às necessidades do GameHub.
- A IA não substituiu os testes, a compreensão do código, a colaboração dos integrantes ou as orientações do professor.
- Dados, funcionalidades e resultados do projeto devem ser conferidos pelo grupo antes da entrega.
Participação do grupo
Os integrantes são responsáveis por revisar o conteúdo deste documento e ajustá-lo para refletir fielmente o uso de IA ocorrido durante o desenvolvimento. Os nomes dos integrantes, as ferramentas adicionais e os prompts específicos podem ser acrescentados, caso necessário.
