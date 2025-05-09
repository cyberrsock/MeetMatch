import React, { useState, useEffect } from 'react';
import './CreateModal.css'

const CreateModal = ({ showModal, closeModal, handleUpload, modalName="Создание встречи", modalBtn="Создать", name_="", description_="", count_=2, date_="" }) => {
    const [name, setName] = useState(name_);
    const [description, setDescription] = useState(description_);
    const [count, setCount] = useState(count_);
    const [date, setDate] = useState(date_);
    const [minDate, setMinDate] = useState('');
    const maxDate = '2100-01-01';

    useEffect(() => {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();

      let currentDate = yyyy + '-' + mm + '-' + dd;
      setMinDate(currentDate);
    }, []);

    const createSession = (event) => {
        event.preventDefault();
        if (Number(count) <= 0)
        {
          handleUpload(name, description, date, 1);
        }
        else
        {
          handleUpload(name, description, date, count);
        }
    }

    if (!showModal) {
        return null;
    }

    const handleTitleChange = (e) => {
        setName(e.target.value);
      };
    
      const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
      };
      
      const handleDateChange = (e) => {
        setDate(e.target.value);
      };
    
      const handleParticipantsChange = (e) => {
        const num = parseInt(e.target.value, 10);
        if (num < 1) {
          setCount(1);
        } else if (num > 100) {
          setCount(100);
        } else {
          setCount(num);
        }
      };

    return (
        <div className="upload-modal">
        <form onSubmit={createSession}>
        <div className="upload-modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h1>{modalName}</h1>
          <div className="input-group">
            <input
              className="session-input"
              type="text"
              value={name}
              onChange={(e) => handleTitleChange(e)}
              placeholder="Название"
              required
              maxlength="100"
            />
            <input
              className="session-input"
              type="text"
              value={description}
              onChange={(e) => handleDescriptionChange(e)}
              placeholder="Сообщение для участников"
              maxlength="100"
            />
            <div  style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: "space-between" }}>
              <p>Дата встречи:</p>
              <input
              className="session-input"
              type="date"
              value={date}
              onChange={handleDateChange}
              placeholder="Дата встречи"
              style={{ width: '50%' }}
              min={minDate}
              max={maxDate}
              required
            />
            </div>
            <div className="input-group" style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: "space-between" }}>
            <p>Количество участников:</p>
              <input
                type="number"
                className="session-input"
                value={count}
                onChange={(e) => handleParticipantsChange(e)}
                min={1}
                max={100}
                style={{ width: '25%' }}
                required
              />
          </div>
          {/* <input
              type="range"
              id="participantRange"
              name="participantRange"
              min={1}
              max={100}
              value={count}
              onChange={(e) => handleParticipantsChange(e)}
              style={{ width: '100%' }}
              /> */}
          </div>
          <button className="modal-button">{modalBtn}</button>
        </div>
        </form>
      </div>
    );
};

export default CreateModal;
