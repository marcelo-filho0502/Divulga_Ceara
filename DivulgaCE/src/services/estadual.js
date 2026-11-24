import recorte from '../data/contratos.json';

const API = 'https://api-dados-abertos.cearatransparente.ce.gov.br/transparencia/contratos/contratos';
const PORTAL = 'https://cearatransparente.ce.gov.br/portal-da-transparencia/despesas';

export const fontesEstaduais = {
  contratos: `${API}?page=1&data_assinatura_inicio=01%2F01%2F2026&data_assinatura_fim=10%2F01%2F2026`,
  despesas: `${PORTAL}/despesas-do-poder-executivo-simplificado?locale=pt-BR`,
  empenhos: `${PORTAL}/notas-de-empenho-v2?locale=pt-BR`,
  governo: 'https://ww16.ce.gov.br/o-governo/',
};

export const recorteContratos = recorte;

export function urlContrato(id) {
  return `${API}/${encodeURIComponent(id)}`;
}
