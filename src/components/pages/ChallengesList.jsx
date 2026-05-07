import React, { useEffect, useState } from "react";
import { fetchChallenges } from "../service/api";

export default function ChallengesList() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetchChallenges()
      .then((data) => {
        setChallenges(data);
      })
      .catch((err) => {
        console.error("Failed to load challenges:", err.message);
      });
  }, []);

  return (
    <div className="challenge-page">
      <h3>All Challenges</h3>
      <ul className="challenges-list">
        {challenges.map((ch) => (
          <li key={ch.challenge_id}>
            {ch.challenge_name} - {ch.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
