// src/components/Gamification.js
import React, { useState } from 'react';
import './Gamification.css';
import Sidebar from '../layout/Sidebar';

const Gamification = () => {
  // Sample data for achievements and rewards
  const initialAchievements = [
    { title: 'First Budget Set', description: 'Congratulations on setting your first budget!', icon: '🏅', completed: false, progress: 0, target: 1 },
    { title: 'Spending Tracker', description: 'You have tracked your spending for 7 consecutive days!', icon: '📊', completed: false, progress: 0, target: 7 },
    { title: 'Savings Goal Achieved', description: 'You saved $100 towards your goal!', icon: '💰', completed: false, progress: 0, target: 100 },
    { title: 'Monthly Milestone', description: 'You have successfully managed your finances for a month!', icon: '🎉', completed: false, progress: 0, target: 30 },
  ];

  const [achievements, setAchievements] = useState(initialAchievements);
  const [notification, setNotification] = useState('');

  const updateProgress = (index, amount) => {
    const newAchievements = [...achievements];
    newAchievements[index].progress += amount;

    // Check for completion
    if (newAchievements[index].progress >= newAchievements[index].target && !newAchievements[index].completed) {
      newAchievements[index].completed = true;
setNotification(`You've completed: ${newAchievements[index].title}!`);

    }

    setAchievements(newAchievements);
  };

  const claimReward = (index) => {
    if (achievements[index].completed) {
        setNotification(`Reward claimed for: ${achievements[index].title}`);

    } else {
      setNotification('You need to complete the achievement first!');
    }
  };

  return (
<div className='outer-gamification'>
    <Sidebar/>
    <div className="gamification-container">
      <h1 className="gamification-title">Gamification</h1>
      {notification && <div className="notification">{notification}</div>}
      <div className="achievements">
        {achievements.map((achievement, index) => (
          <div className="achievement-card" key={index}>
            <span className="achievement-icon">{achievement.icon}</span>
            <h2 className="achievement-title">{achievement.title}</h2>
            <p className="achievement-description">{achievement.description}</p>
            <p className="achievement-progress">Progress: {achievement.progress} / {achievement.target}</p>
            <button onClick={() => updateProgress(index, 1)} className="progress-button">Increase Progress</button>
            <button onClick={() => claimReward(index)} className="claim-button">Claim Reward</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Gamification;