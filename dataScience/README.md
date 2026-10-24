# Entrega 2 — Data Science

Bruno Henrique e Luiz Henrique · 24/10/2026

Estudo básico dos homicídios de mulheres nas cinco grandes regiões brasileiras, entre 2000 e 2023.

## Arquivos

- `data-science/notebook.ipynb`: trabalho com código, tabelas, gráficos e explicações.
- `data-science/dados/base_tratada.csv`: tabela final com quatro colunas e 120 linhas. Separador `;`, vírgula decimal e UTF-8 com BOM.
- `data-science/dados/brutos/`: sete arquivos originais da fonte, sem alteração.
- `data-science/dados/manifesto_fontes.json`: links, data de acesso e hashes dos brutos.
- `USO_IA.md`: registro das ferramentas e solicitações usadas.

## Base escolhida

Fonte: [Atlas da Violência / Ipea](https://www.ipea.gov.br/atlasviolencia/), produzido com o Fórum Brasileiro de Segurança Pública a partir do SIM/Ministério da Saúde. Usamos a [série 40, quantidade](https://www.ipea.gov.br/atlasviolencia/dados-series/40/) e a [série 52, taxa](https://www.ipea.gov.br/atlasviolencia/dados-series/52/). Acesso em 24/10/2026. Links diretos estão no manifesto.

A fonte é uma das sugeridas pela disciplina. Permite estudar tendências e diferenças regionais e pode contextualizar conteúdos educativos do aplicativo. Não permite estimar risco individual. Cada linha é uma região em um ano, não uma pessoa. Homicídios de mulheres não equivalem necessariamente a feminicídios.

## Dicionário do CSV

| Coluna | Significado | Tipo | Unidade |
|---|---|---|---|
| ano | Ano de referência | Temporal anual | Ano |
| regiao | Grande região brasileira | Qualitativa nominal | Sem unidade |
| homicidios_mulheres | Quantidade registrada de homicídios de mulheres | Quantitativa discreta | Óbitos |
| taxa_por_100_mil_mulheres | Taxa publicada pela fonte | Quantitativa contínua | Óbitos por 100 mil mulheres |

## Tratamento e cuidados

Os indicadores foram reunidos por região e ano. Padronizamos “Centro Oeste” para “Centro-Oeste” e convertemos os marcadores de data para extrair o ano. Verificamos ausentes, sentinelas, valores inválidos, duplicatas, integridade das chaves e extremos pelo IQR. As contagens regionais conferem com a série Brasil. Nenhuma duplicata ou medida inválida foi identificada nas regras adotadas.

As taxas baixadas terminam em 2022; as contagens chegam a 2023. Mantivemos cinco taxas de 2023 em branco. Não imputamos taxas, não eliminamos extremos válidos nem escalonamos as medidas. O notebook apresenta as contagens e a tabela antes × depois.

Não há dados pessoais de vítimas, nem coleta própria. O risco de reidentificação é baixo no nível de grandes regiões e anos; não se deve tentar identificar pessoas. Há possíveis problemas de sub-registro, classificação de causas, revisões e diferenças internas ocultas pela agregação. A conferência com o Brasil é interna e não comprova a acurácia dos registros no mundo real.

O [Atlas 2025](https://www.ipea.gov.br/atlasviolencia/arquivos/artigos/5999-atlasdaviolencia2025.pdf) autoriza reprodução com citação e restringe uso comercial. A API JSON não apresenta licença específica nos metadados consultados. A licença da API continua pendente de confirmação para redistribuição pública; não atribuímos licença Creative Commons por suposição. O pacote foi preparado localmente para estudo e revisão.

**Protótipo acadêmico:** nenhum resultado substitui atendimento policial, jurídico, psicológico ou de saúde.

## Como executar

Extraia o ZIP inteiro. Abra `data-science/notebook.ipynb` no Jupyter, com a pasta `dados/` ao lado. Instale as bibliotecas de `data-science/requirements.txt` se necessário e execute todas as células. O notebook não precisa de internet para ler os dados.

No Colab, envie o ZIP, extraia-o em `/content` e entre na pasta `/content/Entrega2_DS_basica/data-science` antes de executar o notebook. Exemplo de célula inicial:

```python
import zipfile
from google.colab import files
enviados = files.upload()  # selecionar Entrega2_DS_basica.zip
with zipfile.ZipFile(next(iter(enviados))) as pacote:
    pacote.extractall('/content')
%cd /content/Entrega2_DS_basica/data-science
```

## Conferência dos requisitos

| Item | Conteúdo preparado | Pendência |
|---|---|---|
| 1. Escolha e justificativa | Fonte, órgão, links e relação com o tema | Confirmar adequação do recorte com o professor |
| 2. Governança e dicionário | Ficha, privacidade, risco de reidentificação e dicionários | Esclarecer licença específica da API para redistribuição |
| 3. Qualidade | Cinco dimensões, contagens e exemplos nos dados | Revisão dos integrantes |
| 4. Tratamento | Ordem, justificativas, antes × depois, brutos e CSV separado | Revisão dos integrantes |
| 5. EDA | Estatísticas, frequências, séries, relações, gráficos comentados e três respostas | Revisão dos integrantes |
| 6. Autoria e plano | Divisão proposta por seção e plano sem treinamento | Confirmar responsáveis após revisão; não é autoria já comprovada |
| 7. Repositório e organização | Pasta data-science e USO_IA.md preparados | Publicar no repositório, commits individuais reais e Kanban |

Ainda será necessário enviar os links no AVA. Não foram criados commits, histórico de duas semanas, aprovações ou atividades de Kanban. Essas etapas dependem do grupo e não são comprovadas pelo pacote local.

## Verificação de execução

O notebook foi executado integralmente em um kernel Python novo, com 15 células de código e sem erros. O CSV final contém 120 linhas e preserva os mesmos valores do CSV simplificado anterior. Os hashes dos sete arquivos brutos foram conferidos. As cinco taxas ausentes de 2023 foram mantidas.
