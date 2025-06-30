import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const beaverTypes = {
  study: { 
    image: '/assets/images/beaver-study.png', 
    text: 'Учись, как бобр!' 
  },
  eat: { 
    image: '/assets/images/beaver-eat.png', 
    text: 'Не забудь подкрепиться!' 
  },
  gym: { 
    image: '/assets/images/beaver-gym.png', 
    text: 'Разминайся, как бобр!' 
  },
  sleep: { 
    image: '/assets/images/beaver-sleep.png', 
    text: 'Время спать!' 
  },
  default: { 
    image: '/assets/images/beaver-default.png', 
    text: 'Готов к работе!' 
  }
};

export default function Beaver({ currentTask, currentTime }) {
  const [beaverState, setBeaverState] = useState('default');

  useEffect(() => {
    if (!currentTask) {
      setBeaverState('sleep');
      return;
    }

    const task = currentTask.toLowerCase();
    if (task.includes('еда') || task.includes('завтрак') || task.includes('обед') || task.includes('ужин')) {
      setBeaverState('eat');
    } else if (task.includes('тренировка') || task.includes('зарядка')) {
      setBeaverState('gym');
    } else if (task.includes('сон')) {
      setBeaverState('sleep');
    } else if (task.includes('математика') || task.includes('анализ') || task.includes('python')) {
      setBeaverState('study');
    } else {
      setBeaverState('default');
    }
  }, [currentTask]);

  return (
    <motion.div
      className="beaver-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 10 }}
    >
      <motion.img 
        src={beaverTypes[beaverState].image} 
        alt="Бобр"
        whileHover={{ scale: 1.05 }}
      />
      <motion.div 
        className="speech-bubble"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {beaverTypes[beaverState].text}
      </motion.div>
    </motion.div>
  );
}