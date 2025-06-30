import { motion } from 'framer-motion';

export default function Timeline({ day, schedule, activeIndex }) {
  return (
    <div className="timeline">
      {schedule.map((item, index) => (
        <motion.div
          key={`${day}-${index}`}
          className={`timeline-block ${index < activeIndex ? 'past' : ''} ${index === activeIndex ? 'active' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          <div className="time">{item.time}</div>
          <div className={`intensity ${item.intensity}`} />
          <div className="task">{item.task}</div>
        </motion.div>
      ))}
    </div>
  );
}