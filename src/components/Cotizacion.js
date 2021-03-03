import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement();

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight:bold;
    }
`;
const Precio = styled.p`
    font-size: 30px;
    span {
        font-weight:bold;
    }
`
export const Cotizacion = ({resultado}) => {

    const [modal, setmodal] = useState(false)

    
    useEffect( () => {
        setTimeout(() => {
            setmodal(true);
        }, 5000);
    },[resultado])
        
    const handle = () => {
        setmodal(false);
    }

    if(Object.keys(resultado).length === 0) return null;

   
    return ( 
        <Modal
          isOpen={modal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
            <Precio>El precio es: <span>{resultado.PRICE}</span> </Precio>
            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span> </Info>
            <Info>Precio más bajo del día: <span>{resultado.LOWDAY}</span> </Info>
            <Info>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span> </Info>
            <Info>Última Actualización: <span>{resultado.LASTUPDATE}</span> </Info>
           <button onClick={handle}>cerrar</button>
        </Modal>
     );
}