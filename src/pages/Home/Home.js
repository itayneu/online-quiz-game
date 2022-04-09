import React, { useState } from "react";
import Quiz from "../../components/Quiz";
import { useQuestionsFetch } from "../../hooks";
import * as S from "./style";

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { questions, isLoading, hasMore, fetchQuestions } =
    useQuestionsFetch(pageNumber);

  return (
    <S.Home>
      <S.Content>
        <Quiz
          page="home"
          questions={questions}
          isLoading={isLoading}
          hasMore={hasMore}
          setPageNumber={setPageNumber}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
