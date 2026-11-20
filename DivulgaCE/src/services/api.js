
const API_BASE_URL = 'https://api-dados-abertos.tce.ce.gov.br/sim';

export async function buscarMunicipios() {
    const response = await fetch(`${API_BASE_URL}/municipios`);

    if (!response.ok) {
        throw new Error('Erro ao buscar municípios');
    }

    const dados = await response.json();

    return dados;
}
