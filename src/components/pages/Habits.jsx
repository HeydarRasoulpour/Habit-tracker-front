import { useEffect, useState } from "react";

import localforage from "localforage";

import { getHabitsApi } from "../service/habitService";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getHabitsApi();
        setHabits(data.results || []);
      } catch (error) {
        console.error("Failed to load habits:", error.message);
      }
    };
    fetchHabits();
  }, []);

  {habits.image_url && (
    <img
      src={habits.image_url}
      alt={habits.title}
      className="habit-image"
    />
  )}

  const handleCompleteHabit = async (habitId) => {
    const habitToComplete = habits.find((h) => h.id === habitId);
    const updatedHabits = habits.filter((h) => h.id !== habitId);
    setHabits(updatedHabits);
    await localforage.setItem("habits", updatedHabits);

    const updatedCompleted = [...completedHabits, habitToComplete];
    setCompletedHabits(updatedCompleted);
    await localforage.setItem("completedHabits", updatedCompleted);
  };

  return (
    <div className="habits-page">
      <h2>My Habits</h2>
      <div className="habits-list">
        {habits.length === 0 ? (
          <p>No habits to show</p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.habit_id}
              className="habit-card"
              style={{ backgroundColor: habit.color || "#4CAF50" }}
            >
              {habit.image_url && (
                <img
                  src={habit.image_url}
                  alt={habit.title}
                  className="habit-image"
                />
              )}
              <div className="habits-info-wrapper">
                <span>{habit.title}</span>
                <span>{habit.description}</span>
                <span>{habit.frequency_per_week}</span>
                <button onClick={() => handleCompleteHabit(habit.habit_id)}>
                  Completed
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


