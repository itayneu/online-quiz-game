import React, { useState } from "react";
import Quiz from "../../components/Quiz";
import Text from "../../components/Text";
import Question from "../../components/Question";
import { useQuestionsFetch } from "../../hooks";
import * as S from "./style";

const Home = () => {
  const { questions, fetchQuestions } = useQuestionsFetch();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  let correct_answer = questions[currentQuestion]?.correct_answer;
  let incorrect_answers = questions[currentQuestion]?.incorrect_answers;
  let answers = [];
  if (incorrect_answers !== undefined) {
    answers = [correct_answer, ...incorrect_answers];
    let correct_pos = Math.floor(Math.random() * answers.length);
    let tmp = answers[correct_pos];
    answers[correct_pos] = answers[0];
    answers[0] = tmp;
  }

  const renderQuestion = () => {
    if (questions !== undefined && currentQuestion < questions?.length) {
      return (
        <Question
          question={questions[currentQuestion]?.question}
          answers={answers}
          correct_answer={correct_answer}
          setCurrentQuestion={setCurrentQuestion}
          setScore={setScore}
        />
      );
    } else return;
  };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Online Quiz Game
          </Text>
        </S.Header>
        Score: {score}
        {renderQuestion()}
      </S.Content>
    </S.Home>
  );
};

export default Home;
