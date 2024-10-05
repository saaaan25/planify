// src/pages/Panel.jsx
import React from 'react';
import { useParams } from 'react-router-dom'; 

const Space = () => {
  const { id } = useParams();  // Obtenemos el ID del panel desde la URL
  return (
    <div>
      <h1>Panel {id}</h1>
      <p>Contenido del panel {id}.</p>
    </div>
  );
}

export default Space;
