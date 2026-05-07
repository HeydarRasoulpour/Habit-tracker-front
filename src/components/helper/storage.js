import localforage from "localforage";

localforage.config({
  name: "HabitSpark",
  storeName: "habitspark_store",
  description: "User data & images for HabitSpark",
});

export default localforage;
