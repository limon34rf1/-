import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Timeline from './components/Timeline';
import Beaver from './components/Beaver';
import Footer from './components/Footer';
import './styles/globals.css';
import './styles/animations.css';

const schedule = {
  monday: [
    { time: '09:00-09:30', task: 'зарядка', intensity: 'normal' },
    { time: '09:30-10:00', task: 'завтрак', intensity: 'normal' },
    { time: '10:00-12:00', task: 'олимпиадная математика, всош, вступительные в лицей', intensity: 'hard' },
    { time: '12:15-13:45', task: 'дз по математике, всош, ОГЭ математика/физика', intensity: 'normal' },
    { time: '13:45-14:30', task: 'обед', intensity: 'normal' },
    { time: '14:30-16:30', task: 'анализ данных и статистика', intensity: 'normal' },
    { time: '17:00-18:30', task: 'алгоритмы, ML, плюсы/питон', intensity: 'hard' },
    { time: '18:30-19:00', task: 'тренировка, прогулка, тик-ток', intensity: 'normal' },
    { time: '19:00-19:45', task: 'ужин, отдых', intensity: 'normal' },
    { time: '19:45-21:30', task: 'ОГЭ, дз по физике/математике', intensity: 'normal' },
    { time: '22:00-23:30', task: 'всош индивидуальный, практика анализа данных', intensity: 'hard' },
    { time: '23:30-00:00', task: 'личная разгрузка', intensity: 'normal' },
    { time: '00:00-01:00', task: 'сон', intensity: 'normal' }
  ],
  tuesday: [
    { time: '09:00-09:30', task: 'зарядка', intensity: 'normal' },
    { time: '09:30-10:00', task: 'завтрак', intensity: 'normal' },
    { time: '10:00-12:00', task: 'олимпиадная математика: повторение, разбор ошибок', intensity: 'hard' },
    { time: '12:15-13:45', task: 'физика: теория + задачи', intensity: 'normal' },
    { time: '13:45-14:30', task: 'обед', intensity: 'normal' },
    { time: '14:30-16:30', task: 'статистика: завершение курса, практика', intensity: 'normal' },
    { time: '17:00-18:30', task: 'Python: основы ML', intensity: 'hard' },
    { time: '18:30-19:00', task: 'тренировка, прогулка', intensity: 'normal' },
    { time: '19:00-19:45', task: 'ужин', intensity: 'normal' },
    { time: '19:45-21:30', task: 'анализ данных: практика', intensity: 'normal' },
    { time: '22:00-23:30', task: 'олимпиадная практика (математика/информатика)', intensity: 'hard' },
    { time: '23:30-00:00', task: 'отдых', intensity: 'normal' },
    { time: '00:00-01:00', task: 'сон', intensity: 'normal' }
  ],
  wednesday: [
    { time: '09:00-09:30', task: 'зарядка', intensity: 'normal' },
    { time: '09:30-10:00', task: 'завтрак', intensity: 'normal' },
    { time: '10:00-12:00', task: 'олимпиадная математика: практика', intensity: 'hard' },
    { time: '12:15-13:45', task: 'анализ данных: закрепление', intensity: 'normal' },
    { time: '13:45-14:30', task: 'обед', intensity: 'normal' },
    { time: '14:30-16:30', task: 'лёгкая тема по выбору', intensity: 'light' },
    { time: '16:30-19:30', task: 'длинная прогулка, встреча с другом/подругой', intensity: 'normal' },
    { time: '19:30-20:00', task: 'ужин', intensity: 'normal' },
    { time: '20:00-21:30', task: 'лёгкая практика Python/математики', intensity: 'light' },
    { time: '22:00-00:00', task: 'отдых, хобби', intensity: 'normal' },
    { time: '00:00-01:00', task: 'сон', intensity: 'normal' }
  ],
  thursday: [
    { time: '09:00-09:30', task: 'зарядка', intensity: 'normal' },
    { time: '09:30-10:00', task: 'завтрак', intensity: 'normal' },
    { time: '10:00-12:00', task: 'олимпиадная математика: новые задачи', intensity: 'hard' },
    { time: '12:15-13:45', task: 'физика: практика', intensity: 'normal' },
    { time: '13:45-14:30', task: 'обед', intensity: 'normal' },
    { time: '14:30-16:30', task: 'анализ данных: углублённая практика', intensity: 'normal' },
    { time: '17:00-18:30', task: 'Python: алгоритмы', intensity: 'hard' },
    { time: '18:30-19:00', task: 'тренировка', intensity: 'nor
