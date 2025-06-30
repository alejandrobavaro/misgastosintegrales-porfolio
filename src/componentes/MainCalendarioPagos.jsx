import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import '../assets/scss/_03-Componentes/_MainCalendarioPagos.scss';
import { FaCheckCircle } from 'react-icons/fa';
import { useHeaderNotifications } from './HeaderNotificacionesContext';

const MainCalendarioPagos = ({ highlightedDay, onDaySelect }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [reminders, setReminders] = useState({});

  const { addNotification, removeNotification } = useHeaderNotifications();

  // Memoiza la fecha de hoy para evitar que cause renders infinitos
  const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  useEffect(() => {
    // Actualiza notificaciones solo cuando hay recordatorios para hoy
    if (reminders[todayKey] && reminders[todayKey].length > 0) {
      addNotification('today', reminders[todayKey].length);
    } else {
      removeNotification('today');
    }
  }, [reminders, todayKey, addNotification, removeNotification]);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleAddReminder = (day) => {
    Swal.fire({
      title: `Agregar recordatorio para el ${day}/${currentMonth + 1}/${currentYear}`,
      input: 'text',
      inputPlaceholder: 'Escribe tu recordatorio aquí...',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newReminders = {
          ...reminders,
          [`${currentYear}-${currentMonth + 1}-${day}`]: [
            ...(reminders[`${currentYear}-${currentMonth + 1}-${day}`] || []),
            result.value,
          ],
        };
        setReminders(newReminders);
      }
    });
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    for (let day = 1; day <= totalDays; day++) {
      const key = `${currentYear}-${currentMonth + 1}-${day}`;
      const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      const isHighlighted = key === highlightedDay;

      days.push(
        <div
          key={day}
          className={`day ${isToday ? 'highlight' : ''} ${isHighlighted ? 'highlighted-day' : ''}`}
          onClick={() => handleAddReminder(day)}
        >
          <span className="date">{day}</span>
          {reminders[key] && <FaCheckCircle className="reminder-icon" />}
        </div>
      );
    }
    return days;
  };

  const renderRemindersList = () => {
    const currentMonthReminders = Object.keys(reminders)
      .filter(key => {
        const [year, month] = key.split('-');
        return parseInt(year) === currentYear && parseInt(month) === currentMonth + 1;
      })
      .sort((a, b) => {
        const dayA = parseInt(a.split('-')[2]);
        const dayB = parseInt(b.split('-')[2]);
        return dayA - dayB;
      });

    return (
      <ul>
        {currentMonthReminders.map(dateKey => (
          reminders[dateKey].map((reminder, index) => {
            const [year, month, day] = dateKey.split('-');
            return (
              <li key={`${dateKey}-${index}`}>
                <strong>{`${day}/${month}/${year}`}:</strong> {reminder}
              </li>
            );
          })
        ))}
      </ul>
    );
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="calendar-outer-container">
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>Anterior</button>
          <h2>{monthNames[currentMonth]} {currentYear}</h2>
          <button onClick={handleNextMonth}>Siguiente</button>
        </div>
        <div className="calendar-grid">
          {renderDays()}
        </div>
      </div>

      <div className="reminders-container">
        <h3>Recordatorios para {monthNames[currentMonth]} {currentYear}:</h3>
        {renderRemindersList()}
      </div>
    </div>
  );
};

export default MainCalendarioPagos;
