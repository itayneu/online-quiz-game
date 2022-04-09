import { useState, useEffect } from "react";
import axios from "axios";

export const useQuestionsFetch = (startQuiz) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (startQuiz) fetchQuestions();
  }, [startQuiz]);

  async function fetchQuestions() {
    const response = await axios.get(`https://opentdb.com/api.php?amount=10`);
    setQuestions(response.data.results);
  }

  return { questions, fetchQuestions };
};
