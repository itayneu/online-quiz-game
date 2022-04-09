import { useState, useEffect } from "react";
import axios from "axios";

export const useQuestionsFetch = (pageNumber) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [pageNumber]);

  async function fetchQuestions() {
    setIsLoading(true);
    const response = await axios.get(`https://opentdb.com/api.php?amount=10`);
    setIsLoading(false);
    setHasMore(response.data.results.length > 0);
    setQuestions(response.data.results);
  }

  return { questions, isLoading, hasMore, fetchQuestions };
};
