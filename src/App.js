import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import imagen from './cryptomonedas.png';
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion';
import Spinner from './componentes/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: white;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background: #66a2fe;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [spinner, guardarSpinner] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      //  Evitamos la ejecución la 1° vez
      if (moneda === '') return;

      //  Consultar la API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //  Mostrar el Spinner
      guardarSpinner(true);

      //  Ocultar Spinner y mostrar el resultado
      setTimeout(() => {

        //  Cambiar el estado del Spinner
        guardarSpinner(false);

        //  Guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

      }, 3000)
    }

    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  //  Mostrar Spinner o Resultado
  const componente = (spinner) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
