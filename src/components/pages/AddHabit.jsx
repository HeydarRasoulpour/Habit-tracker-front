
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addHabitApi } from "../service/habitService";

export default function AddHabit() {
  const [habitForm, setHabitForm] = useState({
    title: "",
    description: "",
    color: "#e6720d",
    frequencyPerWeek: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const mapDaysToNumber = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newHabit = {
        title: habitForm.title,
        description: habitForm.description,
        color: habitForm.color,
        frequency_per_week:
          mapDaysToNumber[habitForm.frequencyPerWeek],
        start_date: habitForm.startDate,
        end_date: habitForm.endDate,
        is_active: habitForm.isActive,
      };

      
      await addHabitApi(newHabit, imageFile);

      toast.success("Habit saved successfully!");

      setHabitForm({
        title: "",
        description: "",
        color: "#e6720d",
        frequencyPerWeek: "",
        startDate: "",
        endDate: "",
        isActive: true,
      });

      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="new-habit-container">
      <form onSubmit={handleSubmit} className="new-habit-form">
        <div className="form-info-wrapper">
          <input className="title-input"
            type="text"
            name="title"
            placeholder="Habit Title"
            value={habitForm.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Habit Description"
            rows={23}
            cols={20}
            value={habitForm.description}
            onChange={handleChange}
          />
          <div className="select-day-wrapper">
            <p>Select days:</p>
            <div className="days-option">
              {["1", "2", "3", "4", "5", "6"].map((day) => (
                <label key={day}>
                  <input
                    type="radio"
                    name="frequencyPerWeek"
                    value={day}
                    checked={habitForm.frequencyPerWeek === day}
                    onChange={handleChange}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <div className="date-wrapper">
            <div>
              <label className="date-label">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={habitForm.startDate}
                onChange={handleChange}
              />
            </div>
            <div>

              <label className="date-label">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={habitForm.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="color-wrapper">
            <label>Pick a color:</label>
            <div className="color-input-wrapper">

              <input className="color-input"
                type="color"
                name="color"
                value={habitForm.color}
                onChange={handleChange}
                />
            </div>
          </div>

          <button type="submit" className="submit-button">Save Habit</button>
        </div>
          <div className="upload-wrapper">
            <label className="upload-button "> Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
           {imagePreview && <img src={imagePreview} alt="preview" className="upload-image "/>}
          </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </form>
    </div>
  );
}