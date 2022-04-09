import { useState, useEffect } from "react";
import axios from "axios";

export const useQuestionsFetch = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    const response = await axios.get(`https://opentdb.com/api.php?amount=10`);
    setQuestions(response.data.results);
    console.log(response.data.results);
  }

  return { questions, fetchQuestions };
};
