import React from 'react';
import { motion } from 'framer-motion';
import './Header.css'; // Создадим этот файл позже

const days = [
  { id: 'monday', name: 'ПН' },
  { id: 'tuesday', name: 'ВТ' },
  { id: 'wednesday', name: 'СР' },
  { id: 'thursday', name: 'ЧТ' },
  { id: 'friday', name: 'ПТ' },
  { id: 'saturday', name: 'СБ' },
  { id: 'sunday', name: 'ВС' }
];

export default function Header({ currentDay, setCurrentDay }) {
  return (
    <header className="header">
      <nav>
        <ul className="days-list">
          {days.map(day => (
            <motion.li
              key={day.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className={`day-button ${currentDay === day.id ? 'active' : ''}`}
                onClick={() => setCurrentDay(day.id)}
              >
                {day.name}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}