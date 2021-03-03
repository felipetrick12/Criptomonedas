import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { useMoneda } from '../hooks/useMoneda';
import { useCriptomoneda } from '../hooks/useCriptomoneda';
import axios from 'axios';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

export const Formulario = ({guardarMoneda,guardarCriptoMoneda}) => {

    const Monedas =[
        {codigo: 'USD',nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN',nombre: 'Peso Mexicao'},
        {codigo: 'EUR',nombre: 'Euro'},
        {codigo: 'GBP',nombre: 'Libra Esterlina'},
        {codigo: 'COD',nombre: 'Peso Colombiano'}
    ]

    const [ moneda, SelectMoneda ] = useMoneda('Elige tu Moneda', '', Monedas);
    const [ Select, guardarSelect] = useState([]);
    const [ criptoMoneda, SelectCripto] = useCriptomoneda('Elige tu CriptoMoneda', '',Select);
    const [error, setError] = useState(false);
  
    const onSubmit=(e)=> {
        e.preventDefault();
      
        if(moneda.trim() === ""|| criptoMoneda.trim() === "") {
            setError(true)
            return ;
        }else{
            setError(false)
        }
        guardarMoneda(moneda);
        guardarCriptoMoneda(criptoMoneda);
    }

    useEffect( () => {
        
        const consultarApi=async ()=> {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const {data} = await axios.get(url);
            const {Data}=data;

            guardarSelect(Data);
           
        }
       
        consultarApi()
        
    }, [])
    

    return (
        <form
            onSubmit={onSubmit}
            
        >
            {
                error ? <p className="alert alert-danger">Campos Obligatorios</p>: null
            }
            <SelectMoneda/>

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
              
            />
        </form>
    )
}
