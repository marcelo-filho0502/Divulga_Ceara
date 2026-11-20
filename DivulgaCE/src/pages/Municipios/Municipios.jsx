import { useEffect, useState } from 'react';
import { buscarMunicipios } from '../../services/api';

function Municipios() {
    const [municipios, setMunicipios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function carregarMunicipios() {
            try {
                const dados = await buscarMunicipios();

                setMunicipios(dados.elements || []);
            } catch (error) {
                setErro(error.message);
            } finally {
                setCarregando(false);
            }
        }

        carregarMunicipios();
    }, []);

    if (carregando) {
        return <p>Carregando municípios...</p>;
    }

    if (erro) {
        return <p>Erro: {erro}</p>;
    }

    return (
        <div>
            <h1>Municípios do Ceará</h1>

            <p>Total encontrado: {municipios.length}</p>

            <ul>
                {municipios.map((municipio) => (
                    <li key={municipio.codigo_municipio}>
                        {municipio.nome_municipio}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Municipios;
