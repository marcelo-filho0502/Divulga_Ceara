import { useEffect, useState } from 'react';
import { buscarMunicipios } from '../../services/api';

function Municipios() {
  const [municipios, setMunicipios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarMunicipios() {
      try {
        const dados = await buscarMunicipios();
        if (ativo) setMunicipios(dados.elements || []);
      } catch {
        if (ativo) setErro(true);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarMunicipios();
    return () => { ativo = false; };
  }, []);

  return (
    <section className="info-card page-stack" aria-labelledby="municipios-title">
      <h2 id="municipios-title">Municípios do Ceará</h2>
      <div aria-busy={carregando}>
        {carregando ? (
          <>
            <p>Carregando municípios…</p>
            <div className="skeleton-list" aria-hidden="true"><span /><span /><span /></div>
          </>
        ) : erro ? (
          <p role="alert">Não foi possível carregar os municípios. Recarregue a página para tentar novamente.</p>
        ) : municipios.length ? (
          <>
            <p role="status">Total encontrado: {municipios.length}</p>
            <ul className="plain-data-list">
              {municipios.map((municipio) => (
                <li key={municipio.codigo_municipio}>{municipio.nome_municipio}</li>
              ))}
            </ul>
          </>
        ) : <p role="status">Nenhum município disponível.</p>}
      </div>
    </section>
  );
}

export default Municipios;
