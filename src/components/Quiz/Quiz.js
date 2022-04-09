import React, { useState } from "react";
import Text from "../Text";
import Question from "../Question";
import "react-toastify/dist/ReactToastify.css";
import * as S from "./style";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  let correct_answer = questions[currentQuestion]?.correct_answer;
  let incorrect_answers = questions[currentQuestion]?.incorrect_answers;
  let answers = [];
  if (incorrect_answers != undefined) {
    answers = [correct_answer, ...incorrect_answers];
    let correct_pos = Math.floor(Math.random() * answers.length);
    let tmp = answers[correct_pos];
    answers[correct_pos] = answers[0];
    answers[0] = tmp;
  }

  const renderQuestion = () => {
    if (questions != undefined && currentQuestion < questions?.length) {
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
    <S.UserList>
      <S.Header>
        <Text size="64px" bold>
          Online Quiz Game
        </Text>
      </S.Header>
      {renderQuestion()}
      Score: {score}
    </S.UserList>
  );
};

export default Quiz;
