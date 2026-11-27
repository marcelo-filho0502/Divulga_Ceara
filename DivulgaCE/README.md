# DivulgaCE

Painel de transparência para explorar despesas e contratos do Governo do Estado do Ceará. O projeto reúne recortes de dados públicos e links para os registros oficiais.

## O que o painel oferece

- **Visão geral** com o total de despesas liquidadas no exercício mais recente da série e o link para o relatório oficial.
- **Histórico de gastos** de 2014 a 2025, com filtros por área e ano e detalhamento das finalidades orçamentárias.
- **Governadores** com valores por gestão e detalhamento dos períodos de transição de 2022 conforme a granularidade dos relatórios disponíveis.
- **Despesas** com acesso à execução orçamentária e às notas de empenho no Ceará Transparente.
- **Contratos** com indicadores do recorte disponível, gráfico de assinaturas, busca e ordenação por assinatura ou valor.

## Executar localmente

Na pasta que contém este README, com Node.js compatível com a versão do Vite do projeto (20.19+ ou 22.12+), execute:

```sh
npm ci
npm run dev
```

Abra o endereço local exibido no terminal.

```sh
npm run lint     # Verifica o código com Oxlint
npm run build    # Gera os arquivos de produção em dist/
npm run preview  # Serve localmente o build gerado
```

## Dados e fontes

A série de despesas apresenta valores nominais liquidados e exclui despesas intraorçamentárias. A fonte histórica é o Siconfi, RREO Anexo 02, com a DCA, Anexo I-E, para 2014. O painel indica o período e a data de consulta do recorte de contratos e oferece links para os registros originais. [Tesouro Transparente](https://www.tesourotransparente.gov.br/ckan/dataset/api-rreo-entes) · [Ceará Transparente](https://cearatransparente.ce.gov.br/)

## Frontend

O projeto usa React, Vite, CSS e ícones Lucide. As telas ficam em `src/pages/`, os componentes em `src/components/` e os dados locais em `src/data/`. As variáveis de design ficam em `src/index.css`. A interface inclui navegação por teclado, foco visível e suporte à preferência por movimento reduzido.
