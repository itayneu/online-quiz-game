import { useState, useEffect } from "react";
import axios from "axios";

export const useQuestionsFetch = (startQuiz, numberOfQuestions, difficulty) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (startQuiz) fetchQuestions();
  }, [startQuiz]);

  async function fetchQuestions() {
    let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;
    let difficultyUrl =
      difficulty !== "mixed" ? `&difficulty=${difficulty}` : "";
    const response = await axios.get(url.concat(difficultyUrl));
    setQuestions(response.data.results);
  }

  return { questions, fetchQuestions };
};
