import historico from '../data/despesas-ce.json';

export const governadores = {
  cid: {
    nome: 'Cid Gomes', cargo: 'Governador', foto: 'cid.jpg',
    mandato: '2007–2014',
    posse: 'https://www.ce.gov.br/2011/01/01/posse-cid-gomes-reafirma-compromisso-com-os-cearenses/',
    credito: 'Agência Senado',
    fonteFoto: 'https://commons.wikimedia.org/wiki/File:Cid_Gomes_Senador_(cropped).jpg',
  },
  camilo: {
    nome: 'Camilo Santana', cargo: 'Governador', foto: 'camilo.jpg',
    mandato: '2015–02/04/2022',
    posse: 'https://www.ce.gov.br/vicegov/2019/01/02/camilo-santana-e-izolda-cela-tomam-posse-e-anunciam-secretariado-para-segundo-mandato/',
    credito: 'Casa Civil do Ceará',
    fonteFoto: 'https://previodata.casacivil.ce.gov.br/docs/LIVRO_SUPERACAO_25X25_CM_DIGITAL.pdf#page=18',
  },
  izolda: {
    nome: 'Izolda Cela', cargo: 'Governadora', foto: 'izolda.jpg',
    mandato: '02/04/2022–31/12/2022',
    posse: 'https://www.ce.gov.br/2022/04/03/izolda-cela-e-a-primeira-governadora-efetiva-do-ceara-em-489-anos/',
    credito: 'Casa Civil do Ceará',
    fonteFoto: 'https://previodata.casacivil.ce.gov.br/docs/LIVRO_SUPERACAO_25X25_CM_DIGITAL.pdf#page=7',
  },
  elmano: {
    nome: 'Elmano de Freitas', cargo: 'Governador', foto: 'elmano.jpg',
    mandato: 'Desde 01/01/2023',
    posse: 'https://www.ce.gov.br/sde/2023/01/02/elmano-de-freitas-toma-posse-como-governador-do-ceara-e-defende-justica-e-inclusao-social/',
    credito: 'Governo do Ceará',
    fonteFoto: 'https://ww16.ce.gov.br/o-governo/',
  },
};

export function gestoresDoAno(ano) {
  if (ano === 2014) return ['cid'];
  if (ano < 2022) return ['camilo'];
  if (ano === 2022) return ['camilo', 'izolda'];
  return ['elmano'];
}

const fimFevereiro2022 = 286048040312;
const fimAbril2022 = 739708186981;
const total2022 = historico.find(({ ano }) => ano === 2022).total;

export const periodosDe2022 = [
  { gestores: ['camilo'], periodo: 'Janeiro–fevereiro', centavos: fimFevereiro2022 },
  { gestores: ['camilo', 'izolda'], periodo: 'Março–abril', centavos: fimAbril2022 - fimFevereiro2022 },
  { gestores: ['izolda'], periodo: 'Maio–dezembro', centavos: total2022 - fimAbril2022 },
];

const tesouro = 'https://apidatalake.tesouro.gov.br/ords/siconfi/tt';

export function relatorioEstadual(ano, bimestre = 6) {
  if (ano === 2014) {
    return `${tesouro}/dca?an_exercicio=2014&no_anexo=DCA-Anexo%20I-E&id_ente=23`;
  }

  return `${tesouro}/rreo?an_exercicio=${ano}&nr_periodo=${bimestre}&co_tipo_demonstrativo=RREO&no_anexo=RREO-Anexo%2002&id_ente=23`;
}

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatarDespesa(centavos) {
  return moeda.format(centavos / 100);
}
