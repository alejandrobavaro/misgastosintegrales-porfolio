import React from 'react';
import '../assets/scss/_03-Componentes/_MainTemporizadorTimePicker.scss';

const MainTemporizadorTimePicker = ({ hours, minutes, seconds, setHours, setMinutes, setSeconds }) => {
  return (
    <div className="main-temporizador-time-picker">
      <div className="time-picker-group">
        <label htmlFor="hours">Horas</label>
        <input
          id="hours"
          type="number"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          min="0"
          max="23"
          step="1"
        />
      </div>
      <div className="time-picker-group">
        <label htmlFor="minutes">Minutos</label>
        <input
          id="minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          min="0"
          max="59"
          step="1"
        />
      </div>
      <div className="time-picker-group">
        <label htmlFor="seconds">Segundos</label>
        <input
          id="seconds"
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          min="0"
          max="59"
          step="1"
        />
      </div>
    </div>
  );
};

export default MainTemporizadorTimePicker;
