import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Timeline from './components/Timeline';
import Beaver from './components/Beaver';
import './styles/globals.css';
import './styles/animations.css';

const schedule = {
  monday: [
    { time: '09:00-09:30', task: 'зарядка', intensity: 'normal' },
    { time: '09:30-10:00', task: 'завтрак', intensity: 'light' },
    // ... остальные дни
  ],
  // ... другие дни
};

export default function App() {
  const [currentDay, setCurrentDay] = useState('monday');
  const [currentTime, setCurrentTime] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef();

  // Определяем московское время
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const moscowTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
      setCurrentTime(moscowTime);
      
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      setCurrentDay(days[moscowTime.getDay()]);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Автоскролл к текущему блоку
  useEffect(() => {
    if (!currentTime || !timelineRef.current) return;

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentBlocks = schedule[currentDay];

    for (let i = 0; i < currentBlocks.length; i++) {
      const [start, end] = currentBlocks[i].time.split('-').map(t => {
        const [h, m] = t.split(':').map(Number);
        return h + m / 60;
      });

      if (currentHour + currentMinute/60 < end) {
        setActiveIndex(i);
        timelineRef.current.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
    }
  }, [currentDay, currentTime]);

  return (
    <div className="app">
      <Header currentDay={currentDay} setCurrentDay={setCurrentDay} />
      
      <div className="timeline-container" ref={timelineRef}>
        <AnimatePresence mode="wait">
          <Timeline 
            day={currentDay} 
            schedule={schedule[currentDay]} 
            activeIndex={activeIndex}
          />
        </AnimatePresence>
      </div>

      <Beaver 
        currentTask={schedule[currentDay]?.[activeIndex]?.task} 
        currentTime={currentTime}
      />
    </div>
  );
}
useEffect(() => {
  if (currentTime?.getHours() > 0 || currentTime?.getHours() < 6) {
    setBeaverState('sleep');
  }
}, [currentTime]);