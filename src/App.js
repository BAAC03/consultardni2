import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [dni, setDni] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = `https://apiperu.dev/api/dni/${dni}?api_token=35e06a866ec146bbef9a8e7091f0e2fdaabb398d49424ebd8425b09bd78219a5`;
      const response = await axios.get(apiUrl, {
        httpsAgent: {
          rejectUnauthorized: false
        }
      });

      const { data } = response;
      if (data.success) {
        const { nombre_completo, nombres, apellido_paterno, apellido_materno } = data.data;
        setResponseData({ nombre_completo, nombres, apellido_paterno, apellido_materno });
      } else {
        setError('No se pudo obtener la información del DNI.');
      }
    } catch (err) {
      setError(`Error al realizar la solicitud: ${err.message}`);
    }
  };
  return (
    <div className='body'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form__title'>CONSULTAR DNI</div>
        <div className='form__container'>
          <div className='form__group'>
            <input
              className='form__input'
              placeholder=' '
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <label className='form__label'>DNI:</label>
          </div>
          <input type='submit' className='form__submit' value='CONSULTAR'></input>
        </div>      
        {error ? (
          <div>Error: {error}</div>
        ) : responseData ? (
          <div className='data'>
            <h2>Información del DNI:</h2>

            <h4>Nombre Completo:</h4>
            <p>{responseData.nombre_completo}</p>

            <h4>Nombres:</h4>
            <p>{responseData.nombres}</p>

            <h4>Apellido Paterno:</h4>
            <p>{responseData.apellido_paterno}</p>

            <h4>Apellido Materno:</h4>
            <p>{responseData.apellido_materno}</p>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default App;
