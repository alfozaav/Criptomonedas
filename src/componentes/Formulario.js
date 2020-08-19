import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import PropTypes from 'prop-types';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarCriptomoneda, guardarMoneda}) => {

    //  State del listado de criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estador Unidos'},
        {codigo: 'MXM', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    //  Utilizar useMoneda
    const [moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //  Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    //  Ejecutar el llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data)
        }
        consultarAPI();
    }, []);

    //  Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //  Validar si ambos campos están llenos
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        //  Pasar los dato al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            
            <SelectMonedas />

            <SelectCripto />

            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
     );
}

Formulario.propTypes = {
    guardarCriptomoneda: PropTypes.func.isRequired,
    guardarMoneda: PropTypes.func.isRequired
}
 
export default Formulario;