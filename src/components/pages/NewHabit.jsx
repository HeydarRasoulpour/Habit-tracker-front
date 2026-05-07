import { useEffect, useState } from "react";
import AddHabit from "./AddHabit";

export default function Habits() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [habits, setHabits] = useState([]);

  const handelAddHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
  };

  return (
    <div>
      <AddHabit
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handelAddHabit}
      />
      <div>
        {habits.map((habit, index) => (
          <div key={index}>
            <h2>{habit.title}</h2>
            <h3>{habit.description}</h3>
            <h3>{habit.days}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
