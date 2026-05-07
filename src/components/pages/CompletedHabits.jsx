import { useEffect, useState } from "react";
import localforage from "localforage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CompletedHabits() {
  const [completedHabits, setCompletedHabits] = useState([]);

  const notifyDelete = () => toast.info("Completed habit deleted.");

  useEffect(() => {
    const loadCompletedHabits = async () => {
      const stored = (await localforage.getItem("completedHabits")) || [];
      setCompletedHabits(stored);
    };
    loadCompletedHabits();
  }, []);

  const handleDeleteCompletedHabit = async (habitId) => {
    const updatedCompleted = completedHabits.filter(
      (habit) => habit.id !== habitId
    );
    setCompletedHabits(updatedCompleted);
    await localforage.setItem("completedHabits", updatedCompleted);
    notifyDelete();
  };

  return (
    <div className="completed-habits-card-container">
      {completedHabits.length === 0 ? (
        <p>No completed habits yet</p>
      ) : (
        <>
          {completedHabits.map((habit) => (
            <div
              key={habit.id}
              className="habit-card-wrapper"
              style={{ backgroundColor: habit.color || "#4CAF50" }}
            >
              {habit.image && (
                <img
                  src={habit.image}
                  alt={habit.nodeTitle}
                  className="habit-image"
                />
              )}
              <h3 className="habit-title">{habit.nodeTitle}</h3>
              <p className="habit-description">{habit.nodeDescription}</p>
              <h4 className="days">{habit.daysOption}</h4>

              <button
                onClick={() => handleDeleteCompletedHabit(habit.id)}
                className="delete-habit-button"
              >
                Delete
              </button>
            </div>
          ))}
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
