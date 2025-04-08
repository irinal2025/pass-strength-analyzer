import React from 'react';
import './InfoBox.css'; 

const Modal = ({ show, handleClose }) => {
  if (!show) return null; // Jos show on false, ei näytetä mitään

  return (
    <div className="infobox">
      <div className="infobox-content">
        <h2>This password is strong enough</h2>
        <p>If it&apos;s new, you can return to the previous view and copy it by clicking the &quot;Copy password 📋&quot; button.</p>
        <button className="close-btn" onClick={handleClose} aria-label="Close modal window">Close</button>
      </div>
    </div>
  );
};

export default Modal;
