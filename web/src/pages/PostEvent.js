import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';

const PostEvent = ({ setUserdata }) => {

    return (
    <div className="container p-5">
      <div className="form-container mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="form-title text-uppercase text-primary" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Paskelbkite rengini</h2>
        <form id="postEventForm">
          <div className="form-group">
            <label htmlFor="eventTitle" style={{ fontSize: '1.2rem' }}>Pavadinimas</label>
            <input type="text" className="form-control" id="eventTitle" placeholder="Renginio Pavadinimas" required style={{ padding: '1rem', fontSize: '1rem' }} />
          </div>
          <div className="form-group">
            <label htmlFor="eventDate" style={{ fontSize: '1.2rem' }}>Data</label>
            <input type="date" className="form-control" id="eventDate" required style={{ padding: '1rem', fontSize: '1rem' }} />
          </div>
          <div className="form-group">
            <label htmlFor="eventTime" style={{ fontSize: '1.2rem' }}>Laikas</label>
            <input type="time" className="form-control" id="eventTime" required style={{ padding: '1rem', fontSize: '1rem' }} />
          </div>
          <div className="form-group">
            <label htmlFor="eventLocation" style={{ fontSize: '1.2rem' }}>Vieta</label>
            <input type="text" className="form-control" id="eventLocation" placeholder="Renginio Vieta" required style={{ padding: '1rem', fontSize: '1rem' }} />
          </div>
          <div className="form-group">
            <label htmlFor="eventCategory" style={{ fontSize: '1.2rem' }}>Kategorija</label>
            <select className="form-control" id="eventCategory" required style={{ padding: '1rem', fontSize: '1rem' }}>
              <option value="Paroda">Paroda</option>
              <option value="Koncertas">Koncertas</option>
              <option value="Seminaras">Seminaras</option>
              <option value="Muge">Muge</option>
              <option value="Spaktaklis">Spaktaklis</option>
              <option value="Kitas">Kitas</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ padding: '1rem', fontSize: '1.2rem' }}>Submit Event</button>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;
