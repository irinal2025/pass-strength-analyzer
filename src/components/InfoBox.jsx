import React from 'react';

const Modal = ({ show, handleClose }) => {
  if (!show) return null; // Jos show on false, ei näytetä mitään

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Peittää taustaa
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        width: '300px',
        textAlign: 'center'
      }}>
        <h2>Password copied!</h2>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
