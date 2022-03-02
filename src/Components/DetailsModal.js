import React from 'react';
import "./DetailsModal.css";

const DetailsModal = props => {
    return (
        <div id="modal">
            <div className="modal-content">
        <span className="close" onClick={props.onClose}>
          &times;
        </span>
                <h1>{props.event.title}</h1>
                <p>{props.event.content}</p><br/>
                <p>Commence le : {props.event.start}</p>
                <p>Fin le : {props.event.end}</p>
            </div>
        </div>
    );
};

export default DetailsModal;